import { useEffect, useState } from 'react';
import { productsApi } from '../api/productsApi';
import { ProductCard } from '../components/ProductCard';
import { StatusMessage } from '../components/StatusMessage';
import type { ProductDTO, ProductType } from '../types/api';

export function ProductsPage() {
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
      setError(e instanceof Error ? e.message : 'Nie udało się pobrać produktów.');
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
            <span className="eyebrow">KATALOG</span>
            <h1>Produkty</h1>
            <p>Filtrowanie korzysta bezpośrednio z parametrów API product-service.</p>
          </div>
        </div>

        <form className="filter-bar" onSubmit={(event) => { event.preventDefault(); void load(); }}>
          <label>
            Typ
            <select value={type} onChange={(e) => setType(e.target.value as ProductType | '')}>
              <option value="">Wszystkie</option>
              <option value="BOOK">Książki</option>
              <option value="SWORD">Miecze</option>
            </select>
          </label>
          <label>
            Cena od
            <input type="number" min="0" step="0.01" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="0" />
          </label>
          <label>
            Cena do
            <input type="number" min="0" step="0.01" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="bez limitu" />
          </label>
          <button className="button" type="submit">Filtruj</button>
        </form>

        {error && <StatusMessage type="error">{error}</StatusMessage>}

        {loading ? (
          <div className="inline-loader"><span className="spinner" /> Pobieranie katalogu…</div>
        ) : products.length ? (
          <div className="product-grid">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="empty-state"><strong>Brak produktów.</strong><p>Zmień filtry albo dodaj produkt jako administrator.</p></div>
        )}
      </div>
    </section>
  );
}
