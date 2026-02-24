import { FILTER_ITEM_TYPES } from 'shared/constants';

export type CatalogItem = {
  id: string;
  name: string;
};

export type ItemType = (typeof FILTER_ITEM_TYPES)[keyof typeof FILTER_ITEM_TYPES];

export type Topic = CatalogItem;
export type Vendor = CatalogItem;

export interface CatalogContextType {
  pageSize: number;
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
  setPageSize: (pageSize: number) => void;
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
