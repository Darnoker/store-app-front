import type { ProductType } from '../types/api';

export function ProductVisual({ type, large = false }: { type: ProductType; large?: boolean }) {
  return (
    <div className={`product-visual product-visual-${type.toLowerCase()} ${large ? 'product-visual-large' : ''}`}>
      <div className="visual-orbit" />
      <div className="visual-symbol" aria-hidden="true">
        {type === 'BOOK' ? 'B' : 'S'}
      </div>
      <span>{type === 'BOOK' ? 'BOOK' : 'SWORD'}</span>
    </div>
  );
}
