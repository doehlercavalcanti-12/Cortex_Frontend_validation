import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../context/AppStateContext';
import Icon from '../Icon';

const TopBar = () => {
  const navigate = useNavigate();
  const { user } = useAppState();

  return (
    <header className="top-bar">
      <div className="top-bar__brand">
        <span className="top-bar__logo">Cortex Companion</span>
        <small className="top-bar__tagline">Seu avatar, sua rotina, sua evolução.</small>
      </div>
      <button
        type="button"
        className="top-bar__profile"
        onClick={() => navigate('/app/profile')}
        aria-label="Abrir perfil"
      >
        <div className="top-bar__profile-avatar" aria-hidden>
          {user?.name?.[0]?.toUpperCase() ?? 'C'}
        </div>
        <Icon name="profile" size={22} />
      </button>
    </header>
  );
};

export default TopBar;
