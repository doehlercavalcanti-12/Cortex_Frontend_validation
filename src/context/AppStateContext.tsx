import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { v4 as uuid } from 'uuid';
import {
  avatarPresets,
  defaultMood,
  initialBadges,
  initialChat,
  initialEvents,
  initialMarketplace,
  initialTasks,
} from '../data/mockData';
import type {
  BadgeProgress,
  CalendarEvent,
  ChatMessage,
  MarketplaceItem,
  OnboardingAnswers,
  Task,
  UserProfile,
} from '../types';

type QuickAction = 'planDay' | 'createRoutine' | 'addTask';

export type AppState = {
  user?: UserProfile;
  tasks: Task[];
  events: CalendarEvent[];
  badges: BadgeProgress[];
  marketplace: MarketplaceItem[];
  chat: ChatMessage[];
  wishlist: string[];
  showTutorial: boolean;
};

type TaskInput = {
  title: string;
  description?: string;
  date: string;
  time?: string;
  category: Task['category'];
};

type EventInput = {
  title: string;
  date: string;
  time: string;
  category?: string;
};

type AppContextValue = AppState & {
  login: (data: { name: string; email: string }) => void;
  logout: () => void;
  completeOnboarding: (answers: OnboardingAnswers) => void;
  configureAvatar: (data: { avatarName: string; accent: string }) => void;
  addTask: (input: TaskInput) => void;
  toggleTask: (taskId: string) => void;
  removeTask: (taskId: string) => void;
  addEvent: (input: EventInput) => void;
  removeEvent: (eventId: string) => void;
  sendMessage: (message: string) => void;
  triggerQuickAction: (action: QuickAction) => void;
  completeTutorial: () => void;
  addToWishlist: (itemId: string) => void;
};

const initialState: AppState = {
  tasks: initialTasks,
  events: initialEvents,
  badges: initialBadges,
  marketplace: initialMarketplace,
  chat: initialChat,
  wishlist: [],
  showTutorial: true,
};

type Action =
  | { type: 'LOGIN'; payload: { name: string; email: string } }
  | { type: 'LOGOUT' }
  | { type: 'COMPLETE_ONBOARDING'; payload: OnboardingAnswers }
  | { type: 'CONFIGURE_AVATAR'; payload: { avatarName: string; accent: string } }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'TOGGLE_TASK'; payload: { id: string } }
  | { type: 'REMOVE_TASK'; payload: { id: string } }
  | { type: 'ADD_EVENT'; payload: CalendarEvent }
  | { type: 'REMOVE_EVENT'; payload: { id: string } }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'COMPLETE_TUTORIAL' }
  | { type: 'ADD_WISHLIST'; payload: { id: string } };

const AppStateContext = createContext<AppContextValue | undefined>(undefined);

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'LOGIN': {
      const newUser: UserProfile = {
        id: uuid(),
        name: action.payload.name,
        email: action.payload.email,
        avatarMood: defaultMood,
        level: 3,
        xp: 1200,
        onboardingComplete: false,
        avatarConfigured: false,
      };
      return { ...state, user: newUser };
    }
    case 'LOGOUT':
      return { ...initialState };
    case 'COMPLETE_ONBOARDING':
      return state.user
        ? {
            ...state,
            user: { ...state.user, onboardingComplete: true, onboardingAnswers: action.payload },
          }
        : state;
    case 'CONFIGURE_AVATAR':
      return state.user
        ? {
            ...state,
            user: {
              ...state.user,
              avatarConfigured: true,
              avatarName: action.payload.avatarName,
              avatarAccent: action.payload.accent,
            },
            chat: [
              ...state.chat,
              {
                id: uuid(),
                sender: 'avatar',
                content: `Oi, eu sou ${action.payload.avatarName}! Ansioso para transformar sua rotina. ✨`,
                timestamp: new Date().toISOString(),
              },
            ],
          }
        : state;
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, completed: !task.completed } : task,
        ),
      };
    case 'REMOVE_TASK':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload.id) };
    case 'ADD_EVENT':
      return { ...state, events: [action.payload, ...state.events] };
    case 'REMOVE_EVENT':
      return { ...state, events: state.events.filter((event) => event.id !== action.payload.id) };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chat: [...state.chat, action.payload] };
    case 'COMPLETE_TUTORIAL':
      return { ...state, showTutorial: false };
    case 'ADD_WISHLIST':
      return state.wishlist.includes(action.payload.id)
        ? state
        : { ...state, wishlist: [...state.wishlist, action.payload.id] };
    default:
      return state;
  }
};

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = useCallback((data: { name: string; email: string }) => {
    dispatch({ type: 'LOGIN', payload: data });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const completeOnboarding = useCallback((answers: OnboardingAnswers) => {
    dispatch({ type: 'COMPLETE_ONBOARDING', payload: answers });
  }, []);

  const configureAvatar = useCallback((data: { avatarName: string; accent: string }) => {
    dispatch({ type: 'CONFIGURE_AVATAR', payload: data });
  }, []);

  const addTask = useCallback((input: TaskInput) => {
    const task: Task = {
      id: uuid(),
      title: input.title,
      description: input.description,
      date: input.date,
      time: input.time,
      category: input.category,
      completed: false,
    };
    dispatch({ type: 'ADD_TASK', payload: task });
  }, []);

  const toggleTask = useCallback((taskId: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: { id: taskId } });
  }, []);

  const removeTask = useCallback((taskId: string) => {
    dispatch({ type: 'REMOVE_TASK', payload: { id: taskId } });
  }, []);

  const addEvent = useCallback((input: EventInput) => {
    const event: CalendarEvent = {
      id: uuid(),
      title: input.title,
      date: input.date,
      time: input.time,
      category: input.category,
    };
    dispatch({ type: 'ADD_EVENT', payload: event });
  }, []);

  const removeEvent = useCallback((eventId: string) => {
    dispatch({ type: 'REMOVE_EVENT', payload: { id: eventId } });
  }, []);

  const addChatMessage = useCallback((message: ChatMessage) => {
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: message });
  }, []);

  const addToWishlist = useCallback((itemId: string) => {
    dispatch({ type: 'ADD_WISHLIST', payload: { id: itemId } });
  }, []);

  const completeTutorial = useCallback(() => {
    dispatch({ type: 'COMPLETE_TUTORIAL' });
  }, []);

  const generateBotResponse = useCallback(
    (message: string): string => {
      const lower = message.toLowerCase();
      if (lower.includes('organizar') || lower.includes('dia')) {
        const today = new Date().toISOString().split('T')[0];
        const todaysTasks = state.tasks.filter((task) => task.date === today && !task.completed);
        const todaysEvents = state.events.filter((event) => event.date === today);
        return `Hoje você tem ${todaysTasks.length} tarefas e ${todaysEvents.length} eventos. Quer que eu reorganize algo?`;
      }
      if (lower.includes('tarefa') || lower.includes('cria')) {
        const title = message.replace(/.*?(tarefa|cria(r)?)/i, '').trim() || 'Nova tarefa rápida';
        const date = new Date().toISOString().split('T')[0];
        addTask({ title, date, category: 'Outro' });
        return `Acabei de adicionar "${title}" às suas tarefas de hoje. ✅`;
      }
      if (lower.includes('calend') || lower.includes('evento')) {
        const title = 'Evento rápido';
        const date = new Date().toISOString().split('T')[0];
        addEvent({ title, date, time: '18:00', category: 'Pessoal' });
        return 'Adicionei um evento rápido no seu calendário às 18h de hoje. Pode ajustar depois! 🗓️';
      }
      if (lower.includes('beber') || lower.includes('água')) {
        addTask({ title: 'Beber água agora', date: new Date().toISOString().split('T')[0], category: 'Saúde' });
        return 'Hidratação é tudo! Anotei um lembrete para beber água agora.';
      }
      return 'Anotado! Se quiser posso criar uma tarefa ou evento para isso. É só me dizer. ✍️';
    },
    [addEvent, addTask, state.events, state.tasks],
  );

  const sendMessage = useCallback(
    (message: string) => {
      const trimmed = message.trim();
      if (!trimmed) {
        return;
      }
      const userMessage: ChatMessage = {
        id: uuid(),
        sender: 'user',
        content: trimmed,
        timestamp: new Date().toISOString(),
      };
      addChatMessage(userMessage);
      const reply = generateBotResponse(trimmed);
      const botMessage: ChatMessage = {
        id: uuid(),
        sender: 'avatar',
        content: reply,
        timestamp: new Date().toISOString(),
      };
      addChatMessage(botMessage);
    },
    [addChatMessage, generateBotResponse],
  );

  const triggerQuickAction = useCallback(
    (action: QuickAction) => {
      const today = new Date().toISOString().split('T')[0];
      if (action === 'planDay') {
        const summary = generateBotResponse('organizar meu dia');
        const botMessage: ChatMessage = {
          id: uuid(),
          sender: 'avatar',
          content: summary,
          timestamp: new Date().toISOString(),
        };
        addChatMessage(botMessage);
        return;
      }

      if (action === 'createRoutine') {
        const suggestions = [
          'Reservar 45 minutos para leitura focada às 20h.',
          'Separar 30 minutos para revisar notas de ontem.',
          'Agendar treino leve após o almoço.',
        ];
        const botMessage: ChatMessage = {
          id: uuid(),
          sender: 'avatar',
          content: `Sugestões para hoje:\n• ${suggestions.join('\n• ')}`,
          timestamp: new Date().toISOString(),
        };
        addChatMessage(botMessage);
        return;
      }

      if (action === 'addTask') {
        const taskTitle = 'Registrar momento de gratidão';
        addTask({ title: taskTitle, date: today, category: 'Pessoal' });
        const botMessage: ChatMessage = {
          id: uuid(),
          sender: 'avatar',
          content: `Incluí "${taskTitle}" na sua lista. Que tal começar agora? 💫`,
          timestamp: new Date().toISOString(),
        };
        addChatMessage(botMessage);
      }
    },
    [addChatMessage, addTask, generateBotResponse],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      login,
      logout,
      completeOnboarding,
      configureAvatar,
      addTask,
      toggleTask,
      removeTask,
      addEvent,
      removeEvent,
      sendMessage,
      triggerQuickAction,
      completeTutorial,
      addToWishlist,
    }),
    [
      state,
      login,
      logout,
      completeOnboarding,
      configureAvatar,
      addTask,
      toggleTask,
      removeTask,
      addEvent,
      removeEvent,
      sendMessage,
      triggerQuickAction,
      completeTutorial,
      addToWishlist,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = (): AppContextValue => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
};

export const getAccentForPreset = (presetId: string): string => {
  const preset = avatarPresets.find((item) => item.id === presetId);
  return preset?.accent ?? '#7c3aed';
};
