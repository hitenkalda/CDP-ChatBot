export interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

export interface CDP {
  id: string;
  name: string;
  description: string;
  documentationUrl: string;
}

export type Platform = 'segment' | 'mparticle' | 'lytics' | 'zeotap';