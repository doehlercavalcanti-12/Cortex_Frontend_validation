import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarPreview from '../components/AvatarPreview';
import { avatarPresets } from '../data/mockData';
import { useAppState } from '../context/AppStateContext';

const AvatarPage = () => {
  const navigate = useNavigate();
  const { user, configureAvatar } = useAppState();
  const [avatarName, setAvatarName] = useState('Cortex');
  const [selectedPreset, setSelectedPreset] = useState(avatarPresets[0]);
  const [accent, setAccent] = useState(avatarPresets[0].accent);

  useEffect(() => {
    if (!user) {
      void navigate('/auth');
    } else if (!user.onboardingComplete) {
      void navigate('/onboarding');
    }
  }, [navigate, user]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    configureAvatar({ avatarName: avatarName.trim() || 'Cortex', accent });
    void navigate('/app/home');
  };

  const handleSelectPreset = (presetId: string) => {
    const preset = avatarPresets.find((item) => item.id === presetId) ?? avatarPresets[0];
    setSelectedPreset(preset);
    setAccent(preset.accent);
  };

  return (
    <section className="screen screen--avatar">
      <div className="avatar-setup">
        <header className="avatar-setup__header">
          <h1>Escolha quem vai te acompanhar</h1>
          <p>Selecione um estilo para o avatar, defina um nome e personalize a cor principal.</p>
        </header>
        <div className="avatar-setup__content">
          <AvatarPreview name={avatarName} accent={accent} />
          <form className="avatar-setup__form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Nome do avatar</span>
              <input
                type="text"
                value={avatarName}
                onChange={(event) => setAvatarName(event.target.value)}
                placeholder="Ex.: Cortex"
                required
              />
            </label>
            <fieldset className="avatar-setup__presets">
              <legend>Modelos base</legend>
              <div className="avatar-setup__preset-grid">
                {avatarPresets.map((preset) => (
                  <button
                    type="button"
                    key={preset.id}
                    className={`avatar-setup__preset${selectedPreset.id === preset.id ? ' is-selected' : ''}`}
                    onClick={() => handleSelectPreset(preset.id)}
                  >
                    <span className="avatar-setup__preset-color" style={{ background: preset.accent }} />
                    <span className="avatar-setup__preset-name">{preset.name}</span>
                    <small>{preset.description}</small>
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="field">
              <span>Cor principal</span>
              <input
                type="color"
                value={accent}
                onChange={(event) => setAccent(event.target.value)}
                aria-label="Cor principal do avatar"
              />
            </label>
            <button type="submit" className="button button--primary">
              Confirmar avatar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AvatarPage;
