export const styles = {
  root: 'sticky top-24 flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5',
  title: 'text-lg font-semibold text-primary',
  rows: 'flex flex-col gap-2',
  row: 'flex items-baseline justify-between text-sm text-secondary',
  rowLabel: 'text-sm text-secondary',
  rowValue: 'tabular-nums text-primary',
  divider: 'h-px w-full bg-border',
  totalRow: 'flex items-baseline justify-between',
  totalLabel: 'text-base font-semibold text-primary',
  totalValue: 'text-xl font-bold tabular-nums text-primary',
  checkout:
    'mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  clear:
    'inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-transparent px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-error/40 hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error',
} as const
