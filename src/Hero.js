import { addPlatform, platforms } from "./platform.js";
import { canvas, sticks, ctx, scoreElement } from "./main.js";
import { play } from "./reset.js";

import { animateDoubleScore } from "./stick.js";

// Constants
const spriteSheet = new Image();
spriteSheet.src = "../assets/spritesheet/Hero-spritesheet8-55*55.png";

// Hero State
export let heroX = 200;

let yCanvas = 706;
let totalFrames = 0;
let currentFrame = 0;

const frameWidth = 55;
const frameHeight = 55;
const walkSpeed = 6;
const fallSpeed = 10;

export let isWalking = false;
let isFalling = false;
let targetX = null;
let targetPlatformIndex = 1;
let hasLandedSafely = false;
export let score = 0;
let doubleScore = false;

// ====== Internal Functions

export const scoreSound = new Audio("../assets/sound/score.mp3");
export const fallSound = new Audio("../assets/sound/dead.wav");

function updateScore() {
  console.log(`hero`, heroX);
  if (doubleScore) {
    score += 2;
    scoreSound.play();

    animateDoubleScore(heroX);
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
let fallSoundPlayed = false;
function fall() {
  yCanvas += fallSpeed;

  if (!fallSoundPlayed) {
    fallSound.play();
    fallSoundPlayed = true;
  }

  if (yCanvas >= canvas.height) {
    sticks.length = 0;
    fallSound.pause();
    fallSound.currentTime = 0;
    fallSoundPlayed = false;
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
  if (totalFrames % 4 === 0) {
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
  setTimeout(() => {
    isWalking = true;
    isFalling = false;
  }, 500);
}

function checkLanding() {
  const nextPlatform = platforms[targetPlatformIndex];
  if (!nextPlatform) return;

  const heroRightEdge = heroX + frameWidth;
  /*  const hero25point = heroX + frameWidth / 4; */

  if (
    heroX >= nextPlatform.position.x &&
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
  console.log(`stickEndx`, stickEndX);
  //// double score check in ////
  doubleScore = false;
  if (
    nextPlatform.middlePoint &&
    stickEndX >= nextPlatform.middlePoint.x &&
    stickEndX <= nextPlatform.middlePoint.x + nextPlatform.middlePoint.width + 3
  ) {
    console.log(`middlepoint.x`, nextPlatform.middlePoint.x);

    doubleScore = true;
  }

  //////////////////////////////////////

  if (
    stickEndX >= nextPlatform.position.x &&
    stickEndX <= nextPlatform.rightEdge + 2
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
  yCanvas = 706;
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
