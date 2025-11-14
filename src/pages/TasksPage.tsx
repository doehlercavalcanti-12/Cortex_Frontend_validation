import { FormEvent, useMemo, useState } from 'react';
import { taskCategories } from '../constants';
import { useAppState } from '../context/AppStateContext';
import type { Task } from '../types';

type Filter = 'today' | 'tomorrow' | 'week' | 'all';

const getFilterLabel = (filter: Filter): string => {
  switch (filter) {
    case 'today':
      return 'Hoje';
    case 'tomorrow':
      return 'Amanhã';
    case 'week':
      return 'Semana';
    default:
      return 'Todas';
  }
};

const TasksPage = () => {
  const { tasks, addTask, toggleTask, removeTask } = useAppState();
  const [filter, setFilter] = useState<Filter>('today');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    date: string;
    time: string;
    category: Task['category'];
  }>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    category: taskCategories[0],
  });

  const filteredTasks = useMemo(() => {
    const today = new Date();
    const todayISO = today.toISOString().split('T')[0];
    const tomorrowISO = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    if (filter === 'today') {
      return tasks.filter((task) => task.date === todayISO);
    }
    if (filter === 'tomorrow') {
      return tasks.filter((task) => task.date === tomorrowISO);
    }
    if (filter === 'week') {
      const weekAhead = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return tasks.filter((task) => {
        const taskDate = new Date(task.date);
        return taskDate >= today && taskDate <= weekAhead;
      });
    }
    return tasks;
  }, [filter, tasks]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.title.trim()) {
      return;
    }
    addTask({
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      date: formData.date,
      time: formData.time || undefined,
      category: formData.category,
    });
    setShowForm(false);
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      category: taskCategories[0],
    });
  };

  return (
    <div className="page">
      <section className="card">
        <header className="card__header">
          <div>
            <h1>Tarefas</h1>
            <p>Controle total das suas missões e compromissos.</p>
          </div>
          <button type="button" className="button button--primary" onClick={() => setShowForm(true)}>
            Nova tarefa
          </button>
        </header>
        <div className="tasks__filters">
          {(['today', 'tomorrow', 'week', 'all'] as Filter[]).map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? 'is-active' : ''}
              onClick={() => setFilter(item)}
            >
              {getFilterLabel(item)}
            </button>
          ))}
        </div>
        <ul className="list list--tasks">
          {filteredTasks.length === 0 && <li className="list__empty">Nenhuma tarefa nesta visão.</li>}
          {filteredTasks.map((task: Task) => (
            <li key={task.id} className={task.completed ? 'is-completed' : ''}>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <div>
                    <strong>{task.title}</strong>
                    <small>
                      {task.date}
                      {task.time ? ` às ${task.time}` : ''} • {task.category}
                    </small>
                    {task.description && <p>{task.description}</p>}
                  </div>
                </label>
              </div>
              <button type="button" className="button button--ghost" onClick={() => removeTask(task.id)}>
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
              <h2>Nova tarefa</h2>
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
              <label className="field">
                <span>Descrição</span>
                <textarea
                  value={formData.description}
                  onChange={(event) => setFormData((data) => ({ ...data, description: event.target.value }))}
                  rows={3}
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
                  />
                </label>
              </div>
              <label className="field">
                <span>Categoria</span>
                <select
                  value={formData.category}
                  onChange={(event) =>
                    setFormData((data) => ({ ...data, category: event.target.value as Task['category'] }))
                  }
                >
                  {taskCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <footer className="modal__actions">
                <button type="button" className="button button--ghost" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
                <button type="submit" className="button button--primary">
                  Salvar tarefa
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
