# TradingView Chart State Management

## Overview

Chart state is automatically saved to localStorage and restored when the chart loads. This ensures users don't lose their chart configuration when navigating away from the assist page.

## Saved State

The following state is persisted:

```javascript
{
  symbol: 'BTCUSDT',           // Current trading pair
  timeframe: '60',             // Chart timeframe (1, 5, 15, 60, D, W, M)
  chartType: 1,                // Chart type (0=Bars, 1=Candles, 2=Line, etc.)
  indicators: [                // Added indicators
    {
      name: 'Relative Strength Index',
      entity_id: 'U6sTgy',
      inputs: { length: 14 }
    }
  ],
  drawings: [                  // Chart drawings
    {
      id: 'hline_123456',
      type: 'horizontal_line',
      params: { price: 95000, color: '#FD4C01' }
    }
  ],
  lastUpdated: 1776331528181   // Timestamp
}
```

## Auto-restore Behavior

### On Chart Load
1. Chart loads saved state from localStorage
2. Applies saved symbol and timeframe
3. Restores chart type if different from default
4. Restores indicators (if state is fresh < 24 hours)
5. Chart is ready to receive commands

### State Freshness
- Indicators are only restored if state is less than 24 hours old
- This prevents stale indicator configurations
- Symbol and timeframe are always restored

## State Updates

State is automatically updated when:
- User changes symbol via agent command (`SET_SYMBOL`)
- User changes timeframe via agent command (`SET_TIMEFRAME`)
- User changes chart type via agent command (`SET_CHART_TYPE`)
- Agent adds indicator (`ADD_INDICATOR`)
- Agent removes indicator (`REMOVE_INDICATOR`)
- Agent draws on chart (`DRAW_LINE`, `DRAW_HORIZONTAL_LINE`)
- Agent clears drawings (`CLEAR_DRAWINGS`)

## Pre-loading Strategy

### Problem
Chart must be loaded before agent can send commands. If user hasn't opened assist page, chart isn't loaded.

### Solution
Chart is now **always rendered in minimized state** by default:
- Chart WebView loads immediately when assist page mounts
- Chart is hidden (height: 0, opacity: 0) when minimized
- Chart is fully functional and can receive commands
- User can expand chart by clicking header
- Agent can send commands immediately without waiting

### Benefits
1. ✅ Agent can control chart immediately
2. ✅ No delay waiting for chart to load
3. ✅ Seamless user experience
4. ✅ State is preserved across sessions

## Usage in Agent

Agent can now send commands without checking if chart is open:

```python
# Agent can immediately control chart
await tv_set_symbol("BTC")
await tv_set_timeframe("60")
await tv_add_indicator("RSI")

# Chart will execute commands even if minimized
# User will see results when they expand chart
```

## Manual State Management

### Clear State
```javascript
import { getChartStateManager } from './utils/chartStateManager';

const stateManager = getChartStateManager();
stateManager.clearState();
```

### Get Current State
```javascript
const state = stateManager.getState();
console.log('Current symbol:', state.symbol);
```

### Update State Manually
```javascript
stateManager.setSymbol('ETHUSDT');
stateManager.setTimeframe('15');
stateManager.addIndicator({
  name: 'MACD',
  entity_id: 'abc123',
  inputs: { fast: 12, slow: 26 }
});
```

## Storage Key

State is stored in localStorage with key: `tradingview_chart_state`

## Debugging

Enable console logs to see state operations:
```javascript
// In chartStateManager.js
console.log('[ChartState] Loaded state:', state);
console.log('[ChartState] Saved state:', this.state);
```

## Future Enhancements

- [ ] Sync state with backend database
- [ ] Multi-user state management
- [ ] State versioning for migrations
- [ ] Export/import chart configurations
- [ ] Preset chart layouts
