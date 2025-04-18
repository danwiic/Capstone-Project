export function formatMoney(
  amount: number | string,
  currency: string = "₱"
): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return `${currency}0.00`;
  return `${currency}${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
