export const formatPrice = (value: number) => {
  const cents = Math.round(value * 100)

  if (Number.isNaN(cents)) {
    return "0"
  }

  if (cents % 100 === 0) {
    return String(cents / 100)
  }

  return (cents / 100).toFixed(2)
}
