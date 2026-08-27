import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return <section className="section page-section"><div className="container empty-state"><span className="eyebrow">404</span><strong>This page does not exist.</strong><Link className="button" to="/">Return to store</Link></div></section>;
}
