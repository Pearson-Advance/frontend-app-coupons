import React from 'react';

import { FILTER_ITEM_TYPES } from 'shared/constants';

export type CatalogItem = {
  id: string;
  name: string;
};

export type ItemType = (typeof FILTER_ITEM_TYPES)[keyof typeof FILTER_ITEM_TYPES];

export type Topic = CatalogItem;
export type Vendor = CatalogItem;

export type CatalogContextType = {
  vendors: Vendor[];
  setVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
  clearAll: () => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};
