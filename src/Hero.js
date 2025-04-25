import platform, { addPlatform } from "./platform.js";
import { platforms } from "./platform.js";

const spriteSheet = new Image();
spriteSheet.src = "../assets/imgs/spritesheet6.png";
/*  spriteSheet.onload = () => {
    console.log("Image loaded");
    gameloop();
  }; */

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

/* if (totalFrames % 10 === 0) {
    currentFrame = currentFrame < 5 ? currentFrame + 1 : 0;
  } */

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
let targetPlatformIndex = 1;
export function stop(sticks) {
  if (sticks.length === 0) {
    /*  console.error("No sticks available to check height."); */
    return; // Exit the function if no sticks are present
  }
  const currentPlatform = platforms[targetPlatformIndex - 1];

  const nextPlatform = platforms[targetPlatformIndex];
  const lastStick = sticks[sticks.length - 1];
  if (!lastStick) {
    /* console.error("Last stick is undefined."); */
    return; // Exit the function if the last stick is undefined
  }

  const stickEndX = currentPlatform.rightEdge + lastStick.height;

  console.log(`stop 1 `, lastStick.collision);
  lastStick.collision = true;
  if (lastStick.collision) {
    if (
      stickEndX >= nextPlatform.position.x &&
      stickEndX <= nextPlatform.rightEdge
    ) {
      isMoving = true;

      moving(nextPlatform.rightEdge);
      console.log(`right`, nextPlatform.rightEdge);
      console.log(`x before`, x);
      if (x + 60 >= nextPlatform.rightEdge) {
        console.log(`x after`, x);
        console.log(`wasal`);
        isMoving = false;
        lastStick.collision = false;
        /*  lastStick.resetCollision(); */
        console.log(`reset collision`, lastStick.collision);

        console.log("Hero reached platform", targetPlatformIndex);
        console.log(`moving`, isMoving);

        targetPlatformIndex++;
        addPlatform();
      }
    } else if (
      stickEndX < nextPlatform.position.x ||
      stickEndX > nextPlatform.rightEdge
    ) {
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
    return x;
  }
}
