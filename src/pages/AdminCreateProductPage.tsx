import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsApi } from '../api/productsApi';
import { StatusMessage } from '../components/StatusMessage';
import type { ProductType } from '../types/api';

const initialBook = { isbn: '', pages: '1', author: '', publisher: '', language: '' };
const initialSword = { damage: '1', weight: '1', length: '1', material: '' };

export function AdminCreateProductPage() {
  const navigate = useNavigate();
  const [base, setBase] = useState({ name: '', description: '', price: '', productType: 'BOOK' as ProductType });
  const [book, setBook] = useState(initialBook);
  const [sword, setSword] = useState(initialSword);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const details: Record<string, string | number> = base.productType === 'BOOK'
      ? { isbn: book.isbn, pages: Number(book.pages), author: book.author, publisher: book.publisher, language: book.language }
      : { damage: Number(sword.damage), weight: Number(sword.weight), length: Number(sword.length), material: sword.material };

    try {
      const product = await productsApi.create({
        name: base.name,
        description: base.description,
        price: Number(base.price),
        productType: base.productType,
        details,
      });
      navigate(`/products/${product.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to create the product.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section page-section">
      <div className="container form-container">
        <span className="eyebrow">ADMIN</span>
        <h1>Add product</h1>
        <p>This form maps to `CreateProductRequest` and the domain-specific `details` for BOOK/SWORD.</p>
        {error && <StatusMessage type="error">{error}</StatusMessage>}

        <form className="admin-form" onSubmit={submit}>
          <div className="form-section">
            <h2>Basic information</h2>
            <label>Name<input required maxLength={255} value={base.name} onChange={(e) => setBase({ ...base, name: e.target.value })} /></label>
            <label>Description<textarea required rows={5} value={base.description} onChange={(e) => setBase({ ...base, description: e.target.value })} /></label>
            <div className="form-row">
              <label>Price (PLN)<input required type="number" min="0.01" step="0.01" value={base.price} onChange={(e) => setBase({ ...base, price: e.target.value })} /></label>
              <label>Type<select value={base.productType} onChange={(e) => setBase({ ...base, productType: e.target.value as ProductType })}><option value="BOOK">BOOK</option><option value="SWORD">SWORD</option></select></label>
            </div>
          </div>

          <div className="form-section">
            <h2>Details / {base.productType}</h2>
            {base.productType === 'BOOK' ? (
              <>
                <div className="form-row"><label>ISBN<input required value={book.isbn} onChange={(e) => setBook({ ...book, isbn: e.target.value })} /></label><label>Pages<input required type="number" min="1" value={book.pages} onChange={(e) => setBook({ ...book, pages: e.target.value })} /></label></div>
                <label>Author<input required value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} /></label>
                <div className="form-row"><label>Publisher<input required value={book.publisher} onChange={(e) => setBook({ ...book, publisher: e.target.value })} /></label><label>Language<input required value={book.language} onChange={(e) => setBook({ ...book, language: e.target.value })} /></label></div>
              </>
            ) : (
              <>
                <div className="form-row"><label>Damage<input required type="number" min="0" value={sword.damage} onChange={(e) => setSword({ ...sword, damage: e.target.value })} /></label><label>Weight<input required type="number" min="0" step="0.01" value={sword.weight} onChange={(e) => setSword({ ...sword, weight: e.target.value })} /></label></div>
                <div className="form-row"><label>Length<input required type="number" min="0" step="0.01" value={sword.length} onChange={(e) => setSword({ ...sword, length: e.target.value })} /></label><label>Material<input required value={sword.material} onChange={(e) => setSword({ ...sword, material: e.target.value })} /></label></div>
              </>
            )}
          </div>
          <button className="button" disabled={submitting} type="submit">{submitting ? 'Saving…' : 'Create product'}</button>
        </form>
      </div>
    </section>
  );
}
