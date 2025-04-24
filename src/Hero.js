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
let x = 200;
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
export function stop(sticks) {
  if (sticks.length === 0) {
    console.error("No sticks available to check height.");
    return; // Exit the function if no sticks are present
  }

  const currentPlatform = platforms[platforms.length - 2];
  /* const nextPlatform = platforms[platforms.length - 1]; */
  const lastStick = sticks[sticks.length - 1];
  if (!lastStick) {
    console.error("Last stick is undefined.");
    return; // Exit the function if the last stick is undefined
  }

  const stickEndX = currentPlatform.rightEdge + lastStick.height;

  if (lastStick.collision) {
    /* console.log(`Stick End X: ${stickEndX}`);
    console.log(
      `Next Platform Right Edge: ${
        nextPlatform.position.x + nextPlatform.width
      }`
      
    ); */ /* console.log(`Hero X: ${x}`);
    console.log(`Stick End X: ${stickEndX}`); */
    const nextPlatform = platforms[platforms.length - 1];
    if (
      stickEndX >= nextPlatform.position.x &&
      stickEndX <= nextPlatform.position.x + nextPlatform.width
    ) {
      isMoving = true;
      let targetDistance = nextPlatform.rightEdge;
      moving(targetDistance);
    } else if (stickEndX <= nextPlatform.position.x) {
      let targetDistance = stickEndX + 60;
      isMoving = true;
      fall(stickEndX);

      lastStick.resetCollision();
      console.log(`collision`, lastStick.collision);
    } else if (stickEndX >= nextPlatform.rightEdge) {
      let targetDistance = stickEndX + 60;
      isMoving = true;
      fall(stickEndX);
      console.log(`Hero is moving beyond the next platform.`);
      lastStick.resetCollision();
    }
  } /* else {
    isMoving = false;
    console.log("Collision is false. Hero cannot move further.");
  } */
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
  }
}
