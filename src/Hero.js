import { addPlatform, platforms } from "./platform.js";

const spriteSheet = new Image();
spriteSheet.src = "../assets/imgs/spritesheet6.png";

const frameWidth = 64; // width of one frame
const frameHeight = 64; // height of one frame
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


  if (sticks.length === 0) {
    /*  console.error("No sticks available to check height."); */
    return; // Exit the function if no sticks are present
  }

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

    currentFrame * frameWidth, // source x from the spritesheet : where to start the x position every frame
    y, // source y from the spritesheet :  y position every frame, here is 0 always top left, just one row

    frameWidth, /// source width in the spritesheet
    frameHeight, // source height in spritesheet

    x, /// position x on canvas
    yCanvas, /// position y in canvas, it the rowanimation number in case there are more rows

    frameWidth, // width on canvas
    frameHeight // height in canvas
  );

  if (isMoving) {
    if (totalFrames % 4 === 0) {
      // Adjust the frame delay as needed
      currentFrame = (currentFrame + 1) % 6; // Cycle through 6 frames (0 to 5)
    }

    totalFrames++;
    x += speed;


    const nextPlatform = platforms[targetPlatformIndex];
    if (x + 60 >= nextPlatform.rightEdge) {

      isMoving = false;

      targetPlatformIndex++;
      addPlatform();
    }

    return x;
  }
}
