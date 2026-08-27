import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useCart } from '../cart/CartContext';
import { useLanguage } from '../i18n/LanguageContext';

export function Header() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { itemCount } = useCart();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="Store App — home page">
          <span className="brand-mark">S</span>
          <span>
            <strong>Store App</strong>
            <small>books & blades</small>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/products">{t('products')}</NavLink>
          {isAuthenticated && <NavLink to="/orders">{t('orders')}</NavLink>}
          {isAdmin && <NavLink to="/admin/products/new">{t('addProduct')}</NavLink>}
        </nav>

        <div className="header-actions">
          <Link className="cart-link" to="/cart">
            {t('cart')} <span className="cart-count">{itemCount}</span>
          </Link>

          {isAuthenticated ? (
            <div className="user-actions">
              <Link className="user-chip" to="/profile">
                {user?.firstName || user?.email || t('account')}
              </Link>
              <button className="link-button" type="button" onClick={logout}>
                {t('signOut')}
              </button>
            </div>
          ) : (
            <div className="user-actions">
              <Link className="link-button as-link" to="/login">{t('signIn')}</Link>
              <Link className="button button-small" to="/register">{t('createAccount')}</Link>
            </div>
          )}
          <label className="language-select">
            <span className="sr-only">{t('language')}</span>
            <select value={language} onChange={(event) => setLanguage(event.target.value as 'en' | 'pl')} aria-label={t('language')}>
              <option value="en">EN</option>
              <option value="pl">PL</option>
            </select>
          </label>
        </div>
      </div>
    </header>
  );
}
