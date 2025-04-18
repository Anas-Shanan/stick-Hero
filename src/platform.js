export default class Platform {
  constructor(posX, canvas) {
    this.canvas = canvas;
    this.width = Math.random() * 80 + 10;
    this.height = 200;
    this.color = "black";

    this.position = {
      x: posX,
      y: this.canvas.height - this.height,
    };
    this.rightEdge = this.position.x + this.width;

    this.middlePoint = {
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
  minGab: 40, // Minimum gap between platforms
  maxGab: 120, // Maximum gap between platforms
};

export const platforms = [];
let startPosX = 200; // Starting X position
const canvas = document.getElementById("gameCanvas");
platforms.push(new Platform(startPosX, canvas));

function addPlatform() {
  const lastPlatform = platforms[platforms.length - 1];
  const newPosX =
    lastPlatform.rightEdge +
    config.minGab +
    Math.random() * (config.maxGab - config.minGab);

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
