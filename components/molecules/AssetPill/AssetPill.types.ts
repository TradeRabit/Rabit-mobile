import { tokens } from "@/constants/theme";

export interface AssetPillProps {
  /** Nama asset untuk CryptoIcon (e.g. 'Btc') */
  name: string;
  /** Label yang ditampilkan (e.g. 'Bitcoin') */
  label: string;
  /** Simbol (e.g. 'BTC') */
  symbol: string;
  /** Persentase perubahan (e.g. '+2.5%') */
  change?: string;
  /** Apakah naik atau turun untuk warna change */
  isPositive?: boolean;
}
