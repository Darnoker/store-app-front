import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsApi } from '../api/productsApi';
import { ProductCard } from '../components/ProductCard';
import type { ProductDTO } from '../types/api';
import { useLanguage } from '../i18n/LanguageContext';

export function HomePage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    let active = true;
    productsApi
      .list()
      .then((data) => active && setProducts(data.slice(0, 4)))
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">STORE APP / MICROSERVICES DEMO</span>
            <h1>{t('homeTitle').split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1>
            <p>{t('homeText')}</p>
            <div className="hero-actions">
              <Link className="button" to="/products">{t('browseProducts')}</Link>
              <Link className="button button-ghost" to="/register">{t('createAccount')}</Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-card hero-book">
              <span>01</span>
              <strong>BOOK</strong>
              <small>stories / knowledge</small>
            </div>
            <div className="hero-card hero-sword">
              <span>02</span>
              <strong>SWORD</strong>
              <small>steel / craft</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CATALOG</span>
              <h2>{t('latestProducts')}</h2>
            </div>
            <Link className="text-link" to="/products">View all →</Link>
          </div>

          {products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="empty-state compact">
              <strong>{t('catalogEmpty')}</strong>
              <p>{t('catalogEmptyText')}</p>
            </div>
          )}
        </div>
      </section>

      <section className="section section-dark">
        <div className="container feature-grid">
          <div><span>01</span><h3>Gateway first</h3><p>The frontend knows only one API address.</p></div>
          <div><span>02</span><h3>JWT</h3><p>The user session powers the profile and orders.</p></div>
          <div><span>03</span><h3>Typed API</h3><p>TypeScript models match the OpenAPI contracts.</p></div>
        </div>
      </section>
    </>
  );
}
