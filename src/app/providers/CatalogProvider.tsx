import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';

import { CatalogContextType, CatalogItem } from 'shared/types';

export const CatalogContext = createContext<CatalogContextType>({
  vendors: [],
  setVendors: () => {},
  clearAll: () => {},
});

export const CatalogProvider = ({ children }: { children: ReactNode }) => {
  const [vendors, setVendors] = useState<CatalogItem[]>([]);

  const handleClearAll = () => {
    setVendors([]);
  };

  const value = useMemo(
    () => ({
      vendors,
      setVendors,
      clearAll: handleClearAll,
    }),
    [vendors],
  );

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
};
