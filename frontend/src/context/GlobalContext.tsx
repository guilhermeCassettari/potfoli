'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface IGlobalContext {
  userToken: string | null;
  setUserToken: (name: string) => void;
}

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string>('');

  return (
    <GlobalContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
