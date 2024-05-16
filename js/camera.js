// Cria uma camera
const camera = {
  x: 0,
  y: 0,
  width: 1,
  height: 1,
  rotation: 0,
  follow: undefined,
  smooth: 1,
  update() {
    if (this.follow.body) {
      var targetX = this.follow.body.position[0];
      var targetY = this.follow.body.position[1];
      var dx = (targetX - this.x) * this.smooth;
      var dy = (targetY - this.y) * this.smooth;
      this.x += dx;
      this.y += dy;
    }else{
      var targetX = this.follow.x;
      var targetY = this.follow.y;
      var dx = (targetX - this.x) * this.smooth;
      var dy = (targetY - this.y) * this.smooth;
      this.x += dx;
      this.y += dy;
    }
  }
};