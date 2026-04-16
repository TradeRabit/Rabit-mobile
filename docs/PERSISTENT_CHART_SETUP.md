# Persistent Chart Setup

Chart akan tetap active di background dan tidak reload saat navigasi dalam asset detail. Chart hanya reload saat keluar dari asset detail page.

## Setup Steps

### 1. Wrap App dengan ChartProvider

Di file `app/_layout.tsx` atau root layout, wrap dengan `ChartProvider`:

```tsx
import { ChartProvider } from '@/contexts/ChartContext';

export default function RootLayout() {
  return (
    <ChartProvider>
      {/* Your app content */}
    </ChartProvider>
  );
}
```

### 2. Update Asset Detail Page

Ganti placeholder chart dengan `PersistentChart`:

```tsx
import { PersistentChart } from '@/components/organisms/PersistentChart';

// Di dalam component
<View style={{ marginBottom: 32 }}>
  <PersistentChart 
    symbol={id as string} 
    height={220}
  />
  
  {/* Chart Controls Row */}
  {/* ... rest of controls ... */}
</View>
```

### 3. Export PersistentChart dari organisms

Update `components/organisms/index.ts`:

```tsx
export { PersistentChart } from './PersistentChart';
```

## How It Works

1. **ChartContext** - Menyimpan instance chart dan state di memory
2. **PersistentChart** - Component yang render WebView chart
3. **Symbol Change** - Saat navigasi ke asset lain, chart tidak reload, hanya ganti symbol via `postMessage`
4. **Cleanup** - Chart instance akan di-cleanup saat keluar dari asset detail (unmount)

## Benefits

- ✅ Chart tidak reload saat navigasi antar asset
- ✅ Smooth transition antar symbol
- ✅ Chart state (zoom, indicators, drawings) tetap preserved
- ✅ Lebih cepat dan efficient
- ✅ Better UX

## Notes

- Chart URL menggunakan `localhost:3000` - pastikan advanced-charts server running
- Untuk production, ganti dengan URL production chart server
- Chart akan auto-cleanup saat user keluar dari asset detail page
