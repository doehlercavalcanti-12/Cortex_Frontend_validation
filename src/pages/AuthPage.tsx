import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useAppState();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      return;
    }
    login({ name: name.trim() || 'Explorador', email: email.trim() });
    void navigate('/onboarding');
  };

  return (
    <section className="screen screen--auth">
      <div className="auth-card">
        <div className="auth-card__header">
          <span className="auth-card__label">Bem-vindo ao</span>
          <h1>Cortex Companion</h1>
          <p>Um avatar que organiza sua rotina, incentiva hábitos e celebra cada conquista.</p>
        </div>
        <div className="auth-card__switch">
          <button
            type="button"
            className={mode === 'login' ? 'is-active' : ''}
            onClick={() => setMode('login')}
          >
            Entrar
          </button>
          <button
            type="button"
            className={mode === 'signup' ? 'is-active' : ''}
            onClick={() => setMode('signup')}
          >
            Criar conta
          </button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <label className="field">
              <span>Como devemos te chamar?</span>
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          )}
          <label className="field">
            <span>E-mail</span>
            <input
              type="email"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="field">
            <span>Senha</span>
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={4}
              required
            />
          </label>
          <button type="submit" className="button button--primary">
            {mode === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AuthPage;
