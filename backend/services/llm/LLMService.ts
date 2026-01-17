import { ConfigLoader } from '../config/ConfigLoader.js';
import { CircuitBreaker } from './CircuitBreaker.js';

interface Slide {
  title: string;
  content: string;
  notes?: string;
}

interface ModelConfig {
  name: string;
  maxTokens: number;
  temperature: number;
}

interface ModelsConfig {
  models: {
    endpoint: string;
    primary: ModelConfig;
    fallback: ModelConfig[];
    retry: {
      maxAttempts: number;
      backoffMs: number;
      backoffMultiplier: number;
    };
  };
}

export class LLMService {
  private config: ModelsConfig['models'];
  private circuitBreaker: CircuitBreaker;
  
  constructor() {
    const configLoader = ConfigLoader.getInstance();
    this.config = configLoader.get('models').models;
    
    this.circuitBreaker = new CircuitBreaker(
      this.config.retry.maxAttempts,
      this.config.retry.backoffMs * Math.pow(
        this.config.retry.backoffMultiplier,
        this.config.retry.maxAttempts
      )
    );
  }
  
  async generateSlides(description: string, numSlides: number): Promise<Slide[]> {
    const models = [this.config.primary, ...this.config.fallback];
    
    for (const model of models) {
      try {
        return await this.circuitBreaker.execute(() => 
          this.callModel(model, description, numSlides)
        );
      } catch (error) {
        console.error(`Model ${model.name} failed:`, error);
        continue;
      }
    }
    
    throw new Error('All models failed');
  }
  
  private async callModel(
    model: ModelConfig,
    description: string,
    numSlides: number
  ): Promise<Slide[]> {
    const response = await fetch(this.config.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model.name,
        messages: [
          {
            role: 'system',
            content: this.buildSystemPrompt(numSlides)
          },
          {
            role: 'user',
            content: description
          }
        ],
        temperature: model.temperature,
        max_tokens: model.maxTokens,
        response_format: { type: 'json_object' }
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    
    const data = await response.json();
    return this.parseResponse(data);
  }
  
  private buildSystemPrompt(numSlides: number): string {
    return `Generate exactly ${numSlides} presentation slides in JSON format.
Return a JSON object with a "slides" array. Each slide must have:
- title: string (concise, engaging title)
- content: string (main content, use markdown formatting)
- notes: string (optional speaker notes)

Example format:
{
  "slides": [
    {
      "title": "Introduction",
      "content": "Welcome to the presentation",
      "notes": "Start with a warm greeting"
    }
  ]
}`;
  }
  
  private parseResponse(data: any): Slide[] {
    try {
      const content = data.choices[0].message.content;
      const parsed = JSON.parse(content);
      
      if (!parsed.slides || !Array.isArray(parsed.slides)) {
        throw new Error('Invalid response format: missing slides array');
      }
      
      return parsed.slides.map((slide: any) => ({
        title: slide.title || 'Untitled',
        content: slide.content || '',
        notes: slide.notes || ''
      }));
    } catch (error) {
      throw new Error(`Failed to parse LLM response: ${error}`);
    }
  }
  
  getCircuitBreakerState(): 'CLOSED' | 'OPEN' | 'HALF_OPEN' {
    return this.circuitBreaker.getState();
  }
  
  resetCircuitBreaker(): void {
    this.circuitBreaker.reset();
  }
}
