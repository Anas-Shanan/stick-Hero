import { platforms } from "./platform.js";
import { animateHero, stop } from "./Hero.js";
import Stick from "./stick.js";
import { resetGame } from "./reset.js";

const container = document.querySelector(".container");
const bgCanvas = document.getElementById("bgCanvas");
export const canvas = document.getElementById("gameCanvas");
const resetBtn = document.getElementById("resetGame");
const bgCtx = bgCanvas.getContext("2d");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// dont forget... drawBackground at the top to be accessible always man..
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

// Initialize canvases
export function initCanvases() {
  bgCanvas.width = canvas.width = container.offsetWidth;
  bgCanvas.height = canvas.height = container.offsetHeight;
  drawBackground();
}
export const sticks = [];
async function main() {
  ///////////////////////////////////////////////////////////////
  const firstStick = new Stick(platforms[platforms.length - 1]);

  window.addEventListener("mousedown", (event) => {
    sticks.push(new Stick(platforms[platforms.length - 2]));
    let lastStick = sticks[sticks.length - 1];
    lastStick.isPressing = true;
  });

  window.addEventListener("mouseup", (event) => {
    let lastStick = sticks[sticks.length - 1];
    lastStick.isPressing = false;
    stop(sticks);
  });

  resetBtn.addEventListener("click", () => {
    resetGame(canvas);
  });

  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  function draw() {
    // Clear only game canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw platforms
    platforms.forEach((platform) => platform.drawPlatform(ctx));

    sticks.forEach((stick) => {
      if (stick.isPressing) {
        stick.increaseHeight(ctx);
      }
      stick.drawStick(ctx);
      stick.rotateStick(ctx);
    });

    animateHero(ctx);
  }

  // Initialize and draw background
  initCanvases();
  ///////////////////////////////////////////////////////////////

  function gameloop() {
    draw();

    requestAnimationFrame(gameloop);
  }
  gameloop();
}

main();
