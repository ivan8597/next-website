import { fetcher } from '../../utils/api';

describe('API утилиты', () => {
  const originalFetch = global.fetch;
  
  beforeEach(() => {
    // Сбрасываем миллисекунды для стабильных тестов с датами
    jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
  });
  
  afterEach(() => {
    jest.useRealTimers();
    global.fetch = originalFetch;
  });
  
  describe('fetcher функция', () => {
    test('вызывает fetch с правильными параметрами для GET запроса', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ data: 'test' }),
        headers: new Headers({
          'content-type': 'application/json'
        })
      });
      global.fetch = mockFetch;
      
      const url = '/api/test';
      const result = await fetcher(url);
      
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:5000/api/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          })
        })
      );
      expect(result).toEqual({ data: 'test' });
    });
    
    test('использует предоставленный URL для абсолютных URL', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ data: 'test' }),
        headers: new Headers({
          'content-type': 'application/json'
        })
      });
      global.fetch = mockFetch;
      
      const url = 'https://api.example.com/data';
      await fetcher(url);
      
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/data',
        expect.any(Object)
      );
    });
    
    test('обрабатывает не-JSON ответы', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        text: jest.fn().mockResolvedValue('Hello World'),
        json: jest.fn(),
        headers: new Headers({
          'content-type': 'text/plain'
        })
      });
      global.fetch = mockFetch;
      
      const result = await fetcher('/api/text');
      
      expect(result).toBe('Hello World');
    });
    
    test('выбрасывает ошибку для неудачных запросов', async () => {
      const errorResponse = {
        ok: false,
        status: 404,
        json: jest.fn().mockResolvedValue({ error: 'Not found' }),
        headers: new Headers()
      };
      global.fetch = jest.fn().mockResolvedValue(errorResponse);
      
      await expect(fetcher('/api/test')).rejects.toThrow('API request failed');
    });
  });
}); 