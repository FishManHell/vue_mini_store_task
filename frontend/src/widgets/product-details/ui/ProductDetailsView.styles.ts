export const styles = {
  root: 'flex flex-col gap-8',
  backLink:
    'inline-flex w-fit items-center gap-1.5 text-sm font-medium text-secondary no-underline transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md',
  hero: 'grid gap-6 md:grid-cols-2 md:gap-10',
  thumbnailWrap: 'aspect-square w-full overflow-hidden rounded-2xl border border-border bg-surface',
  thumbnail: 'h-full w-full object-cover',
  info: 'flex flex-col gap-4',
  badge:
    'inline-flex w-fit items-center rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent',
  name: 'text-3xl font-bold leading-tight text-primary md:text-4xl',
  price: 'text-2xl font-bold text-primary md:text-3xl',
  short: 'text-base leading-relaxed text-secondary',
  addToCart:
    'mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto',
  section: 'flex flex-col gap-3',
  sectionTitle: 'text-lg font-semibold text-primary',
  longDescription: 'whitespace-pre-line text-base leading-relaxed text-secondary',
} as const
