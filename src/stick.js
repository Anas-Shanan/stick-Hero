import platform from "./platform.js";

export default class Stick {
  constructor(platform) {
    this.platform = platform;
    this.width = 5;
    this.height = 0;
    this.speed = 3;
    this.position = {
      x: platform.position.x + platform.width - this.width,
      y: platform.position.y,
    };

    this.color = "black";
    this.isPressing = false;
  }
  drawStick(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  rotatStick() {}

  increaseHeight(ctx) {
    if (this.isPressing) {
      this.height += 1 * this.speed;
      this.position.y -= 1 * this.speed;
      this.drawStick(ctx);
    }
  }
}
