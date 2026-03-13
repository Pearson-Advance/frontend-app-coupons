import { useQuery } from '@tanstack/react-query';

import fetchCourseDetail from 'api/courseDetail';

const useCourseDetail = (
  catalogID: string,
  courseRunKey: string,
  couponCode: string,
) => {
  const courseDetailQuery = useQuery({
    queryKey: ['course-detail', catalogID, courseRunKey],
    queryFn: ({ signal }) => fetchCourseDetail(
      catalogID as string,
      courseRunKey as string,
      couponCode as string,
      signal,
    ),
    enabled: Boolean(catalogID && courseRunKey),
    retry: false,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return {
    ...courseDetailQuery,
    isLoading: courseDetailQuery.isLoading,
  };
};

export default useCourseDetail;
