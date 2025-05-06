import { platforms } from "./platform.js";
import { heroX, animateHero, destination, isWalking } from "./Hero.js";

import Stick from "./stick.js";
import { resetGame } from "./reset.js";

const container = document.querySelector(".container");
const bgCanvas = document.getElementById("bgCanvas");
export const canvas = document.getElementById("gameCanvas");
export const scoreElement = document.getElementById("score");
const holdElement = document.getElementById("hold");
const holdElement1 = document.getElementById("hold1");
const holdElement2 = document.getElementById("hold2");
const bgCtx = bgCanvas.getContext("2d");
export const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

export const camera = {
  x: 0,
  speed: 1,
  following: true, // camera is actively following the player
  margin: 700,
};

// dont forget... drawBackground at the top to be accessible always man..
/* function drawBackground() {
  let gradient = bgCtx.createLinearGradient(0, 0, 0, bgCanvas.height);
  gradient.addColorStop(0, "#3B9A9C");
  gradient.addColorStop(1, "#65C3C8");

  bgCtx.fillStyle = gradient;
  bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

  ctx.fillStyle = "white";
  ctx.font = "150px bold Helvetica";
  ctx.textAlign = "center";
} */

////////////////////////// animated background  //////////////7

const bgImage = new Image();

bgImage.src = "../assets/background/background.png";

const parallaxFactor = 0.8;
function gameUpdate() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

  const bgX = -(camera.x * parallaxFactor) % bgCanvas.width;

  bgCtx.drawImage(bgImage, Math.floor(bgX), 0, bgCanvas.width, bgCanvas.height);
  bgCtx.drawImage(
    bgImage,
    Math.floor(bgX + bgCanvas.width),
    0,
    bgCanvas.width,
    bgCanvas.height
  );

  requestAnimationFrame(gameUpdate);
}
gameUpdate();
//////////////////////////  /////////////////////////////7

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

  holdText();
}
export function holdText() {
  holdElement.classList.remove("hold-animated");
  void holdElement.offsetWidth;
  holdElement.classList.add("hold-animated");

  holdElement1.classList.remove("hold-animated");
  void holdElement1.offsetWidth;
  holdElement1.classList.add("hold-animated");
  holdElement2.classList.remove("hold-animated");
  void holdElement2.offsetWidth;
  holdElement2.classList.add("hold-animated");
}

export const sticks = [];
///////////////////////////////////////////////////////////////
async function main() {
  const firstStick = new Stick(platforms[platforms.length - 1]);
  window.addEventListener("mousedown", () => {
    if (platforms.length >= 2 && !isWalking) {
      sticks.push(new Stick(platforms[platforms.length - 2]));
      let lastStick = sticks[sticks.length - 1];
      lastStick.isPressing = true;
    }
  });

  window.addEventListener("mouseup", () => {
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
    const centerY = canvas.height / 2;
    const radius = 110;

    console.log(`x`, clickX);
    console.log(`y`, clickY);

    const distance = Math.sqrt(
      Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2)
    );

    if (distance <= radius && sticks.length === 0) {
      console.log("Play button clicked!");

      resetGame();
    }
  });
  ///////////////////////////////////////////////////////////////

  function updateCamera() {
    /// targetX is the target position of the hero
    const targetX = Math.max(0, heroX - (canvas.width - camera.margin));

    //  camera speed toward target position
    if (camera.following) {
      camera.x += (targetX - camera.x) * 0.05;
    }
  }

  ///////////////////////////////////////////////////////////////

  function draw() {
    // Clear only game canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /* drawBackground(); */

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
