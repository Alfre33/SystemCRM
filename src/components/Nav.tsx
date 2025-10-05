import { Link, NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b-3 border-black/10">
      <nav className="mx-auto max-w-3xl flex items-center justify-between px-4 py-3">
        <Link to="/" className="font-extrabold text-xl">
          🍅 PomoDash
        </Link>
        <div className="flex gap-2">
          <NavLink to="/" className="navlink">
            Home
          </NavLink>
          <NavLink to="/habits" className="navlink">
            Habits
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
