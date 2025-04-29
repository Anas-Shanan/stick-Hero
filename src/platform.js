/* import { camera } from "./main.js"; */

const platformConfig = {
  minGap: 40, // Minimum gap between platforms
  maxGap: 420, // Maximum gap between platforms
  height: 500,
  MIN_WIDTH: 62,
  MAX_WIDTH: 150,
  color: "black",
};

export default class Platform {
  constructor(posX, canvas, width) {
    this.canvas = canvas;
    this.height = platformConfig.height;
    this.color = platformConfig.color;
    this.width = width
      ? width
      : Math.random() * platformConfig.MAX_WIDTH + platformConfig.MIN_WIDTH;

    this.position = {
      x: posX,
      y: this.canvas.height - this.height,
    };
    this.rightEdge = this.position.x + this.width;

    this.middlePoint = width
      ? 0
      : {
          width: 20,
          height: 8,
          x: this.position.x + this.width / 2 - 10,
          y: this.position.y,
        };
    this.isNew = false;
    this.animationProgress = 0;
    this.animationDuration = 7; // frames
  }

  //////////////////////// functions //////////////////////////////////////

  drawPlatform(ctx) {
    // Handle animation for new platforms
    if (this.isNew) {
      this.animationProgress++;

      if (this.animationProgress >= this.animationDuration) {
        this.isNew = false;
      }

      // Calculate animation progress (0 to 1)
      const progress = this.animationProgress / this.animationDuration;

      // Apply animation effects

      const initialX = this.position.x + 500;
      const currentX = initialX + (this.position.x - initialX) * progress;

      // Save context state
      ctx.save();

      // Apply transformations
      ctx.translate(this.position.x + this.width / 2, this.position.y);
      ctx.translate(-(this.position.x + this.width / 2), -this.position.y);

      // Draw the animated platform
      ctx.fillStyle = this.color;
      ctx.fillRect(currentX, this.position.y, this.width, this.height);

      // Draw middle point if it exists
      if (this.middlePoint && this.middlePoint.x) {
        ctx.fillStyle = "red";
        ctx.fillRect(
          currentX,
          this.middlePoint.y,

          this.middlePoint.width,
          this.middlePoint.height
        );
      }

      // Restore context state
      ctx.restore();
    } else {
      // Draw normal platform without animation
      ctx.fillStyle = this.color;
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

      // Draw middle point if it exists
      if (this.middlePoint && this.middlePoint.x) {
        ctx.fillStyle = "red";
        ctx.fillRect(
          this.middlePoint.x,
          this.middlePoint.y,
          this.middlePoint.width,
          this.middlePoint.height
        );
      }
    }
  }
}

export const platforms = [];
const canvas = document.getElementById("gameCanvas");
export function initPlatforms() {
  platforms.length = 0;
  let startPosX = 200; // Starting X position

  const firstPlatform = new Platform(startPosX, canvas, 150);
  platforms.push(firstPlatform);

  const secondPosition = firstPlatform.rightEdge + platformConfig.minGap;
  platforms.push(new Platform(secondPosition + 100, canvas));
}
initPlatforms();

////////// add new platform

export function addPlatform() {
  const lastPlatform = platforms[platforms.length - 1];

  const newPosX =
    lastPlatform.rightEdge +
    platformConfig.minGap +
    Math.random() * (platformConfig.maxGap - platformConfig.minGap);

  const newPlatform = new Platform(newPosX, canvas);
  newPlatform.isNew = true;
  platforms.push(newPlatform);

  /*  if (platforms.length > 7) {
    const firstPlatform = platforms[0];
    if (firstPlatform.rightEdge < camera.x - 100) {
      platforms.shift();
    }
  } */
}
