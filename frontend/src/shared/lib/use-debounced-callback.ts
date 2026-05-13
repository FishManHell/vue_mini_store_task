import { getCurrentScope, onScopeDispose } from 'vue'

export function useDebouncedCallback<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  ms: number,
): (...args: TArgs) => void {
  let timer: ReturnType<typeof setTimeout> | null = null

  const cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  if (getCurrentScope()) {
    onScopeDispose(cancel)
  }

  return (...args: TArgs) => {
    cancel()
    timer = setTimeout(() => {
      timer = null
      fn(...args)
    }, ms)
  }
}
