// USD -> PKR display helper. Catalog stores USD numbers; UI shows PKR.
export const USD_TO_PKR = 280;

export function formatPKR(usd: number): string {
  const pkr = Math.round(usd * USD_TO_PKR);
  return `Rs ${pkr.toLocaleString("en-PK")}`;
}
