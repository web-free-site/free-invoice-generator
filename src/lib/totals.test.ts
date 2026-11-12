import { describe, expect, it } from 'vitest'
import { computeTotals } from './totals'

describe('computeTotals', () => {
  it('applies discount then VAT', () => {
    const r = computeTotals(1000, 10, 18, 'standard')
    expect(r.discount).toBe(100)
    expect(r.tax).toBeCloseTo(162)
    expect(r.total).toBeCloseTo(1062)
  })

  it('skips VAT when none', () => {
    const r = computeTotals(500, 0, 18, 'none')
    expect(r.tax).toBe(0)
    expect(r.total).toBe(500)
  })
})
