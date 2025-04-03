// Базовый URL для API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Универсальная функция для выполнения fetch запросов
 */
export async function fetcher<T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> {
  const isFormData = options.body instanceof FormData;
  
  const defaultHeaders: HeadersInit = {
    'Accept': 'application/json',
    ...(isFormData 
      ? {} 
      : { 'Content-Type': 'application/json' }),
    ...options.headers
  };

  const response = await fetch(url.startsWith('http') ? url : `${API_BASE_URL}${url}`, {
    ...options,
    headers: defaultHeaders
  });

  if (!response.ok) {
    // Создаем объект ошибки с дополнительной информацией
    const error: any = new Error('API request failed');
    error.status = response.status;
    
    try {
      error.data = await response.json();
    } catch (e) {
      error.data = await response.text();
    }
    
    throw error;
  }

  // Проверяем наличие контента
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  return response.text() as unknown as T;
}

/**
 * Функции для работы с API формы обратной связи
 */
export const api = {
  /**
   * Отправка данных формы обратной связи
   */
  submitContactForm: async (formData: any) => {
    return fetcher('/api/form/submit', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
  },
  
  /**
   * Получение сервисов для страницы услуг
   */
  getServices: () => {
    return fetcher<any[]>('/api/services');
  },
  
  /**
   * Получение информации о команде для страницы "О нас"
   */
  getTeam: () => {
    return fetcher<any[]>('/api/team');
  }
}; 