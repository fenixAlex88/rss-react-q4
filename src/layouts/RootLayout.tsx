import { Outlet } from 'react-router-dom';
import Home from '../pages/Home';

export default function RootLayout() {
  return (
    <div className="root-layout">
      <main className="flex items-center justify-center">
        <Home />
        <Outlet />
      </main>
    </div>
  );
}
