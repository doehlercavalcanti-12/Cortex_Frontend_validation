import type { UserProfile } from '../types';

export const resolveNextRoute = (user?: UserProfile): string => {
  if (!user) {
    return '/auth';
  }
  if (!user.onboardingComplete) {
    return '/onboarding';
  }
  if (!user.avatarConfigured) {
    return '/avatar';
  }
  return '/app/home';
};
