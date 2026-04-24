export function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatCompactUSD(value: number): string {
  if (value >= 1_000_000) {
    const n = value / 1_000_000
    return `${Number.isInteger(n) ? n : n.toFixed(1)}M USD`
  }
  if (value >= 1_000) {
    const n = value / 1_000
    return `${Number.isInteger(n) ? n : n.toFixed(1)}K USD`
  }
  return `${value} USD`
}
