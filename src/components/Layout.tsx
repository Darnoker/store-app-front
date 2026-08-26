import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <span>Store App</span>
          <span>React frontend → gateway-service</span>
        </div>
      </footer>
    </div>
  );
}
