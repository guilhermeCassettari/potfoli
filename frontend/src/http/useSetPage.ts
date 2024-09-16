'use client';

import { useGlobalContext } from '@/context/GlobalContext';
import { useState } from 'react';
import { ISetHomePage } from '../../../backend/src/modules/pages/interface/ISetHomePage';
import { api } from './api';

export function useSetPage() {
  const { userToken } = useGlobalContext();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setHome } = api();
  const setHomePage = async (file: File, data: ISetHomePage): Promise<void> => {
    setError('');
    setLoading(true);
    try {
      const teste = await setHome(file, data);
      console.log(teste);
      setError('');
      setLoading(false);
    } catch (error) {
      setError(`${error}`);
      setLoading(false);
    }
  };
  return { error, loading, setHomePage };
}
