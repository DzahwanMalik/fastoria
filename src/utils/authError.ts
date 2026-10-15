/**
 * Maps a raw Supabase auth error message to a user-facing Indonesian string.
 *
 * Invalid credentials are collapsed into a single generic message so the login
 * form cannot be used to discover which accounts exist (account enumeration).
 */
export function getAuthErrorMessage(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Email atau password salah.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Email belum dikonfirmasi. Hubungi administrator.";
  }

  if (
    normalized.includes("too many requests") ||
    normalized.includes("rate limit")
  ) {
    return "Terlalu banyak percobaan. Coba lagi beberapa saat.";
  }

  if (normalized.includes("failed to fetch") || normalized.includes("network")) {
    return "Koneksi gagal. Periksa jaringan lalu coba lagi.";
  }

  return "Gagal masuk. Silakan coba lagi.";
}
