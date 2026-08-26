import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ordersApi } from '../api/ordersApi';
import { StatusMessage } from '../components/StatusMessage';
import type { OrderDTO } from '../types/api';
import { formatDate, formatPrice, shortId } from '../utils/format';

export function OrdersPage() {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    ordersApi.mine().then(setOrders).catch((e) => setError(e instanceof Error ? e.message : 'Nie udało się pobrać zamówień.')).finally(() => setLoading(false));
  }, []);

  return (
    <section className="section page-section">
      <div className="container narrow-container">
        <div className="page-title-row"><div><span className="eyebrow">TWOJE KONTO</span><h1>Zamówienia</h1></div></div>
        {error && <StatusMessage type="error">{error}</StatusMessage>}
        {loading ? (
          <div className="inline-loader"><span className="spinner" /> Pobieranie zamówień…</div>
        ) : orders.length === 0 ? (
          <div className="empty-state"><strong>Nie masz jeszcze zamówień.</strong><p>Pierwsze zamówienie pojawi się tutaj po checkout.</p><Link className="button" to="/products">Przejdź do katalogu</Link></div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <Link className="order-card" to={`/orders/${order.orderId}`} key={order.orderId}>
                <div><span className="eyebrow">ORDER</span><strong>{shortId(order.orderId)}</strong><small>{formatDate(order.createdAt)}</small></div>
                <div><span>Status</span><strong className="status-pill">{order.status}</strong></div>
                <div><span>Pozycje</span><strong>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</strong></div>
                <div className="order-card-total"><span>Razem</span><strong>{formatPrice(order.totalAmount, order.currency)}</strong></div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
