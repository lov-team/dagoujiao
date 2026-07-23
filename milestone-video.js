'use strict';

(function exposeMilestoneVideo(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.dagouMilestoneVideo = api;
})(typeof globalThis === 'object' ? globalThis : this, () => {
  function createMilestoneCounter(interval) {
    let count = 0;

    return {
      get count() {
        return count;
      },
      registerClick() {
        count += 1;
        return count % interval === 0;
      },
      retryMilestone() {
        count = Math.max(0, count - 1);
      },
    };
  }

  return { createMilestoneCounter };
});
