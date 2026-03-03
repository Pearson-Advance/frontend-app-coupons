import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';
import { useParams, useLocation } from 'react-router-dom';

import useCourses from 'hooks';
import { PAGE_SIZE } from 'shared/constants';
import { CatalogContextType, CatalogItem, RouteParams } from 'shared/types';

interface CommittedFilters {
  search: string;
  topics: CatalogItem[];
  vendors: CatalogItem[];
  page: number;
}

export const CatalogContext = createContext<CatalogContextType>({
  search: '',
  vendors: [],
  topics: [],
  page: 1,
  pageSize: PAGE_SIZE,
  data: undefined,
  isLoading: false,
  isError: false,
  setSearch: () => {},
  commitSearch: () => {},
  setTopics: () => {},
  setVendors: () => {},
  setPage: () => {},
  clearAll: () => {},
  setPageSize: () => {},
});

export const CatalogProvider = ({ children }: { children: ReactNode }) => {
  const { catalogID } = useParams<RouteParams>();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const couponCodeFromUrl = params.get('coupon_code') ?? '';

  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [filters, setFilters] = useState<{ topics: CatalogItem[]; vendors: CatalogItem[] }>({
    topics: [],
    vendors: [],
  });
  const [committed, setCommitted] = useState<CommittedFilters>({
    search: '',
    topics: [],
    vendors: [],
    page: 1,
  });
  const searchRef = useRef(search);
  const filtersRef = useRef(filters);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstMount = useRef(true);

  useEffect(() => { searchRef.current = search; }, [search]);
  useEffect(() => { filtersRef.current = filters; }, [filters]);

  /**
   * Debounces filter changes before committing them to the query state.
   *
   * This effect prevents triggering expensive operations (e.g. API calls or
   * re-render cascades) on every intermediate filter update. Instead, it waits
   * 500ms after the last change before updating the committed state.
   *
   * The 500ms delay was chosen as a balance between responsiveness and network efficiency:
   * - Shorter delays (<300ms) may still produce excessive requests during rapid user input.
   * - Longer delays (>700ms) can make the UI feel unresponsive.
   *
   * The first render is explicitly skipped to avoid firing an unnecessary
   * update on mount when no user interaction has occurred.
   *
   * The cleanup function clears any pending timeout to prevent memory leaks
   * and race conditions when filters change rapidly or the component unmounts.
   */
  useEffect(() => {
    if (!isFirstMount.current) {
      if (debounceRef.current) { clearTimeout(debounceRef.current); }

      debounceRef.current = setTimeout(() => {
        setCommitted(prev => ({
          search: prev.search,
          topics: filtersRef.current.topics,
          vendors: filtersRef.current.vendors,
          page: 1,
        }));
      }, 500);
    } else {
      isFirstMount.current = false;
    }

    return () => {
      if (debounceRef.current) { clearTimeout(debounceRef.current); }
    };
  }, [filters]);

  const commitSearch = useCallback((value?: string) => {
    if (debounceRef.current) { clearTimeout(debounceRef.current); }

    const newSearch = value !== undefined ? value : searchRef.current.trim();

    setCommitted({
      search: newSearch,
      topics: filtersRef.current.topics,
      vendors: filtersRef.current.vendors,
      page: 1,
    });
  }, []);

  const setTopics = useCallback((updater: CatalogItem[] | ((prev: CatalogItem[]) => CatalogItem[])) => {
    setFilters(prev => ({
      ...prev,
      topics: typeof updater === 'function' ? updater(prev.topics) : updater,
    }));
  }, []);

  const setVendors = useCallback((updater: CatalogItem[] | ((prev: CatalogItem[]) => CatalogItem[])) => {
    setFilters(prev => ({
      ...prev,
      vendors: typeof updater === 'function' ? updater(prev.vendors) : updater,
    }));
  }, []);

  const handleClearAll = useCallback(() => {
    setFilters({ topics: [], vendors: [] });
  }, []);

  const setPage = useCallback((page: number) => {
    setCommitted(prev => ({ ...prev, page }));
  }, []);

  const { data, isLoading, isError } = useCourses(
    catalogID,
    couponCodeFromUrl,
    committed.search,
    committed.topics,
    committed.vendors,
    committed.page,
    pageSize,
  );

  const value = useMemo(
    () => ({
      pageSize,
      topics: filters.topics,
      vendors: filters.vendors,
      search,
      page: committed.page,
      data,
      isLoading,
      isError,
      setPageSize,
      setTopics,
      setVendors,
      setSearch,
      setPage,
      commitSearch,
      clearAll: handleClearAll,
    }),
    [
      filters,
      pageSize,
      search,
      committed.page,
      data,
      isLoading,
      isError,
      setPageSize,
      setTopics,
      setVendors,
      setPage,
      commitSearch,
      handleClearAll,
    ],
  );

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
};
