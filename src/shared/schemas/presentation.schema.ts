import { z } from 'zod';

export const presentationFormSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(5000, 'Description must be less than 5000 characters'),
  
  numSlides: z.number()
    .int('Number of slides must be an integer')
    .min(5, 'Minimum 5 slides')
    .max(50, 'Maximum 50 slides'),
  
  theme: z.enum(['modern', 'academic', 'minimal'], {
    errorMap: () => ({ message: 'Please select a valid theme' })
  }),
  
  model: z.enum([
    'gpt-4o',
    'meta-llama/Llama-3.1-70B-Instruct',
    'microsoft/Phi-3-medium-128k-instruct'
  ], {
    errorMap: () => ({ message: 'Please select a valid model' })
  }),
  
  options: z.object({
    includeSpeakerNotes: z.boolean(),
    addReferences: z.boolean(),
    tone: z.enum(['professional', 'casual', 'academic'])
  })
});

export type PresentationFormSchema = z.infer<typeof presentationFormSchema>;
