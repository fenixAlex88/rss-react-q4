import { Outlet } from 'react-router-dom';
import Search from '../components/Search';
import Home from '../pages/Home';

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <Search />
      </header>
      <hr />
      <main>
        <Home />
        <Outlet />
      </main>
    </div>
  );
}
