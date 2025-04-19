import platform from "./platform.js";

export default class Stick {
  constructor(platform) {
    this.platform = platform;
    this.width = 3;
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

  rotateStick(ctx) {
    if (!this.isPressing) {
      ctx.clearRect(
        this.position.x,
        this.position.y,
        this.width + 1,
        this.height
      );
      ctx.save();

      ctx.translate(this.position.x, this.position.y + this.height);
      ctx.rotate(Math.PI / 2);
      ctx.fillStyle = "this.color";
      ctx.fillRect(-this.width, -this.height, this.width, this.height);
      ctx.restore();
    }
  }

  increaseHeight(ctx) {
    if (this.isPressing) {
      this.height += 1 * this.speed;
      this.position.y -= 1 * this.speed;
      this.drawStick(ctx);
    }
  }
}
