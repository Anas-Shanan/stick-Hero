const stickConfig = {
  width: 4,
  growSpeed: 5,
  color: "black",
  rotationSpeed: 1,
};

export default class Stick {
  constructor(platform) {
    this.platform = platform;
    this.height = 0;
    this.position = {
      x: platform.position.x + platform.width - stickConfig.width,
      y: platform.position.y,
    };

    this.isPressing = false;
    this.collision = false;
  }
  //////////////////////// functions //////////////////////////////////////

  resetCollision() {
    this.collision = false;
  }

  drawStick(ctx) {
    ctx.fillStyle = stickConfig.color;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      stickConfig.width,
      this.height
    );
  }

  rotateStick(ctx) {
    if (!this.isPressing) {
      ctx.clearRect(
        this.position.x - 1,
        this.position.y,
        stickConfig.width + 2,
        this.height
      );
      ctx.save();

      ctx.translate(this.position.x, this.position.y + this.height);
      ctx.rotate((stickConfig.rotationSpeed * Math.PI) / 2);
      ctx.fillStyle = stickConfig.color;
      ctx.fillRect(
        -stickConfig.width,
        -this.height,
        stickConfig.width,
        this.height
      );
      ctx.restore();
      this.collision = true;
    }
    /* return (this.collision = true); */
  }

  increaseHeight(ctx) {
    if (this.isPressing) {
      this.height += 1 * stickConfig.growSpeed;
      this.position.y -= 1 * stickConfig.growSpeed;
      this.drawStick(ctx);
    }
  }
}
