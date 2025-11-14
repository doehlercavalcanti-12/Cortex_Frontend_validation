import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAppState();

  const handleLogout = () => {
    logout();
    void navigate('/auth');
  };

  return (
    <div className="page">
      <button type="button" className="link" onClick={() => void navigate(-1)}>
        ← Voltar
      </button>
      <section className="card profile">
        <header className="card__header">
          <div>
            <h1>Perfil</h1>
            <p>Gerencie suas preferências e dados da conta.</p>
          </div>
        </header>
        <div className="profile__info">
          <div className="profile__avatar">{user?.name?.[0]?.toUpperCase() ?? 'C'}</div>
          <div>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className="profile__section">
          <h3>Preferências</h3>
          <ul>
            <li>
              <span>Idioma</span>
              <strong>Português (Brasil)</strong>
            </li>
            <li>
              <span>Fuso horário</span>
              <strong>GMT-3</strong>
            </li>
          </ul>
        </div>
        <div className="profile__section">
          <h3>Plano</h3>
          <p>Você está no plano <strong>Free</strong>. Em breve novos planos para turbinar seu avatar.</p>
        </div>
        <button type="button" className="button button--ghost" onClick={handleLogout}>
          Sair
        </button>
      </section>
    </div>
  );
};

export default ProfilePage;
