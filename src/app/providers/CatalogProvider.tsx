import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';

import { CatalogContextType, CatalogItem } from 'shared/types';

export const CatalogContext = createContext<CatalogContextType>({
  search: '',
  vendors: [],
  topics: [],
  setSearch: () => {},
  setTopics: () => {},
  setVendors: () => {},
  clearAll: () => {},
});

export const CatalogProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<string>('');
  const [vendors, setVendors] = useState<CatalogItem[]>([]);
  const [topics, setTopics] = useState<CatalogItem[]>([]);

  const handleClearAll = () => {
    setVendors([]);
    setTopics([]);
  };

  const value = useMemo(
    () => ({
      topics,
      vendors,
      search,
      setTopics,
      setVendors,
      setSearch,
      clearAll: handleClearAll,
    }),
    [vendors, topics, search],
  );

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
};
