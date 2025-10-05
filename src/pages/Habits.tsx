import { useState } from 'react';
import { storage } from '../lib/storage';

export default function Habits() {
  const [txt, setTxt] = useState('');
  const [items, setItems] = useState<string[]>(() =>
    storage.get<string[]>('habits', [])
  );

  const add = () => {
    const name = txt.trim();
    if (!name) return;
    const next = [...items, name];
    setItems(next);
    storage.set('habits', next);
    setTxt('');
  };

  const del = (i: number) => {
    const next = items.filter((_, idx) => idx !== i);
    setItems(next);
    storage.set('habits', next);
  };

  return (
    <section className="card">
      <h1 className="text-2xl font-bold mb-4">Hábitos (local)</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="input flex-1"
          placeholder="Nuevo hábito"
          value={txt}
          onChange={(e) => setTxt(e.target.value)}
        />
        <button className="btn" onClick={add}>
          Agregar
        </button>
      </div>

      {items.length === 0 ? (
        <p className="opacity-70">Aún no hay hábitos. Agrega uno 👆</p>
      ) : (
        <ul className="grid gap-2">
          {items.map((h, i) => (
            <li
              key={i}
              className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border-3 border-black/10"
            >
              <span>✅ {h}</span>
              <button className="btn" onClick={() => del(i)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
