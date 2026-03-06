import { getConfig } from '@edx/frontend-platform';
import { logError } from '@edx/frontend-platform/logging';

import { CourseDetailResponse } from 'shared/types';

/**
 * Fetches the detail of a specific course within an enterprise catalog.
 *
 * Receives `discoveryBaseUrl` already resolved from the mfe_config query,
 * so this function is only called once that value is available.
 *
 * @param discoveryBaseUrl - Base URL for the Discovery API, sourced from mfe_config.
 * @param catalogID - Unique identifier of the enterprise catalog.
 * @param courseRunKey - Key identifying the specific course run.
 * @param signal - Optional AbortSignal used to cancel the request.
 *
 * @returns A promise that resolves to a `CourseDetail` object.
 * Returns an empty object cast as `CourseDetail` if the request fails.
 */
const fetchCourseDetail = async (
  catalogID: string,
  courseRunKey: string,
  signal?: AbortSignal,
): Promise<CourseDetailResponse> => {
  const url = `${getConfig().DISCOVERY_BASE_URL}/enterprise_catalogs/${catalogID}/courses/${encodeURIComponent(courseRunKey)}/`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    logError(`Failed to fetch course detail for catalogID: ${catalogID}, courseRunKey: ${courseRunKey}. Status: ${response.status}`);
    return {} as CourseDetailResponse;
  }

  return response.json() as Promise<CourseDetailResponse>;
};

export default fetchCourseDetail;
