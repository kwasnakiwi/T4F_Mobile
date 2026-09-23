import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/app/lib/interceptor';
import { BASE_URL } from '@/app/lib/utils';

const AuthContext = createContext<any | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMe = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiFetch(`user/me/`);

      if (!response.ok) {
        throw new Error('Nie udało się pobrać danych użytkownika');
      }

      const data: any = await response.json();
      setUser(data);
    } catch (err: any) {
      setError(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <AuthContext.Provider value={{ user, loading, error, refetchMe: fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useMe = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useMe musi być użyty wewnątrz AuthProvider');
  }
  return context;
};