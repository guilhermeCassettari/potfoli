'use client';

import { useGlobalContext } from '@/context/GlobalContext';
import { useRouter } from 'next/navigation';

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

interface ILogin {
  user: IUser;
}

export function useLogin() {
  const { setUserToken, userToken } = useGlobalContext();
  const router = useRouter();

  const login = async (formdata?: FormData): Promise<ILogin | void> => {
    if (!formdata) return;

    const fetchLogin = await fetch('http://localhost:3002/users/login', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formdata.get('email'),
        password: formdata.get('password'),
      }),
    });

    const json = await fetchLogin.json();
    const { token, user } = json;

    if (token) {
      setUserToken(token);

      router.push('/admin/setpage');
    }
    return { user };
  };

  const logout = () => {
    setUserToken('');
    router.push('/');
  };

  const isAuthenticated = async () => {
    console.log(userToken);
    if (!userToken) {
      console.error('Token de autenticação não encontrado');
      logout();
      return;
    }
    const fetchIsAuthenticated = await fetch(
      'http://localhost:3002/users/isAuthenticated',
      {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${'userToken'}`,
        },
      }
    );

    const dataFetchIsAuthenticated = await fetchIsAuthenticated.json();

    console.log(dataFetchIsAuthenticated);

    return;
  };

  return { login, logout, isAuthenticated };
}
