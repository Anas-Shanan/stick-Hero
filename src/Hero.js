import { addPlatform, platforms } from "./platform.js";
import { canvas, sticks } from "./main.js";
import { resetGame } from "./reset.js";
// Constants

const spriteSheet = new Image();
spriteSheet.src = "../assets/imgs/spritesheet6.png";

const frameWidth = 64;
const frameHeight = 64;
const walkSpeed = 4;
const fallSpeed = 15;

///// for Hero State
let totalFrames = 0;
let currentFrame = 0;
let x = 200;
let y = 0;
let yCanvas = 525;
let isWalking = false;
let isFalling = false;
let targetX = null;
let targetPlatformIndex = 1;
let hasLandedSafely = false;

////////////  Functions
function fall(canvas) {
  yCanvas += fallSpeed;
  if (yCanvas >= canvas.height) {
    sticks.length = 0;
    resetGame();
  }
}

function drawHero(ctx) {
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
}

function updateWalking() {
  if (totalFrames % 6 === 0) {
    currentFrame = (currentFrame + 1) % 6;
  }

  totalFrames++;
  x += walkSpeed;

  if (x + frameWidth / 4 >= targetX) {
    isWalking = false;
    currentFrame = 0;
    targetX = null;
    if (!hasLandedSafely) {
      checkLanding();
    } else {
      hasLandedSafely = false; // Reset
    }
  }
}
function startWalking(stickEndX) {
  targetX = stickEndX;
  isWalking = true;
  isFalling = false;
}

function checkLanding() {
  const nextPlatform = platforms[targetPlatformIndex];
  const heroRightEdge = x + frameWidth / 4;

  if (
    x + frameWidth / 4 >= nextPlatform.position.x &&
    heroRightEdge <= nextPlatform.rightEdge
  ) {
    // Landed correctly

    targetPlatformIndex++;
    addPlatform();
    isFalling = false;
    hasLandedSafely = true;
    //// let the hero walk to the right edge //////
    targetX = nextPlatform.rightEdge - frameWidth;
    isWalking = true;
  } else {
    // Missed
    isFalling = true;
  }
}

// ====== Exported Functions ======
export function stop(sticks) {
  if (sticks.length === 0) return;

  const lastStick = sticks[sticks.length - 1];
  const currentPlatform = platforms[targetPlatformIndex - 1];
  const nextPlatform = platforms[targetPlatformIndex];

  if (!lastStick || !currentPlatform || !nextPlatform) return;

  const stickEndX = currentPlatform.rightEdge + lastStick.height;

  lastStick.collision = true;

  startWalking(stickEndX);
  lastStick.resetCollision();
}

export function animateHero(ctx) {
  drawHero(ctx);

  if (isWalking) {
    updateWalking();
  }

  if (isFalling) {
    fall(canvas);
  }
}

export function initHero() {
  x = 200;
  yCanvas = 525;
  currentFrame = 0;
  totalFrames = 0;
  hasLandedSafely = false;
  isWalking = false;
  isFalling = false;
  targetPlatformIndex = 1;
}
