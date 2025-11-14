import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';
import { resolveNextRoute } from '../utils/navigation';

const SplashPage = () => {
  const navigate = useNavigate();
  const { user } = useAppState();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void navigate(resolveNextRoute(user));
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [navigate, user]);

  return (
    <section className="screen screen--splash">
      <div className="splash__glow" aria-hidden />
      <div className="splash__content">
        <span className="splash__badge">Cortex Labs</span>
        <h1>Cortex Companion</h1>
        <p>Seu avatar, sua rotina, sua evolução.</p>
        <div className="splash__loading">
          <div className="splash__dot" />
          <div className="splash__dot" />
          <div className="splash__dot" />
        </div>
      </div>
    </section>
  );
};

export default SplashPage;
