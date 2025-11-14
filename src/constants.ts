import type { Task } from './types';

export const taskCategories = ['Estudos', 'Trabalho', 'Saúde', 'Pessoal', 'Outro'] as const;

export const onboardingHabitOptions = ['Leitura', 'Estudos', 'Treino', 'Hidratação', 'Foco'] as const;

export const onboardingFocusOptions = [
  'Estudos',
  'Trabalho',
  'Saúde',
  'Vida pessoal',
  'Outro',
] as const;

export const onboardingActivityPeriods = ['Manhã', 'Tarde', 'Noite'] as const;

export const bottomNavigation = [
  { path: '/app/home', label: 'Home', icon: 'home' },
  { path: '/app/tasks', label: 'Tarefas', icon: 'tasks' },
  { path: '/app/calendar', label: 'Calendário', icon: 'calendar' },
  { path: '/app/badges', label: 'Badges', icon: 'badges' },
  { path: '/app/shop', label: 'Loja', icon: 'shop' },
] as const;

export const taskCategoryClass: Record<Task['category'], string> = {
  Estudos: 'estudos',
  Trabalho: 'trabalho',
  Saúde: 'saude',
  Pessoal: 'pessoal',
  Outro: 'outro',
};
