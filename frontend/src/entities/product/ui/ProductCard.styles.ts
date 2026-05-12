export const styles = {
  card: 'group block rounded-2xl border border-border bg-surface no-underline transition-colors duration-200 hover:border-accent/30 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
  article: 'flex flex-col gap-3 p-4',
  thumbnailWrap: 'aspect-square w-full overflow-hidden rounded-xl bg-surface-hover',
  thumbnail: 'h-full w-full object-cover',
  body: 'flex flex-col gap-2',
  badge:
    'inline-flex w-fit items-center rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent',
  name: 'line-clamp-2 text-base font-semibold text-primary',
  description: 'line-clamp-2 text-sm text-secondary',
  footer: 'mt-1 flex items-center justify-between',
  price: 'text-lg font-bold text-primary',
  arrow:
    'text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent',
} as const
