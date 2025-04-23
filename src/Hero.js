import platform from "./platform.js";
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
const speed = 3;
let isMoving = false;

/* if (totalFrames % 10 === 0) {
    currentFrame = currentFrame < 5 ? currentFrame + 1 : 0;
  } */

export function moving() {
  isMoving = true;
}

export function stop() {
  let Platform = platforms[platforms.length - 1];
  if (x >= Platform.rightEdge - 53 && isMoving) {
    isMoving = false;
    console.log(`is moving`, isMoving);

    currentFrame = 0;
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
    } else {
      !isMoving;
    }

    totalFrames++;
    x += speed;
  }
}
