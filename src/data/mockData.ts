import { v4 as uuid } from 'uuid';
import type {
  AvatarPreset,
  BadgeProgress,
  CalendarEvent,
  ChatMessage,
  MarketplaceItem,
  Mood,
  Task,
} from '../types';

const today = new Date();
const todayISO = today.toISOString().split('T')[0];
const tomorrowISO = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

const sampleMood: Mood = 'feliz';

export const initialTasks: Task[] = [
  {
    id: uuid(),
    title: 'Revisar anotações de Cibersegurança',
    date: todayISO,
    time: '19:00',
    category: 'Estudos',
    completed: false,
  },
  {
    id: uuid(),
    title: 'Treino funcional',
    date: todayISO,
    time: '07:30',
    category: 'Saúde',
    completed: false,
  },
  {
    id: uuid(),
    title: 'Responder e-mails prioritários',
    date: todayISO,
    time: '10:00',
    category: 'Trabalho',
    completed: true,
  },
  {
    id: uuid(),
    title: 'Leitura de 20 minutos',
    date: tomorrowISO,
    category: 'Pessoal',
    completed: false,
  },
];

export const initialEvents: CalendarEvent[] = [
  {
    id: uuid(),
    title: 'Reunião com o squad',
    date: todayISO,
    time: '11:00',
    category: 'Trabalho',
  },
  {
    id: uuid(),
    title: 'Estudo guiado de Cibersegurança',
    date: todayISO,
    time: '19:00',
    category: 'Estudos',
  },
  {
    id: uuid(),
    title: 'Sessão de meditação',
    date: tomorrowISO,
    time: '07:00',
    category: 'Saúde',
  },
];

export const initialBadges: BadgeProgress[] = [
  {
    id: uuid(),
    name: 'Leitor Constante',
    description: 'Complete sessões de leitura 5 dias seguidos.',
    streak: 2,
    target: 5,
    level: 'Bronze',
    category: 'Leitura',
  },
  {
    id: uuid(),
    name: 'Estudante Focado',
    description: 'Acompanhe suas sessões de estudo diariamente.',
    streak: 4,
    target: 7,
    level: 'Prata',
    category: 'Estudos',
  },
  {
    id: uuid(),
    name: 'Maratona de Treinos',
    description: 'Conclua 3 treinos na semana.',
    streak: 1,
    target: 3,
    level: 'Nenhum',
    category: 'Treino',
  },
  {
    id: uuid(),
    name: 'Garrafas de Água',
    description: 'Registre hidratação a cada 2 horas.',
    streak: 3,
    target: 6,
    level: 'Bronze',
    category: 'Hidratação',
  },
  {
    id: uuid(),
    name: 'Laser Total',
    description: 'Mantenha sessões de foco profundo.',
    streak: 5,
    target: 5,
    level: 'Ouro',
    category: 'Foco',
  },
];

export const initialMarketplace: MarketplaceItem[] = [
  {
    id: uuid(),
    name: 'Cortex Neon',
    type: 'Avatar',
    rarity: 'Épico',
    description: 'Um avatar energizado com visual neon.',
    image: '/avatars/avatar-neon.png',
  },
  {
    id: uuid(),
    name: 'Jaqueta Holográfica',
    type: 'Roupa',
    rarity: 'Raro',
    description: 'Efeito translúcido com detalhes brilhantes.',
    image: '/avatars/outfit-holo.png',
  },
  {
    id: uuid(),
    name: 'Headset Futurewave',
    type: 'Acessório',
    rarity: 'Comum',
    description: 'Perfeito para sessões de estudo em foco.',
    image: '/avatars/accessory-headset.png',
  },
  {
    id: uuid(),
    name: 'Cortex Aurora',
    type: 'Avatar',
    rarity: 'Raro',
    description: 'Avatar inspirado em auroras boreais.',
    image: '/avatars/avatar-aurora.png',
  },
];

export const avatarPresets: AvatarPreset[] = [
  {
    id: 'pulse',
    name: 'Pulse',
    accent: '#7c3aed',
    description: 'Vibrações elétricas, ideal para quem quer energia.',
  },
  {
    id: 'serene',
    name: 'Serene',
    accent: '#0ea5e9',
    description: 'Calmo, focado, perfeito para rotinas equilibradas.',
  },
  {
    id: 'ember',
    name: 'Ember',
    accent: '#f97316',
    description: 'Quente e motivador, incentiva a ação imediata.',
  },
];

export const initialChat: ChatMessage[] = [
  {
    id: uuid(),
    sender: 'avatar',
    content: 'Oi! Eu sou o Cortex, pronto para organizar seu dia. Vamos começar? 👋',
    timestamp: new Date().toISOString(),
  },
];

export const defaultMood: Mood = sampleMood;
