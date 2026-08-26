import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsApi } from '../api/productsApi';
import { ProductCard } from '../components/ProductCard';
import type { ProductDTO } from '../types/api';

export function HomePage() {
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
            <h1>Historie do czytania.<br />Ostrza do kolekcji.</h1>
            <p>
              Jeden sklep, dwa typy produktów i backend oparty o mikroserwisy. Front komunikuje się
              wyłącznie przez gateway.
            </p>
            <div className="hero-actions">
              <Link className="button" to="/products">Przeglądaj produkty</Link>
              <Link className="button button-ghost" to="/register">Załóż konto</Link>
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
              <span className="eyebrow">KATALOG</span>
              <h2>Ostatnie produkty</h2>
            </div>
            <Link className="text-link" to="/products">Zobacz wszystkie →</Link>
          </div>

          {products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="empty-state compact">
              <strong>Katalog czeka na produkty.</strong>
              <p>Gdy product-service zwróci dane, pojawią się tutaj automatycznie.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section section-dark">
        <div className="container feature-grid">
          <div><span>01</span><h3>Gateway first</h3><p>Frontend zna tylko jeden adres API.</p></div>
          <div><span>02</span><h3>JWT</h3><p>Sesja użytkownika zasila profil i zamówienia.</p></div>
          <div><span>03</span><h3>Typed API</h3><p>Modele TypeScript odpowiadają kontraktom OpenAPI.</p></div>
        </div>
      </section>
    </>
  );
}
