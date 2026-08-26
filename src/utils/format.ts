export function formatPrice(value: number, currency = 'PLN'): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency,
  }).format(value);
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat('pl-PL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function shortId(value: string): string {
  return `${value.slice(0, 8)}…${value.slice(-4)}`;
}
