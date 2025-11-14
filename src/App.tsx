import { useEffect, type FC } from 'react';

const App: FC = () => {
  useEffect(() => {
    document.title = 'React Boilerplate';
  }, []);

  return (
    <main className="app">
      <h1>React Boilerplate</h1>
      <p>
        This project provides a modern React + TypeScript setup powered by Vite. Start by
        editing <code>src/App.tsx</code> to customize your app.
      </p>
    </main>
  );
};

export default App;
