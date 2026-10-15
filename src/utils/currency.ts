/**
 * Formats an integer amount in Indonesian rupiah, e.g. `120000` -> `"Rp 120.000"`.
 */
export function formatRupiah(amount: number): string {
  return `Rp ${new Intl.NumberFormat("id-ID").format(amount)}`;
}
