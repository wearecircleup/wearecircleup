import { describe, test, expect, beforeEach, vi } from 'vitest';
import { LLMService } from '../../../../backend/services/llm/LLMService';

global.fetch = vi.fn();

describe('LLMService', () => {
  let service: LLMService;
  
  beforeEach(() => {
    vi.clearAllMocks();
    service = new LLMService();
    service.resetCircuitBreaker();
  });
  
  test('generates slides successfully', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: JSON.stringify({
              slides: [
                { title: 'Slide 1', content: 'Content 1', notes: 'Notes 1' },
                { title: 'Slide 2', content: 'Content 2', notes: 'Notes 2' }
              ]
            })
          }
        }
      ]
    };
    
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });
    
    const slides = await service.generateSlides('Test presentation', 2);
    
    expect(slides).toHaveLength(2);
    expect(slides[0].title).toBe('Slide 1');
    expect(slides[1].title).toBe('Slide 2');
  });
  
  test('circuit breaker opens after threshold failures', async () => {
    (global.fetch as any).mockRejectedValue(new Error('API Error'));
    
    await expect(service.generateSlides('test', 10)).rejects.toThrow();
    
    expect(service.getCircuitBreakerState()).toBe('OPEN');
  });
  
  test('falls back to secondary model on primary failure', async () => {
    (global.fetch as any)
      .mockRejectedValueOnce(new Error('Primary failed'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  slides: [{ title: 'Fallback', content: 'Content', notes: '' }]
                })
              }
            }
          ]
        })
      });
    
    const slides = await service.generateSlides('test', 1);
    
    expect(slides).toBeDefined();
    expect(slides[0].title).toBe('Fallback');
  });
  
  test('throws error when all models fail', async () => {
    (global.fetch as any).mockRejectedValue(new Error('All failed'));
    
    await expect(service.generateSlides('test', 10)).rejects.toThrow('All models failed');
  });
  
  test('handles invalid JSON response', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: 'invalid json'
            }
          }
        ]
      })
    });
    
    await expect(service.generateSlides('test', 10)).rejects.toThrow();
  });
  
  test('handles missing slides array in response', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify({ data: 'no slides' })
            }
          }
        ]
      })
    });
    
    await expect(service.generateSlides('test', 10)).rejects.toThrow('All models failed');
  });
  
  test('handles HTTP error responses', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => 'Internal Server Error'
    });
    
    await expect(service.generateSlides('test', 10)).rejects.toThrow('All models failed');
  });
  
  test('circuit breaker can be reset', () => {
    service.resetCircuitBreaker();
    expect(service.getCircuitBreakerState()).toBe('CLOSED');
  });
});
