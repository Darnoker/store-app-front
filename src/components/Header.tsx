import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useCart } from '../cart/CartContext';

export function Header() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="Store App — strona główna">
          <span className="brand-mark">S</span>
          <span>
            <strong>Store App</strong>
            <small>books & blades</small>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Główna nawigacja">
          <NavLink to="/products">Produkty</NavLink>
          {isAuthenticated && <NavLink to="/orders">Zamówienia</NavLink>}
          {isAdmin && <NavLink to="/admin/products/new">Dodaj produkt</NavLink>}
        </nav>

        <div className="header-actions">
          <Link className="cart-link" to="/cart">
            Koszyk <span className="cart-count">{itemCount}</span>
          </Link>

          {isAuthenticated ? (
            <div className="user-actions">
              <Link className="user-chip" to="/profile">
                {user?.firstName || user?.email || 'Konto'}
              </Link>
              <button className="link-button" type="button" onClick={logout}>
                Wyloguj
              </button>
            </div>
          ) : (
            <div className="user-actions">
              <Link className="link-button as-link" to="/login">Zaloguj</Link>
              <Link className="button button-small" to="/register">Załóż konto</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
