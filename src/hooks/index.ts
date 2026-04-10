import { useMemo } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import fetchCourses from 'api/catalog';
import { CatalogItem } from 'shared/types';
import { PAGE_SIZE } from 'shared/constants';
import { validateUuid } from 'shared/helpers';

const useCourses = (
  catalogID: string,
  couponCode: string,
  search: string,
  topics: CatalogItem[],
  vendors: CatalogItem[],
  page: number = 1,
  pageSize: number = PAGE_SIZE,
) => {
  const isValidCatalogID = validateUuid(catalogID);
  const mergedTopics = useMemo(() => [...topics, ...vendors], [topics, vendors]);
  const topicsKey = useMemo(() => mergedTopics.map(t => t.id).join(','), [mergedTopics]);

  const coursesQuery = useQuery({
    queryKey: ['courses', catalogID, couponCode, search, topicsKey, page, pageSize],
    queryFn: ({ signal }) => fetchCourses(
      catalogID,
      couponCode,
      search,
      mergedTopics,
      signal,
      page,
      pageSize,
    ),
    enabled: isValidCatalogID,
    retry: false,
    placeholderData: keepPreviousData,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const pageCount = coursesQuery.data ? Math.ceil(coursesQuery.data.count / pageSize) : 0;

  return {
    ...coursesQuery,
    isError: !isValidCatalogID || coursesQuery.isError,
    isLoading: isValidCatalogID ? coursesQuery.isLoading : false,
    pageCount,
  };
};

export default useCourses;
