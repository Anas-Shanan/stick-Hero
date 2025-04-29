import { addPlatform, platforms } from "./platform.js";
import { canvas, sticks, ctx, scoreElement } from "./main.js";
import { play } from "./reset.js";

import { animateDoubleScore } from "./stick.js";

// Constants
const spriteSheet = new Image();
spriteSheet.src = "../assets/imgs/spritesheet6.png";

// Hero State
export let heroX = 200;

let yCanvas = 525;
let totalFrames = 0;
let currentFrame = 0;

const frameWidth = 64;
const frameHeight = 64;
const walkSpeed = 6;
const fallSpeed = 15;

export let isWalking = false;
let isFalling = false;
let targetX = null;
let targetPlatformIndex = 1;
let hasLandedSafely = false;
let score = 0;
let doubleScore = false;

// ====== Internal Functions

function updateScore() {
  if (doubleScore) {
    score += 2;
    let herox = heroX;
    let y = yCanvas;
    animateDoubleScore(herox, y);
  } else {
    score += 1;
  }
  doubleScore = false;

  scoreElement.textContent = score;
  scoreElement.classList.remove("score-animated");
  void scoreElement.offsetWidth; // Force reflow
  scoreElement.classList.add("score-animated");
}

/* function resetScore() {
  score = 0;
  if (scoreElement) {
    scoreElement.textContent = score;
  }
} */

function fall() {
  yCanvas += fallSpeed;
  if (yCanvas >= canvas.height) {
    sticks.length = 0;
    play(ctx); // Restart the game after falling
  }
}

function drawHero(ctx) {
  ctx.drawImage(
    spriteSheet,
    currentFrame * frameWidth,
    0,
    frameWidth,
    frameHeight,
    heroX,
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
  heroX += walkSpeed;

  if (heroX >= targetX) {
    heroX = targetX;
    isWalking = false;
    currentFrame = 0;
    targetX = null;

    if (!hasLandedSafely) {
      checkLanding();
    } else {
      hasLandedSafely = false; // jus a reset
    }
  }
}

function startWalking(destinationX) {
  targetX = destinationX;
  isWalking = true;
  isFalling = false;
}

function checkLanding() {
  const nextPlatform = platforms[targetPlatformIndex];
  if (!nextPlatform) return;

  const heroRightEdge = heroX + frameWidth;
  const hero25point = heroX + frameWidth / 4;

  if (
    hero25point >= nextPlatform.position.x &&
    heroRightEdge <= nextPlatform.rightEdge
  ) {
    // here he Landed safely
    updateScore();
    targetPlatformIndex++;
    addPlatform();
    isFalling = false;
    hasLandedSafely = true;

    // After safe landing continue walking until right edge
    targetX = nextPlatform.rightEdge - frameWidth;
    isWalking = true;
  } else {
    // Missed landing
    isFalling = true;
  }
}

// ====== Exported Functions

export function destination(sticks) {
  const lastStick = sticks[sticks.length - 1];
  const currentPlatform = platforms[targetPlatformIndex - 1];
  const nextPlatform = platforms[targetPlatformIndex];

  if (!lastStick || !currentPlatform || !nextPlatform) return;

  lastStick.collision = true;

  const stickEndX = currentPlatform.rightEdge + lastStick.height;

  //// double score check in ////
  doubleScore = false;
  if (
    nextPlatform.middlePoint &&
    stickEndX >= nextPlatform.middlePoint.x &&
    stickEndX <= nextPlatform.middlePoint.x + nextPlatform.middlePoint.width
  ) {
    doubleScore = true;
  }

  //////////////////////////////////////

  if (
    stickEndX >= nextPlatform.position.x &&
    stickEndX <= nextPlatform.rightEdge
  ) {
    // Correct landing
    startWalking(nextPlatform.rightEdge - frameWidth);
  } else {
    // Missed
    startWalking(stickEndX);
  }

  lastStick.resetCollision();
}

export function animateHero(ctx) {
  drawHero(ctx);

  if (isWalking) {
    updateWalking();
  }

  if (isFalling) {
    fall();
  }
}

export function initHero() {
  heroX = 200;
  yCanvas = 525;
  currentFrame = 0;
  totalFrames = 0;
  hasLandedSafely = false;
  isWalking = false;
  isFalling = false;
  targetPlatformIndex = 1;
  score = 0;
  if (scoreElement) {
    scoreElement.textContent = score;
  }
}
