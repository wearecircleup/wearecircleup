export interface Presentation {
  id: string;
  title: string;
  slug: string;
  description: string;
  url: string;
  thumbnail: string;
  slidesCount: number;
  theme: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  user: {
    id: string;
    username: string;
    avatarUrl: string;
  };
  metadata: {
    modelUsed: string;
    generationTimeMs: number;
    fileSizeBytes: number;
    views: number;
  };
  tags: string[];
}

export interface PresentationFormData {
  title: string;
  description: string;
  numSlides: number;
  theme: 'modern' | 'academic' | 'minimal';
  model: 'gpt-4o' | 'meta-llama/Llama-3.1-70B-Instruct' | 'microsoft/Phi-3-medium-128k-instruct';
  options: {
    includeSpeakerNotes: boolean;
    addReferences: boolean;
    tone: 'professional' | 'casual' | 'academic';
  };
}

export interface PresentationStatus {
  state: 'pending' | 'in_progress' | 'success' | 'failure';
  progress: number;
  description?: string;
  targetUrl?: string;
  updatedAt?: Date;
}
