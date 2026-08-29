export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date, locale: 'es' | 'fi' = 'es'): string {
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'fi-FI', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function getInitials(firstName: string, lastName: string): string {
  return (firstName?.[0] || '') + (lastName?.[0] || '');
}
