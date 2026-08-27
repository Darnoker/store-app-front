import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ordersApi } from '../api/ordersApi';
import { StatusMessage } from '../components/StatusMessage';
import type { OrderDTO } from '../types/api';
import { formatDate, formatPrice } from '../utils/format';

export function OrderDetailsPage() {
  const { orderId = '' } = useParams();
  const location = useLocation();
  const state = location.state as { created?: boolean } | null;
  const [order, setOrder] = useState<OrderDTO | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    ordersApi.get(orderId).then(setOrder).catch((e) => setError(e instanceof Error ? e.message : 'Unable to load the order.'));
  }, [orderId]);

  if (error) return <section className="section page-section"><div className="container"><StatusMessage type="error">{error}</StatusMessage></div></section>;
  if (!order) return <section className="section page-section"><div className="container inline-loader"><span className="spinner" /> Loading order…</div></section>;

  return (
    <section className="section page-section">
      <div className="container narrow-container">
        <Link className="text-link back-link" to="/orders">← All orders</Link>
        {state?.created && <StatusMessage type="success">Order created.</StatusMessage>}
        <div className="order-detail-head">
          <div><span className="eyebrow">ORDER ID</span><h1>{order.orderId}</h1><p>{formatDate(order.createdAt)}</p></div>
          <span className="status-pill status-pill-large">{order.status}</span>
        </div>

        <div className="order-lines">
          {order.items.map((item) => (
            <div className="order-line" key={item.orderItemId}>
              <div><span className="eyebrow">{item.productType}</span><Link to={`/products/${item.productId}`}>{item.productName}</Link></div>
              <span>{item.quantity} × {formatPrice(item.unitPrice, order.currency)}</span>
              <strong>{formatPrice(item.unitPrice * item.quantity, order.currency)}</strong>
            </div>
          ))}
          <div className="order-total-line"><span>Total</span><strong>{formatPrice(order.totalAmount, order.currency)}</strong></div>
        </div>
      </div>
    </section>
  );
}
