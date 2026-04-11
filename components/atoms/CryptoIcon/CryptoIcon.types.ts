import { tokens } from "@/constants/theme";

export type CryptoIconVariant = "mono" | "color";

export interface CryptoIconProps {
  /** Nama asset (case sensitive, sesuai @web3icons/react, contoh: 'Btc', 'Eth') */
  name: string;
  /** Ukuran icon, default 24 */
  size?: number;
  /** Varian icon: 'mono' (satu warna) atau 'color' (warna asli asset) */
  variant?: CryptoIconVariant;
  /** Warna untuk varian mono, default ambil dari textPrimary */
  color?: "primary" | "secondary" | "brand" | string;
}
