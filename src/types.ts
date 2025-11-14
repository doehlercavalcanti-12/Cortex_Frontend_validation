export type Mood = 'feliz' | 'focado' | 'inspirado' | 'energizado' | 'relaxado';

export type Task = {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO date
  time?: string; // HH:mm
  category: 'Estudos' | 'Trabalho' | 'Saúde' | 'Pessoal' | 'Outro';
  completed: boolean;
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  category?: string;
  linkedTaskId?: string;
};

export type BadgeProgress = {
  id: string;
  name: string;
  description: string;
  streak: number;
  target: number;
  level: 'Nenhum' | 'Bronze' | 'Prata' | 'Ouro';
  category: 'Leitura' | 'Estudos' | 'Treino' | 'Hidratação' | 'Foco';
};

export type MarketplaceItem = {
  id: string;
  name: string;
  type: 'Avatar' | 'Roupa' | 'Acessório';
  rarity: 'Comum' | 'Raro' | 'Épico';
  description: string;
  image: string;
};

export type ChatMessage = {
  id: string;
  sender: 'user' | 'avatar';
  content: string;
  timestamp: string;
};

export type OnboardingAnswers = {
  focusArea: 'Estudos' | 'Trabalho' | 'Saúde' | 'Vida pessoal' | 'Outro';
  habits: ('Leitura' | 'Estudos' | 'Treino' | 'Hidratação' | 'Foco')[];
  activePeriod: 'Manhã' | 'Tarde' | 'Noite';
};

export type AvatarPreset = {
  id: string;
  name: string;
  accent: string;
  description: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatarName?: string;
  avatarAccent?: string;
  avatarMood: Mood;
  level: number;
  xp: number;
  onboardingComplete: boolean;
  avatarConfigured: boolean;
  onboardingAnswers?: OnboardingAnswers;
};
