export const onReady = (callback) => {
  console.log('[Rabit Datafeed] onReady dipanggil');
  setTimeout(() => {
    callback({
      supports_marks: false,
      supports_timescale_marks: false,
      supports_time: true,
      supported_resolutions: ['1', '5', '15', '60', '240', '1D'],
    });
  }, 0);
};
