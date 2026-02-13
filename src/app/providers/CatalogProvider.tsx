import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';

import { CatalogContextType, CatalogItem } from 'shared/types';

export const CatalogContext = createContext<CatalogContextType>({
  vendors: [],
  search: '',
  setSearch: () => {},
  setVendors: () => {},
  clearAll: () => {},
});

export const CatalogProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<string>('');
  const [vendors, setVendors] = useState<CatalogItem[]>([]);

  const handleClearAll = () => {
    setVendors([]);
  };

  const value = useMemo(
    () => ({
      vendors,
      search,
      setVendors,
      setSearch,
      clearAll: handleClearAll,
    }),
    [vendors, search],
  );

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
};
