import { CryptoIconVariant } from "../../atoms/CryptoIcon";

export interface AssetRowProps {
  /** Nama asset untuk CryptoIcon (e.g. 'Eth') */
  name: string;
  /** Label panjang aset (e.g. 'Ethereum') */
  label: string;
  /** Ticker/Simbol (e.g. 'ETH') */
  symbol: string;
  /** Harga saat ini (e.g. '$3,718.71') */
  price: string;
  /** Persentase perubahan (e.g. '4.66%') */
  change: string;
  /** Apakah tren positif (naik) atau negatif (turun) */
  isPositive: boolean;
  /** Ukuran icon, default 40 agar sesuai desain bunderan besar */
  iconSize?: number;
  /** Status apakah aset ini favorit */
  isFavorite?: boolean;
  /** Varian tampilan: default (besar) atau compact (kecil) */
  variant?: 'default' | 'compact';
  /** Callback saat tombol favorite ditekan */
  onToggleFavorite?: () => void;
}
