export type CatalogItem = {
  id: string;
  name: string;
};

export type ItemType = 'topics' | 'vendors';

export type Topic = CatalogItem;
export type Vendor = CatalogItem;

export interface CatalogContextType {
  search: string;
  vendors: CatalogItem[];
  topics: CatalogItem[];
  page: number;
  data: any | undefined;
  isLoading: boolean;
  isError: boolean;
  setSearch: (value: string) => void;
  commitSearch: (value?: string) => void;
  setTopics: (items: CatalogItem[] | ((prev: CatalogItem[]) => CatalogItem[])) => void;
  setVendors: (items: CatalogItem[] | ((prev: CatalogItem[]) => CatalogItem[])) => void;
  setPage: (page: number) => void;
  clearAll: () => void;
}

export interface Course {
  id: string;
  title: string;
  card_image_url?: string;
  key?: string;
  pacing_type?: string;
  estimated_hours?: number;
  enrollment_url?: string;
  topicsAndVendors?: string[];
}

export interface CoursesResponse {
  results: Course[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface CourseDetailResponse {
  title?: string;
  vendor?: string;
  overview?: string;
  outline?: string;
  card_image_url?: string;
  prerequisites?: string;
  learning_objectives?: string;
  author?: string;
  included_materials?: string;
  duration?: string;
  target_audience?: string;
  enrollment_url?: string;
}

export type RouteParams = {
  catalogID: string;
  courseKey?: string;
};
