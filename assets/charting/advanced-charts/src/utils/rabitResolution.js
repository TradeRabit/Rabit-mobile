const resolutionToIntervalMap = {
  '1': '1m',
  '5': '5m',
  '15': '15m',
  '60': '1h',
  '240': '4h',
  '1D': '1d',
};

const resolutionToBucketMsMap = {
  '1': 60 * 1000,
  '5': 5 * 60 * 1000,
  '15': 15 * 60 * 1000,
  '60': 60 * 60 * 1000,
  '240': 4 * 60 * 60 * 1000,
  '1D': 24 * 60 * 60 * 1000,
};

export function mapResolutionToInterval(resolution) {
  const normalizedResolution = String(resolution || '60').toUpperCase();
  return resolutionToIntervalMap[normalizedResolution] || '1h';
}

export function getResolutionBucketMs(resolution) {
  const normalizedResolution = String(resolution || '60').toUpperCase();
  return resolutionToBucketMsMap[normalizedResolution] || 60 * 60 * 1000;
}
