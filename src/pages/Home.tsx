import { useState } from 'react';
import InstallButton from '../components/InstallButton';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <section className="card">
      <h1 className="text-2xl font-bold mb-3">Pomodoro MVP</h1>
      <p className="mb-4">Versión mínima para validar App Shell + Offline.</p>
      <button className="btn" onClick={() => setCount((c) => c + 1)}>
        🍅 count is {count}
      </button>
      <p className=" my-4">Instalar la PWA</p>
      <InstallButton />
    </section>
  );
}
