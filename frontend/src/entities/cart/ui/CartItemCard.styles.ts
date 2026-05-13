export const styles = {
  root: 'flex gap-4 rounded-2xl border border-border bg-surface p-3 transition-colors hover:border-accent/20 sm:p-4',
  thumbnailWrap: 'h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-hover sm:h-24 sm:w-24',
  thumbnail: 'h-full w-full object-cover',
  body: 'flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4',
  info: 'flex flex-col gap-1 min-w-0',
  link: 'text-base font-semibold text-primary no-underline transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md line-clamp-2',
  category: 'text-xs text-muted',
  unitPrice: 'text-sm text-secondary',
  controls: 'flex items-center gap-3 sm:gap-4',
  qtyGroup: 'inline-flex items-center rounded-xl border border-border bg-background',
  qtyButton:
    'flex h-8 w-8 items-center justify-center rounded-xl text-secondary transition-colors hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent',
  qtyValue: 'min-w-8 text-center text-sm font-medium text-primary tabular-nums',
  lineTotal: 'min-w-20 text-right text-base font-bold text-primary tabular-nums',
  remove:
    'flex h-8 w-8 items-center justify-center rounded-xl text-muted transition-colors hover:bg-error/10 hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error',
}
