const runtimeState = {
  symbol: null,
  exchange: null,
  apiBaseUrl: null,
};

function readSearchParams() {
  if (typeof window === 'undefined') {
    return new URLSearchParams();
  }

  return new URLSearchParams(window.location.search);
}

export function normalizeAssetSymbol(symbol) {
  const normalized = String(symbol || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9/-]/g, '');

  if (!normalized) {
    return 'BTC';
  }

  const withoutPerp = normalized.replace(/-PERP$/i, '');
  const compact = withoutPerp.replace(/\//g, '');

  if (compact.endsWith('USDT')) {
    return compact.slice(0, -4);
  }

  if (compact.endsWith('USD')) {
    return compact.slice(0, -3);
  }

  return compact;
}

export function normalizeExchange(exchange) {
  const normalized = String(exchange || 'phantom_futures').trim().toLowerCase();
  if (normalized === 'phantom_spot' || normalized === 'spot') {
    return 'phantom_spot';
  }
  return 'phantom_futures';
}

function normalizeApiBaseUrl(value) {
  const normalized = String(value || '').trim();
  return normalized ? normalized.replace(/\/+$/, '') : '';
}

export function getChartRuntimeConfig() {
  const params = readSearchParams();
  const symbol = runtimeState.symbol || normalizeAssetSymbol(params.get('symbol'));
  const exchange = runtimeState.exchange || normalizeExchange(params.get('exchange'));
  const apiBaseUrl = runtimeState.apiBaseUrl || normalizeApiBaseUrl(params.get('apiBaseUrl'));

  return {
    symbol,
    exchange,
    apiBaseUrl,
    ohlcSource: exchange,
  };
}

export function setChartRuntimeConfig(nextConfig = {}) {
  if (nextConfig.symbol) {
    runtimeState.symbol = normalizeAssetSymbol(nextConfig.symbol);
  }

  if (nextConfig.exchange) {
    runtimeState.exchange = normalizeExchange(nextConfig.exchange);
  }

  if (Object.prototype.hasOwnProperty.call(nextConfig, 'apiBaseUrl')) {
    runtimeState.apiBaseUrl = normalizeApiBaseUrl(nextConfig.apiBaseUrl);
  }

  return getChartRuntimeConfig();
}

export function buildChartApiUrl(path) {
  const { apiBaseUrl } = getChartRuntimeConfig();
  if (!apiBaseUrl) {
    throw new Error('Chart runtime missing apiBaseUrl');
  }

  return `${apiBaseUrl}${path}`;
}

export function buildChartWsUrl(path) {
  const { apiBaseUrl } = getChartRuntimeConfig();
  if (!apiBaseUrl) {
    throw new Error('Chart runtime missing apiBaseUrl');
  }

  return `${apiBaseUrl.replace(/^http/i, 'ws')}${path}`;
}
