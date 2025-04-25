import { platforms, addPlatform } from "./platform.js";

import Stick from "./stick.js";
import { animateHero, stop, moving } from "./Hero.js";

const container = document.querySelector(".container");
const bgCanvas = document.getElementById("bgCanvas");
const canvas = document.getElementById("gameCanvas");
const bgCtx = bgCanvas.getContext("2d");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
console.log(ctx);
// drawBackground at the top to be accessible always
function drawBackground() {
  let gradient = bgCtx.createLinearGradient(0, 0, 0, bgCanvas.height);
  gradient.addColorStop(0, "#87ceeb");
  gradient.addColorStop(1, "#ffffff");

  bgCtx.fillStyle = gradient;
  bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
}

// scaling
const resizeObserver = new ResizeObserver(() => {
  const scale = Math.min(
    container.parentElement.offsetWidth / container.offsetWidth,
    container.parentElement.offsetHeight / container.offsetHeight
  );
  document.documentElement.style.setProperty("--scale", scale);
});
resizeObserver.observe(container.parentElement);

async function main() {
  // Initialize canvases
  function initCanvases() {
    bgCanvas.width = canvas.width = container.offsetWidth;
    bgCanvas.height = canvas.height = container.offsetHeight;
    drawBackground();
  }

  const sticks = [];
  const firstStick = new Stick(platforms[platforms.length - 1]);

  window.addEventListener("mousedown", (event) => {
    sticks.push(new Stick(platforms[platforms.length - 2]));
    let lastStick = sticks[sticks.length - 1];
    lastStick.isPressing = true;
  });

  window.addEventListener("mouseup", (event) => {
    let lastStick = sticks[sticks.length - 1];
    lastStick.isPressing = false;
    console.log(`stop`);
    stop(sticks);

    /* addPlatform(); */
  });

  ////////////////////// hero /////////////7

  /* const spriteSheet = new Image();
  spriteSheet.src = "../assets/imgs/spritesheet6.png";
  spriteSheet.onload = () => {
    console.log("Image loaded");
    gameloop();
  };
 */

  ///////////////////////////////////////////////////////////////
  function draw() {
    // Clear only game canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw platforms
    platforms.forEach((platform) => platform.drawPlatform(ctx));

    // stop Hero

    // Draw sticks
    sticks.forEach((stick) => {
      if (stick.isPressing) {
        stick.increaseHeight(ctx);
      }
      stick.drawStick(ctx);
      stick.rotateStick(ctx);
    });
    moving();

    animateHero(ctx);
  }

  // Initialize and draw background immediately
  initCanvases();

  function gameloop() {
    draw();

    requestAnimationFrame(gameloop);
  }
  gameloop();
}

main();
