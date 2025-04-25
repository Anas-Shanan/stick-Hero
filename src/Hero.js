import { addPlatform, platforms } from "./platform.js";

const spriteSheet = new Image();
spriteSheet.src = "../assets/imgs/spritesheet6.png";

const frameWidth = 64;
const frameHeight = 64;
let totalFrames = 0;
let currentFrame = 0;
let x = platforms.length === 2 ? 200 : animateHero();
let y = 0;
let yCanvas = 525;
const speed = 4;
let isMoving = false;
const fallSpeed = 15;

let targetPlatformIndex = 1;

export function moving(targetDistance) {
  if (isMoving) {
    if (x + 60 >= targetDistance) {
      isMoving = false;
      currentFrame = 0;
    }
  }
}

function fall(targetDistance) {
  if (x >= targetDistance) {
    currentFrame = 0;
    isMoving = false;
    yCanvas += fallSpeed;
  }
}

export function stop(sticks) {
  if (sticks.length === 0) return;

  const currentPlatform = platforms[targetPlatformIndex - 1];
  const nextPlatform = platforms[targetPlatformIndex];
  const lastStick = sticks[sticks.length - 1];

  if (!lastStick) return;

  const stickEndX = currentPlatform.rightEdge + lastStick.height;

  lastStick.collision = true;

  if (lastStick.collision) {
    if (
      stickEndX >= nextPlatform.position.x &&
      stickEndX <= nextPlatform.rightEdge
    ) {
      isMoving = true;
      moving(nextPlatform.rightEdge);
    } else {
      isMoving = true;
      moving(stickEndX + 60);
      fall(stickEndX);
      lastStick.resetCollision();
    }
  }
}

export function animateHero(ctx) {
  ctx.drawImage(
    spriteSheet,
    currentFrame * frameWidth,
    y,
    frameWidth,
    frameHeight,
    x,
    yCanvas,
    frameWidth,
    frameHeight
  );

  if (isMoving) {
    if (totalFrames % 4 === 0) {
      currentFrame = (currentFrame + 1) % 6;
    }

    totalFrames++;
    x += speed;

    // 🆕 Dynamic arrival check, moved from `stop()`
    const nextPlatform = platforms[targetPlatformIndex];
    if (x + 60 >= nextPlatform.rightEdge) {
      console.log(`x after`, x);
      console.log(`wasal`);
      isMoving = false;
      console.log("Hero reached platform", targetPlatformIndex);
      console.log(`moving`, isMoving);
      targetPlatformIndex++;
      addPlatform();
    }

    return x;
  }
}
