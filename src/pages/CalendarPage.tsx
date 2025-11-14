import { FormEvent, useMemo, useState } from 'react';
import { useAppState } from '../context/AppStateContext';

const CalendarPage = () => {
  const { events, addEvent, removeEvent } = useAppState();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: selectedDate,
    time: '09:00',
    category: 'Pessoal',
  });

  const eventsOfDay = useMemo(
    () => events.filter((event) => event.date === selectedDate),
    [events, selectedDate],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.title.trim()) {
      return;
    }
    addEvent({
      title: formData.title.trim(),
      date: formData.date,
      time: formData.time,
      category: formData.category,
    });
    setShowForm(false);
    setFormData({ title: '', date: selectedDate, time: '09:00', category: 'Pessoal' });
  };

  return (
    <div className="page">
      <section className="card">
        <header className="card__header">
          <div>
            <h1>Calendário</h1>
            <p>Visualize eventos e tarefas com horário definido.</p>
          </div>
          <button type="button" className="button button--primary" onClick={() => setShowForm(true)}>
            Novo evento
          </button>
        </header>
        <div className="calendar__toolbar">
          <label className="field">
            <span>Data selecionada</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(event) => {
                setSelectedDate(event.target.value);
                setFormData((data) => ({ ...data, date: event.target.value }));
              }}
            />
          </label>
        </div>
        <ul className="list list--events">
          {eventsOfDay.length === 0 && <li className="list__empty">Nenhum evento nesta data.</li>}
          {eventsOfDay.map((item) => (
            <li key={item.id}>
              <div>
                <strong>{item.time}</strong>
                <span>{item.title}</span>
                <small>{item.category}</small>
              </div>
              <button type="button" className="button button--ghost" onClick={() => removeEvent(item.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      </section>

      {showForm && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal__content">
            <header>
              <h2>Novo evento</h2>
            </header>
            <form className="modal__form" onSubmit={handleSubmit}>
              <label className="field">
                <span>Título</span>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(event) => setFormData((data) => ({ ...data, title: event.target.value }))}
                  required
                />
              </label>
              <div className="modal__row">
                <label className="field">
                  <span>Data</span>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(event) => setFormData((data) => ({ ...data, date: event.target.value }))}
                    required
                  />
                </label>
                <label className="field">
                  <span>Hora</span>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(event) => setFormData((data) => ({ ...data, time: event.target.value }))}
                    required
                  />
                </label>
              </div>
              <label className="field">
                <span>Categoria</span>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(event) => setFormData((data) => ({ ...data, category: event.target.value }))}
                />
              </label>
              <footer className="modal__actions">
                <button type="button" className="button button--ghost" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
                <button type="submit" className="button button--primary">
                  Salvar evento
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
