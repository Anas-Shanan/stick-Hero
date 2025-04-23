export default class Platform {
  constructor(posX, canvas, width) {
    this.canvas = canvas;
    this.width = width ? width : Math.random() * 200 + 20;
    this.height = 500;
    this.color = "black";

    this.position = {
      x: posX,
      y: this.canvas.height - this.height,
    };
    this.rightEdge = this.position.x + this.width;

    this.middlePoint = width
      ? 0
      : {
          x: this.position.x + this.width / 2 - 3,
          y: this.position.y,
          width: 6,
          height: 4,
        };
  }

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

const config = {
  minGap: 80, // Minimum gap between platforms
  maxGap: 220, // Maximum gap between platforms
};

export const platforms = [];
const canvas = document.getElementById("gameCanvas");
let startPosX = 200; // Starting X position

const firstPlatform = new Platform(startPosX, canvas, 150);
platforms.push(firstPlatform);

const secondPosition = firstPlatform.rightEdge + config.minGap;
platforms.push(new Platform(secondPosition + 100, canvas));

////////// add new platform

export function addPlatform() {
  const lastPlatform = platforms[platforms.length - 1];

  const newPosX =
    lastPlatform.rightEdge +
    config.minGap +
    Math.random() * (config.maxGap - config.minGap);

  const newPlatform = new Platform(newPosX, canvas);
  platforms.push(newPlatform);

  /*   if (platforms.length > 15) {
      platforms.shift(); // to remove oldest platform
    } */
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    addPlatform();
    console.log("platforms array", platforms);
  }
});
