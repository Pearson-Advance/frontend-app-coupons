import { useQuery } from '@tanstack/react-query';

import fetchCourseDetail from 'api/courseDetail';

const useCourseDetail = (
  catalogID: string,
  courseRunKey: string,
  couponCode: string,
) => {
  const courseDetailQuery = useQuery({
    queryKey: ['course-detail', catalogID, courseRunKey, couponCode],
    queryFn: ({ signal }) => fetchCourseDetail(
      catalogID,
      courseRunKey,
      couponCode,
      signal,
    ),
    enabled: Boolean(catalogID && courseRunKey),
    retry: false,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return courseDetailQuery;
};

export default useCourseDetail;
