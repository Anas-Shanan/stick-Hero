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
    ctx.fillRect(120, 858, 20, 20);
    // draw first platform
    ctx.fillRect(100, canvas.height - 200, 50, 220);
  }
  /*  // Add platforms on key press
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      addPlatform();
    }
  }); */
  const sticks = [];
  window.addEventListener("mousedown", (event) => {
    console.log("last platform", platforms[platforms.length - 1]);
    sticks.push(new Stick(platforms[platforms.length - 1]));
    console.log("sticks array", sticks);
    let lastStick = sticks[sticks.length - 1];
    lastStick.isPressing = true;
    lastStick.increaseHeight(ctx);
    console.log(`click`, event);
  });
  window.addEventListener("mouseup", (event) => {
    let lastStick = sticks[sticks.length - 1];
    lastStick.isPressing = false;
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(ctx, canvas);

    platforms.forEach((platform) => platform.drawPlatform(ctx));
    sticks.forEach((stick) => stick.increaseHeight(ctx));

    ////////////////////////// test ////////////

    /*     ctx.beginPath();
    for (let y = 100; y < 1000; y += 10) {
      ctx.moveTo(600, y);
      ctx.lineTo(90, y);
    }
    ctx.stroke();
    ctx.fillStyle = " green";
    ctx.beginPath();
    ctx.moveTo(100, 290);
    // control=(60,10) goal=(90,90)
    ctx.quadraticCurveTo(460, 100, 90, 90);
    ctx.lineTo(360, 50);
    ctx.closePath();
    ctx.stroke(); */

    ///////////////////////////////////////////////////
    heroDraw();
  }

  function gameloop() {
    draw();

    requestAnimationFrame(gameloop);
  }
  gameloop();
}

main();
