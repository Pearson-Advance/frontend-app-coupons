import { getConfig } from '@edx/frontend-platform';
import { logError } from '@edx/frontend-platform/logging';

import { CatalogItem, CoursesResponse } from 'shared/types';
import { PAGE_SIZE } from 'shared/constants';

/**
 * Fetches paginated courses for a given enterprise catalog.
 *
 * Receives `discoveryBaseUrl` already resolved from the mfe_config query,
 * so this function is only called once that value is available.
 *
 * @param catalogID - Unique identifier of the enterprise catalog.
 * @param couponCode - Optional coupon code used to filter eligible courses.
 * @param search - Free-text search term applied to course results.
 * @param topicsAndVendors - List of selected catalog items (topics or vendors)
 * used to filter the results. Their `name` values are serialized as a
 * comma-separated string under the `topics` query parameter.
 * @param signal - Optional AbortSignal used to cancel the request.
 * @param page - Page number for paginated results. Defaults to 1.
 * @param pageSize - Number of results per page. Defaults to PAGE_SIZE.
 *
 * @returns A promise that resolves to a `CoursesResponse` object.
 * Returns an empty object cast as `CoursesResponse` if the request fails.
 */
const fetchCourses = async (
  catalogID: string,
  couponCode: string,
  search: string,
  topicsAndVendors: CatalogItem[],
  signal?: AbortSignal,
  page: number = 1,
  pageSize: number = PAGE_SIZE,
): Promise<CoursesResponse> => {
  const params = new URLSearchParams();

  if (search) { params.append('search', search); }
  if (topicsAndVendors.length > 0) { params.append('topics', topicsAndVendors.map(t => t.name).join(',')); }
  if (couponCode) { params.append('coupon_code', couponCode); }

  params.append('page', String(page));
  params.append('page_size', String(pageSize));

  const coursesUrl = `${getConfig().DISCOVERY_BASE_URL}/enterprise_catalogs/${catalogID}/courses/?${params.toString()}`;
  const response = await fetch(coursesUrl, { signal });

  if (!response.ok) {
    logError(`Failed to fetch courses for catalog ${catalogID}: ${response.status} ${response.statusText}`);
    return {} as CoursesResponse;
  }

  return response.json() as Promise<CoursesResponse>;
};

export default fetchCourses;
