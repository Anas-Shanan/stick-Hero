import platform from "./platform.js";
import { platforms } from "./platform.js";
import Stick from "./stick.js";

const container = document.querySelector(".container");
console.log(container);

new ResizeObserver(() => {
  document.documentElement.style.setProperty(
    "--scale",
    Math.min(
      container.parentElement.offsetWidth / container.offsetWidth,
      container.parentElement.offsetHeight / container.offsetHeight
    )
  );
}).observe(container.parentElement);
async function main() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  ctx.imageSmoothingEnabled = false;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  console.log(canvas);

  // background
  function drawBackground(ctx, canvas) {
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#87ceeb"); // Sky blue
    gradient.addColorStop(1, "#ffffff"); // White

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, canvas.height - 1, canvas.width, 1);
  }

  function heroDraw() {
    ctx.fillStyle = "black";
    ctx.fillRect(250, canvas.height - 530, 25, 25);
    // draw first platform
    /* ctx.fillRect(100, canvas.height - 500, 50, 500); */
  }
  /*  // Add platforms on key press
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      addPlatform();
    }
  }); */
  const sticks = [];

  const firstStick = new Stick(platforms[platforms.length - 1]);
  console.log("last platform", platforms[platforms.length - 1]);
  console.log(`first stick,`, firstStick);
  console.log("sticks array", sticks);

  window.addEventListener("mousedown", (event) => {
    sticks.push(new Stick(platforms[platforms.length - 2]));
    console.log("sticks array", sticks);
    let lastStick = sticks[sticks.length - 1];
    lastStick.isPressing = true;
    lastStick.increaseHeight(ctx);
    /* console.log(`click`, event); */
  });
  window.addEventListener("mouseup", (event) => {
    let lastStick = sticks[sticks.length - 1];
    lastStick.isPressing = false;
    lastStick.rotateStick(ctx);

    /* drawBackground(ctx, canvas); */
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(ctx, canvas);

    platforms.forEach((platform) => platform.drawPlatform(ctx));
    sticks.forEach((stick) => {
      stick.increaseHeight(ctx);
      stick.drawStick(ctx);
      stick.rotateStick(ctx);
    });

    heroDraw();
  }

  function gameloop() {
    draw();

    requestAnimationFrame(gameloop);
  }
  gameloop();
}

main();
