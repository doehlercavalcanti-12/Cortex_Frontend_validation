import type { FC } from 'react';
import Icon from './Icon';

type TutorialOverlayProps = {
  onClose: () => void;
};

const TutorialOverlay: FC<TutorialOverlayProps> = ({ onClose }) => {
  return (
    <div className="tutorial" role="dialog" aria-modal="true" aria-label="Tutorial rápido">
      <div className="tutorial__card">
        <header className="tutorial__header">
          <h2>Como navegar</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Fechar tutorial">
            <Icon name="close" size={18} />
          </button>
        </header>
        <ol className="tutorial__steps">
          <li>
            <strong>Chat com o Cortex:</strong> converse comigo sempre que precisar organizar o dia.
          </li>
          <li>
            <strong>Lista de hoje:</strong> acompanhe tarefas e eventos prioritários no hub.
          </li>
          <li>
            <strong>Navegação rápida:</strong> use os ícones abaixo para acessar tarefas, calendário e badges.
          </li>
        </ol>
        <button type="button" className="button" onClick={onClose}>
          Entendi, vamos começar
        </button>
      </div>
    </div>
  );
};

export default TutorialOverlay;
