import { FormEvent, useRef, useState } from 'react';
import { useAppState } from '../context/AppStateContext';

const ChatPanel = () => {
  const { chat, sendMessage, triggerQuickAction } = useAppState();
  const [input, setInput] = useState('');
  const listRef = useRef<HTMLUListElement | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
    setInput('');
    window.requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    });
  };

  return (
    <section className="card chat">
      <header className="card__header">
        <div>
          <h2>Converse com o Cortex</h2>
          <p>Use o chat para planejar o dia, criar tarefas e ajustar sua rotina.</p>
        </div>
      </header>
      <ul className="chat__history" ref={listRef}>
        {chat.map((message) => (
          <li key={message.id} className={`chat__message chat__message--${message.sender}`}>
            <span>{message.content}</span>
          </li>
        ))}
      </ul>
      <div className="chat__quick">
        <button type="button" onClick={() => triggerQuickAction('planDay')}>
          Organizar meu dia
        </button>
        <button type="button" onClick={() => triggerQuickAction('createRoutine')}>
          Criar rotina
        </button>
        <button type="button" onClick={() => triggerQuickAction('addTask')}>
          Adicionar tarefa rápida
        </button>
      </div>
      <form className="chat__input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite sua mensagem"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button type="submit" className="button button--primary">
          Enviar
        </button>
      </form>
    </section>
  );
};

export default ChatPanel;
