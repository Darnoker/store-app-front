import { Link } from 'react-router-dom';
import type { ProductDTO } from '../types/api';
import { formatPrice } from '../utils/format';
import { ProductVisual } from './ProductVisual';
import { useCart } from '../cart/CartContext';
import { useLanguage } from '../i18n/LanguageContext';

export function ProductCard({ product }: { product: ProductDTO }) {
  const { add } = useCart();
  const { language, t } = useLanguage();

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-visual-link">
        <ProductVisual type={product.productType} />
      </Link>
      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="eyebrow">{product.productType === 'BOOK' ? t('book') : t('sword')}</span>
          <strong>{formatPrice(product.price, 'PLN', language)}</strong>
        </div>
        <Link className="product-title" to={`/products/${product.id}`}>
          {product.name}
        </Link>
        <p>{product.description}</p>
        <div className="card-actions">
          <Link className="text-link" to={`/products/${product.id}`}>{t('details')}</Link>
          <button className="button button-small" type="button" onClick={() => add(product)}>
            {t('addToCart')}
          </button>
        </div>
      </div>
    </article>
  );
}
