import { useMemo } from 'react';
import { useAppState } from '../context/AppStateContext';

const AvatarCard = () => {
  const { user, tasks, events } = useAppState();

  const today = new Date().toISOString().split('T')[0];
  const todaysTasks = useMemo(
    () => tasks.filter((task) => task.date === today && !task.completed),
    [tasks, today],
  );
  const todaysEvents = useMemo(() => events.filter((event) => event.date === today), [events, today]);

  return (
    <section className="card avatar-card">
      <div className="avatar-card__visual" style={{ borderColor: user?.avatarAccent ?? '#7c3aed' }}>
        <div className="avatar-card__pulse" style={{ background: user?.avatarAccent ?? '#7c3aed' }} />
        <div className="avatar-card__face" />
      </div>
      <div className="avatar-card__content">
        <h2>{user?.avatarName ?? 'Cortex'}</h2>
        <p>
          Hoje você tem <strong>{todaysTasks.length}</strong> tarefas e <strong>{todaysEvents.length}</strong>{' '}
          eventos.
        </p>
        <div className="avatar-card__status">
          <span>Nível {user?.level ?? 1}</span>
          <span>{user?.xp ?? 0} XP</span>
        </div>
      </div>
    </section>
  );
};

export default AvatarCard;
