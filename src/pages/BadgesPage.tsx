import { useAppState } from '../context/AppStateContext';
import type { BadgeProgress } from '../types';

const BadgeLevelColor: Record<BadgeProgress['level'], string> = {
  Nenhum: '#cbd5f5',
  Bronze: '#b45309',
  Prata: '#64748b',
  Ouro: '#f59e0b',
};

const BadgesPage = () => {
  const { badges } = useAppState();

  return (
    <div className="page">
      <section className="card">
        <header className="card__header">
          <div>
            <h1>Badges e hábitos</h1>
            <p>Acompanhe seu progresso diário em cada hábito importante.</p>
          </div>
        </header>
        <div className="badge-grid">
          {badges.map((badge) => (
            <article key={badge.id} className="badge-card">
              <div className="badge-card__level" style={{ color: BadgeLevelColor[badge.level] }}>
                {badge.level}
              </div>
              <h2>{badge.name}</h2>
              <p>{badge.description}</p>
              <div className="badge-card__progress">
                <div
                  className="badge-card__progress-bar"
                  style={{ width: `${Math.min((badge.streak / badge.target) * 100, 100)}%` }}
                />
              </div>
              <div className="badge-card__footer">
                <span>{badge.category}</span>
                <strong>
                  {badge.streak}/{badge.target} dias
                </strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BadgesPage;
