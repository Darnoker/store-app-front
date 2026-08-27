import { useEffect, useState } from 'react';
import { productsApi } from '../api/productsApi';
import { ProductCard } from '../components/ProductCard';
import { StatusMessage } from '../components/StatusMessage';
import type { ProductDTO, ProductType } from '../types/api';
import { useLanguage } from '../i18n/LanguageContext';

export function ProductsPage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [type, setType] = useState<ProductType | ''>('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await productsApi.list({
        type,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      });
      setProducts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : t('unableProducts'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // filters are submitted explicitly
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="section page-section">
      <div className="container">
        <div className="page-title-row">
          <div>
            <span className="eyebrow">CATALOG</span>
            <h1>{t('products')}</h1>
            <p>Filtering uses the product service API parameters directly.</p>
          </div>
        </div>

        <form className="filter-bar" onSubmit={(event) => { event.preventDefault(); void load(); }}>
          <label>
            {t('type')}
            <select value={type} onChange={(e) => setType(e.target.value as ProductType | '')}>
              <option value="">{t('all')}</option>
              <option value="BOOK">{t('books')}</option>
              <option value="SWORD">{t('swords')}</option>
            </select>
          </label>
          <label>
            {t('minPrice')}
            <input type="number" min="0" step="0.01" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="0" />
          </label>
          <label>
            {t('maxPrice')}
            <input type="number" min="0" step="0.01" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder={t('noLimit')} />
          </label>
          <button className="button" type="submit">{t('filter')}</button>
        </form>

        {error && <StatusMessage type="error">{error}</StatusMessage>}

        {loading ? (
          <div className="inline-loader"><span className="spinner" /> Loading catalog…</div>
        ) : products.length ? (
          <div className="product-grid">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="empty-state"><strong>{t('noProducts')}</strong><p>{t('noProductsText')}</p></div>
        )}
      </div>
    </section>
  );
}
