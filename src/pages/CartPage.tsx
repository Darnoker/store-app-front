import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ordersApi } from '../api/ordersApi';
import { useAuth } from '../auth/AuthContext';
import { useCart } from '../cart/CartContext';
import { StatusMessage } from '../components/StatusMessage';
import { formatPrice } from '../utils/format';

export function CartPage() {
  const { items, total, setQuantity, remove, clear } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const checkout = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const order = await ordersApi.create({
        items: items.map((item) => ({ productId: item.product.id, quantity: item.quantity })),
      });
      clear();
      navigate(`/orders/${order.orderId}`, { state: { created: true } });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Nie udało się utworzyć zamówienia.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section page-section">
      <div className="container">
        <div className="page-title-row">
          <div><span className="eyebrow">ZAMÓWIENIE</span><h1>Koszyk</h1></div>
          {items.length > 0 && <button className="link-button" type="button" onClick={clear}>Wyczyść koszyk</button>}
        </div>

        {error && <StatusMessage type="error">{error}</StatusMessage>}

        {items.length === 0 ? (
          <div className="empty-state">
            <strong>Koszyk jest pusty.</strong>
            <p>Dodaj książkę albo miecz z katalogu.</p>
            <Link className="button" to="/products">Przejdź do produktów</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-list">
              {items.map(({ product, quantity }) => (
                <article className="cart-item" key={product.id}>
                  <div className={`mini-product-mark mini-${product.productType.toLowerCase()}`}>{product.productType === 'BOOK' ? 'B' : 'S'}</div>
                  <div className="cart-item-copy">
                    <span className="eyebrow">{product.productType}</span>
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                    <small>{formatPrice(product.price)} / szt.</small>
                  </div>
                  <label className="qty-control">Ilość<input type="number" min="1" value={quantity} onChange={(e) => setQuantity(product.id, Number(e.target.value))} /></label>
                  <strong>{formatPrice(product.price * quantity)}</strong>
                  <button className="remove-button" type="button" onClick={() => remove(product.id)} aria-label={`Usuń ${product.name}`}>×</button>
                </article>
              ))}
            </div>

            <aside className="order-summary">
              <span className="eyebrow">PODSUMOWANIE</span>
              <div><span>Pozycje</span><strong>{items.reduce((sum, item) => sum + item.quantity, 0)}</strong></div>
              <div className="summary-total"><span>Razem</span><strong>{formatPrice(total)}</strong></div>
              <button className="button button-full" type="button" disabled={submitting} onClick={() => void checkout()}>
                {submitting ? 'Tworzenie zamówienia…' : isAuthenticated ? 'Złóż zamówienie' : 'Zaloguj się i zamów'}
              </button>
              <small>Backend przypisze zamówienie do użytkownika na podstawie JWT.</small>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
