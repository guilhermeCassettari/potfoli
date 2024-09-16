'use client';

import { useLogin } from '@/http/useLogin';
import { useState } from 'react';

export default function Admin() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useLogin();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const formData = new FormData(event.currentTarget);

    try {
      await login(formData);
    } catch (error) {
      setError(`${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{error}</h1>
      <input
        type="email"
        name="email"
        required
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Entrar</button>
    </form>
  );
}
