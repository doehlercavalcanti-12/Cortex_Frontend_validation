import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onboardingActivityPeriods, onboardingFocusOptions, onboardingHabitOptions } from '../constants';
import { useAppState } from '../context/AppStateContext';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user, completeOnboarding } = useAppState();
  const [step, setStep] = useState(0);
  const [focusArea, setFocusArea] = useState<typeof onboardingFocusOptions[number]>('Estudos');
  const [habits, setHabits] = useState<(typeof onboardingHabitOptions)[number][]>(['Leitura']);
  const [activePeriod, setActivePeriod] = useState<typeof onboardingActivityPeriods[number]>('Manhã');

  const progress = useMemo(() => ((step + 1) / 3) * 100, [step]);

  const toggleHabit = (habit: typeof onboardingHabitOptions[number]) => {
    setHabits((current) =>
      current.includes(habit) ? current.filter((item) => item !== habit) : [...current, habit],
    );
  };

  const handleNext = (event: FormEvent) => {
    event.preventDefault();
    if (step < 2) {
      setStep((value) => value + 1);
      return;
    }
    completeOnboarding({ focusArea, habits, activePeriod });
    void navigate('/avatar');
  };

  useEffect(() => {
    if (!user) {
      void navigate('/auth');
    }
  }, [navigate, user]);

  return (
    <section className="screen screen--onboarding">
      <div className="onboarding">
        <header className="onboarding__header">
          <span className="onboarding__greeting">Olá, {user?.name ?? 'explorador'}!</span>
          <h1>Vamos personalizar seu Cortex Companion</h1>
          <div className="onboarding__progress" aria-hidden>
            <div className="onboarding__progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </header>
        <form className="onboarding__form" onSubmit={handleNext}>
          {step === 0 && (
            <div className="onboarding__step">
              <h2>O que você mais quer organizar agora?</h2>
              <div className="pill-group">
                {onboardingFocusOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => setFocusArea(option)}
                    className={focusArea === option ? 'is-selected' : ''}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="onboarding__step">
              <h2>Quais hábitos você quer melhorar?</h2>
              <div className="checkbox-grid">
                {onboardingHabitOptions.map((habit) => (
                  <label key={habit} className={habits.includes(habit) ? 'is-selected' : ''}>
                    <input
                      type="checkbox"
                      checked={habits.includes(habit)}
                      onChange={() => toggleHabit(habit)}
                    />
                    <span>{habit}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="onboarding__step">
              <h2>Qual faixa de horário você costuma estar mais ativo?</h2>
              <div className="pill-group">
                {onboardingActivityPeriods.map((period) => (
                  <button
                    type="button"
                    key={period}
                    onClick={() => setActivePeriod(period)}
                    className={activePeriod === period ? 'is-selected' : ''}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          )}
          <footer className="onboarding__footer">
            <button
              type="button"
              className="button button--ghost"
              onClick={() => setStep((value) => Math.max(0, value - 1))}
              disabled={step === 0}
            >
              Voltar
            </button>
            <button type="submit" className="button button--primary">
              {step === 2 ? 'Concluir' : 'Continuar'}
            </button>
          </footer>
        </form>
      </div>
    </section>
  );
};

export default OnboardingPage;
