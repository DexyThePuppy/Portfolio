(function () {
  window.__prof = 'running';
  function profileSwitch(tabId, cb) {
    var frames = [];
    var running = true;
    var t0 = performance.now();
    function tick(t) { frames.push(t); if (running) requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
    document.getElementById(tabId).click();
    setTimeout(function () {
      running = false;
      var longFrames = [];
      for (var i = 1; i < frames.length; i++) {
        var d = frames[i] - frames[i - 1];
        if (d > 25) longFrames.push({ atMs: Math.round(frames[i] - t0), durMs: Math.round(d) });
      }
      cb({ tab: tabId, frames: frames.length, longFrames: longFrames });
    }, 1600);
  }
  profileSwitch('tab-socials', function (r1) {
    setTimeout(function () {
      profileSwitch('tab-tech', function (r2) {
        setTimeout(function () {
          profileSwitch('tab-platforms', function (r3) {
            window.__prof = JSON.stringify([r1, r2, r3]);
          });
        }, 400);
      });
    }, 400);
  });
})();
