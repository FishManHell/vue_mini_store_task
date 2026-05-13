import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { effectScope } from 'vue'
import { useDebouncedCallback } from './use-debounced-callback'

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('delays invocation by the given timeout', () => {
    const fn = vi.fn<(value: string) => void>()
    const debounced = useDebouncedCallback(fn, 200)

    debounced('a')
    vi.advanceTimersByTime(199)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledExactlyOnceWith('a')
  })

  it('coalesces rapid calls into a single invocation with the latest arguments', () => {
    const fn = vi.fn<(value: string) => void>()
    const debounced = useDebouncedCallback(fn, 100)

    debounced('first')
    vi.advanceTimersByTime(50)
    debounced('second')
    vi.advanceTimersByTime(50)
    debounced('third')

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledExactlyOnceWith('third')
  })

  it('cancels the pending invocation when the effect scope is disposed', () => {
    const fn = vi.fn<(value: string) => void>()
    const scope = effectScope()
    scope.run(() => {
      const debounced = useDebouncedCallback(fn, 100)
      debounced('lost')
    })

    scope.stop()
    vi.advanceTimersByTime(200)
    expect(fn).not.toHaveBeenCalled()
  })
})
