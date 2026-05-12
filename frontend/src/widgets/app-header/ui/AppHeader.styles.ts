export const styles = {
  header: 'sticky top-0 z-40 w-full border-b border-border bg-surface',
  container: 'mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6',
  logo: 'text-base font-semibold tracking-tight text-primary',
  nav: 'flex items-center gap-1',
  cartLink:
    'relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-secondary transition-colors duration-200 hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
  cartBadge: '!absolute -right-1 -top-1',
} as const
