import { Outlet, NavLink, ScrollRestoration } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="root-layout">
      <ScrollRestoration />
      <header>
        <nav>
          <h1>Jobarouter</h1>
          <NavLink to="/">Home</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
