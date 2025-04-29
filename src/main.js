import { platforms } from "./platform.js";
import { heroX, animateHero, destination, isWalking } from "./Hero.js";

import Stick from "./stick.js";
import { resetGame } from "./reset.js";

const container = document.querySelector(".container");
const bgCanvas = document.getElementById("bgCanvas");
export const canvas = document.getElementById("gameCanvas");
export const scoreElement = document.getElementById("score");
const holdElement = document.getElementById("hold");
const bgCtx = bgCanvas.getContext("2d");
export const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

export const camera = {
  x: 0,
  speed: 2,
  following: true, // Whether camera is actively following the player
  margin: 700,
};

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
  holdText();
}
export function holdText() {
  holdElement.classList.remove("hold-animated");
  void holdElement.offsetWidth;
  holdElement.classList.add("hold-animated");
}

export const sticks = [];
async function main() {
  ///////////////////////////////////////////////////////////////
  const firstStick = new Stick(platforms[platforms.length - 1]);
  window.addEventListener("mousedown", (event) => {
    if (platforms.length >= 2 && !isWalking) {
      sticks.push(new Stick(platforms[platforms.length - 2]));
      let lastStick = sticks[sticks.length - 1];
      lastStick.isPressing = true;
    }
  });

  window.addEventListener("mouseup", (event) => {
    if (sticks.length > 0 && !isWalking) {
      let lastStick = sticks[sticks.length - 1];
      lastStick.isPressing = false;
      destination(sticks);
    }
  });
  canvas.addEventListener("click", (event) => {
    const scale =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--scale")
      ) || 1;
    const rect = canvas.getBoundingClientRect();
    const clickX = (event.clientX - rect.left) / scale;
    const clickY = (event.clientY - rect.top) / scale;

    //  click is within the play button circle
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 3;
    const radius = 110;

    console.log(`x`, clickX);
    console.log(`y`, clickY);

    const distance = Math.sqrt(
      Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2)
    );
    console.log(`distance`, distance);

    if (distance <= radius && sticks.length === 0) {
      console.log("Play button clicked!");

      resetGame();
    }
  });
  ///////////////////////////////////////////////////////////////

  function updateCamera() {
    /// targetX is the target position of the hero
    const targetX = Math.max(0, heroX - (canvas.width - camera.margin));

    // Smoothly move camera toward target position
    if (camera.following) {
      camera.x += (targetX - camera.x) * 0.05; // Smooth follow effect
    }
  }

  ///////////////////////////////////////////////////////////////
  function draw() {
    // Clear only game canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(-camera.x, 0);

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
    ctx.restore();

    // Update camera position
    updateCamera();
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
