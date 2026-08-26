import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return <section className="section page-section"><div className="container empty-state"><span className="eyebrow">404</span><strong>Nie ma takiej strony.</strong><Link className="button" to="/">Wróć do sklepu</Link></div></section>;
}
