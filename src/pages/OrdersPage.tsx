import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ordersApi } from '../api/ordersApi';
import { StatusMessage } from '../components/StatusMessage';
import type { OrderDTO } from '../types/api';
import { formatDate, formatPrice, shortId } from '../utils/format';
import { useLanguage } from '../i18n/LanguageContext';

export function OrdersPage() {
  const { language, t } = useLanguage();
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    ordersApi.mine().then(setOrders).catch((e) => setError(e instanceof Error ? e.message : 'Unable to load orders.')).finally(() => setLoading(false));
  }, []);

  return (
    <section className="section page-section">
      <div className="container narrow-container">
        <div className="page-title-row"><div><span className="eyebrow">{t('account')}</span><h1>{t('orders')}</h1></div></div>
        {error && <StatusMessage type="error">{error}</StatusMessage>}
        {loading ? (
          <div className="inline-loader"><span className="spinner" /> Loading orders…</div>
        ) : orders.length === 0 ? (
          <div className="empty-state"><strong>{t('noOrders')}</strong><p>{t('noOrdersText')}</p><Link className="button" to="/products">{t('browseCatalog')}</Link></div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <Link className="order-card" to={`/orders/${order.orderId}`} key={order.orderId}>
                <div><span className="eyebrow">{t('order')}</span><strong>{shortId(order.orderId)}</strong><small>{formatDate(order.createdAt, language)}</small></div>
                <div><span>{t('status')}</span><strong className="status-pill">{order.status}</strong></div>
                <div><span>{t('items')}</span><strong>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</strong></div>
                <div className="order-card-total"><span>{t('total')}</span><strong>{formatPrice(order.totalAmount, order.currency, language)}</strong></div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
