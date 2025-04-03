import useSWR, { SWRConfiguration } from 'swr';
import { fetcher } from '../utils/api';

interface ApiHookOptions extends SWRConfiguration {
  initialData?: any;
}

/**
 * Хук для получения данных через SWR
 */
export function useApiData<T>(url: string, options: ApiHookOptions = {}) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<T>(
    url,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      ...options
    }
  );

  return {
    data,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate
  };
}

/**
 * Хук для получения данных о сервисах
 */
export function useServices() {
  return useApiData<any[]>('/api/services');
}

/**
 * Хук для получения данных о команде
 */
export function useTeam() {
  return useApiData<any[]>('/api/team');
}

/**
 * Хук для получения с кэшированием данных из API
 * С поддержкой ручного вызова и состояния загрузки
 */
export function useLazyApiData<T, P = any>(
  urlOrUrlFn: string | ((params: P) => string),
  options: ApiHookOptions = {}
) {
  // Инициализируем без загрузки данных
  const { data, error, isLoading, mutate } = useSWR<T>(
    null, // Не загружаем данные автоматически
    fetcher,
    options
  );

  const fetchData = async (params?: P) => {
    const urlToFetch = typeof urlOrUrlFn === 'function' 
      ? (urlOrUrlFn as (params: P) => string)(params as P) 
      : urlOrUrlFn;
      
    return mutate(fetcher(urlToFetch));
  };

  return {
    data,
    isLoading,
    isError: !!error,
    error,
    fetch: fetchData,
  };
} 