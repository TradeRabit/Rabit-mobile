/**
 * Chart State Manager - Persistent state for TradingView chart
 */

const STORAGE_KEY = 'tradingview_chart_state';

class ChartStateManager {
  constructor() {
    this.state = this.loadState();
  }

  /**
   * Load state from localStorage
   */
  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const state = JSON.parse(saved);
        console.log('[ChartState] Loaded state:', state);
        return state;
      }
    } catch (error) {
      console.error('[ChartState] Error loading state:', error);
    }

    // Default state
    return {
      symbol: 'BTC',
      timeframe: '60',
      chartType: 1, // Candles
      indicators: [],
      drawings: [],
      lastUpdated: Date.now(),
    };
  }

  /**
   * Save state to localStorage
   */
  saveState(state) {
    try {
      this.state = {
        ...this.state,
        ...state,
        lastUpdated: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      console.log('[ChartState] Saved state:', this.state);
    } catch (error) {
      console.error('[ChartState] Error saving state:', error);
    }
  }

  /**
   * Get current state
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Update symbol
   */
  setSymbol(symbol) {
    this.saveState({ symbol });
  }

  /**
   * Update timeframe
   */
  setTimeframe(timeframe) {
    this.saveState({ timeframe });
  }

  /**
   * Update chart type
   */
  setChartType(chartType) {
    this.saveState({ chartType });
  }

  /**
   * Add indicator
   */
  addIndicator(indicator) {
    const indicators = [...this.state.indicators];
    
    // Check if indicator already exists
    const exists = indicators.find(i => 
      i.name === indicator.name && i.entity_id === indicator.entity_id
    );
    
    if (!exists) {
      indicators.push(indicator);
      this.saveState({ indicators });
    }
  }

  /**
   * Remove indicator
   */
  removeIndicator(entityId) {
    const indicators = this.state.indicators.filter(
      i => i.entity_id !== entityId
    );
    this.saveState({ indicators });
  }

  /**
   * Add drawing
   */
  addDrawing(drawing) {
    const drawings = [...this.state.drawings, drawing];
    this.saveState({ drawings });
  }

  /**
   * Remove drawing
   */
  removeDrawing(drawingId) {
    const drawings = this.state.drawings.filter(
      d => d.id !== drawingId
    );
    this.saveState({ drawings });
  }

  /**
   * Clear all drawings
   */
  clearDrawings() {
    this.saveState({ drawings: [] });
  }

  /**
   * Clear all state
   */
  clearState() {
    localStorage.removeItem(STORAGE_KEY);
    this.state = this.loadState();
  }

  /**
   * Check if state is fresh (less than 24 hours old)
   */
  isStateFresh() {
    const age = Date.now() - this.state.lastUpdated;
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    return age < maxAge;
  }
}

// Singleton instance
let instance = null;

export function getChartStateManager() {
  if (!instance) {
    instance = new ChartStateManager();
  }
  return instance;
}

export default ChartStateManager;
