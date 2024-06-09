function update() {
    let lastTime = 0;
    function loop(timestamp) {
      const dt = timestamp - lastTime;
      if (typeof TIC === 'function') {
        TIC(dt);
      }
      lastTime = timestamp;
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }
  update();