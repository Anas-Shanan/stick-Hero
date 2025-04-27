const platformConfig = {
  minGap: 40, // Minimum gap between platforms
  maxGap: 420, // Maximum gap between platforms
  height: 500,
  MIN_WIDTH: 40,
  MAX_WIDTH: 180,
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
          width: 15,
          height: 8,
          x: this.position.x + this.width / 2 - 7.5,
          y: this.position.y,
        };
  }

  //////////////////////// functions //////////////////////////////////////

  drawPlatform(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.fillStyle = "red";
    ctx.fillRect(
      this.middlePoint.x,
      this.middlePoint.y,
      this.middlePoint.width,
      this.middlePoint.height
    );
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
    Math.random() * platformConfig.maxGap;

  const newPlatform = new Platform(newPosX, canvas);
  platforms.push(newPlatform);

  /*   if (platforms.length > 15) {
      platforms.shift(); // to remove oldest platform
    } */
}
