import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import AuthPage from './pages/AuthPage';
import AvatarPage from './pages/AvatarPage';
import BadgesPage from './pages/BadgesPage';
import CalendarPage from './pages/CalendarPage';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import OnboardingPage from './pages/OnboardingPage';
import ProfilePage from './pages/ProfilePage';
import SplashPage from './pages/SplashPage';
import TasksPage from './pages/TasksPage';
import { resolveNextRoute } from './utils/navigation';

const OnboardingRoute = () => {
  const { user } = useAppState();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  if (user.onboardingComplete) {
    return <Navigate to={resolveNextRoute(user)} replace />;
  }
  return <OnboardingPage />;
};

const AvatarRoute = () => {
  const { user } = useAppState();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  if (!user.onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }
  if (user.avatarConfigured) {
    return <Navigate to="/app/home" replace />;
  }
  return <AvatarPage />;
};

const AppRoute = () => {
  const { user } = useAppState();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  if (!user.onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }
  if (!user.avatarConfigured) {
    return <Navigate to="/avatar" replace />;
  }
  return <MainLayout />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<SplashPage />} />
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/onboarding" element={<OnboardingRoute />} />
    <Route path="/avatar" element={<AvatarRoute />} />
    <Route path="/app" element={<AppRoute />}>
      <Route path="home" element={<HomePage />} />
      <Route path="tasks" element={<TasksPage />} />
      <Route path="calendar" element={<CalendarPage />} />
      <Route path="badges" element={<BadgesPage />} />
      <Route path="shop" element={<MarketplacePage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="" element={<Navigate to="home" replace />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App = () => {
  useEffect(() => {
    document.title = 'Cortex Companion';
  }, []);

  return (
    <AppStateProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppStateProvider>
  );
};

export default App;
