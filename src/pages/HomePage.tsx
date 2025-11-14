import { useMemo } from 'react';
import AvatarCard from '../components/AvatarCard';
import ChatPanel from '../components/ChatPanel';
import { taskCategoryClass } from '../constants';
import { useAppState } from '../context/AppStateContext';

const HomePage = () => {
  const { tasks, events, toggleTask } = useAppState();
  const today = new Date().toISOString().split('T')[0];

  const todaysTasks = useMemo(() => tasks.filter((task) => task.date === today), [tasks, today]);
  const todaysEvents = useMemo(() => events.filter((event) => event.date === today), [events, today]);

  return (
    <div className="home">
      <AvatarCard />
      <ChatPanel />
      <section className="card today">
        <header className="card__header">
          <h2>Hoje</h2>
          <p>Resumo rápido das próximas tarefas e eventos.</p>
        </header>
        <div className="today__content">
          <div>
            <h3>Tarefas</h3>
            <ul className="list">
              {todaysTasks.length === 0 && <li className="list__empty">Nenhuma tarefa para hoje.</li>}
              {todaysTasks.slice(0, 4).map((task) => (
                <li key={task.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span>
                      {task.title}
                      {task.time ? <small>{task.time}</small> : null}
                    </span>
                    <span className={`tag tag--${taskCategoryClass[task.category]}`}>{task.category}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Próximos eventos</h3>
            <ul className="list">
              {todaysEvents.length === 0 && <li className="list__empty">Sem eventos hoje.</li>}
              {todaysEvents.slice(0, 3).map((event) => (
                <li key={event.id}>
                  <div>
                    <strong>{event.title}</strong>
                    <small>
                      {event.time} • {event.category}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
