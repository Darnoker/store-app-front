import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productsApi } from '../api/productsApi';
import { useCart } from '../cart/CartContext';
import { ProductVisual } from '../components/ProductVisual';
import { StatusMessage } from '../components/StatusMessage';
import type { ProductDTO } from '../types/api';
import { formatPrice } from '../utils/format';

export function ProductDetailsPage() {
  const { productId = '' } = useParams();
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const { add } = useCart();

  useEffect(() => {
    productsApi.get(productId).then(setProduct).catch((e) => setError(e instanceof Error ? e.message : 'Nie udało się pobrać produktu.'));
  }, [productId]);

  if (error) {
    return <section className="section page-section"><div className="container"><StatusMessage type="error">{error}</StatusMessage></div></section>;
  }

  if (!product) {
    return <section className="section page-section"><div className="container inline-loader"><span className="spinner" /> Pobieranie produktu…</div></section>;
  }

  const details = Object.entries(product.details).filter(([, value]) => value !== null && value !== undefined);

  return (
    <section className="section page-section">
      <div className="container">
        <Link className="text-link back-link" to="/products">← Wróć do katalogu</Link>
        <div className="product-detail-grid">
          <ProductVisual type={product.productType} large />
          <div className="product-detail-copy">
            <span className="eyebrow">{product.productType}</span>
            <h1>{product.name}</h1>
            <div className="detail-price">{formatPrice(product.price)}</div>
            <p className="detail-description">{product.description}</p>

            <dl className="details-list">
              {details.map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{String(value)}</dd>
                </div>
              ))}
            </dl>

            <div className="buy-row">
              <label>
                Ilość
                <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} />
              </label>
              <button className="button" type="button" onClick={() => add(product, quantity)}>
                Dodaj do koszyka
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
