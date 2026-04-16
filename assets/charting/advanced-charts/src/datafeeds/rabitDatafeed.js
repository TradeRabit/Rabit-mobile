import { onReady } from '../utils/rabitOnReady';
import { resolveSymbol } from '../utils/rabitResolveSymbol';
import { getBars } from '../utils/rabitGetBars';
import { searchSymbols } from '../utils/rabitSearchSymbols';
import { subscribeBars, unsubscribeBars } from '../utils/rabitStreaming';

const rabitDatafeed = {
  onReady,
  searchSymbols,
  resolveSymbol,
  getBars,
  subscribeBars,
  unsubscribeBars,
};

export default rabitDatafeed;
