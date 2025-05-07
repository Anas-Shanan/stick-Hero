import { sticks, camera } from "./main.js";

const stickConfig = {
  width: 4,
  growSpeed: 10,
  color: "black",
  rotationSpeed: 1,
};

const stickGrow = new Audio("../assets/sound/stick_grow_loop.wav");
const stickCollision = new Audio("../assets/sound/stickCollision.wav");

export default class Stick {
  constructor(platform) {
    this.platform = platform;
    this.height = 0;
    this.position = {
      x: platform.position.x + platform.width - stickConfig.width,
      y: platform.position.y,
    };

    this.isPressing = false;
    this.collision = false;

    this.isRotating = false;
    this.currentRotation = 0;
    this.targetRotation = Math.PI / 2;
    this.rotationSpeed = 0.01;
  }
  //////////////////////// functions //////////////////////////////////////

  resetCollision() {
    this.collision = false;
  }
  /*  stickGrowSound() {
    stickGrow.loop = true;
    stickGrow.currentTime = 2;
    stickGrow.playbackRate = 1;
    stickGrow.play();
  } */

  drawStick(ctx) {
    ctx.fillStyle = stickConfig.color;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      stickConfig.width,
      this.height
    );
  }

  rotateStick(ctx) {
    if (!this.isPressing && !this.isRotating) {
      this.isRotating = true;

      stickGrow.loop = false;
      stickGrow.pause();
    }
    if (this.isRotating) {
      ctx.clearRect(
        this.position.x - 2,
        this.position.y,
        stickConfig.width + 4,
        this.height
      );
      if (this.currentRotation < this.targetRotation) {
        this.rotationSpeed += 0.002;
        this.currentRotation += this.rotationSpeed;
        if (this.currentRotation >= this.targetRotation) {
          this.currentRotation = this.targetRotation;
          this.collision = true;
          stickCollision.play();
        }
      }
      ctx.save();

      ctx.translate(
        this.position.x,
        this.position.y + this.height - stickConfig.width
      );
      ctx.rotate(this.currentRotation);
      ctx.fillStyle = stickConfig.color;
      ctx.fillRect(0, -this.height, stickConfig.width, this.height);
      ctx.restore();
    }

    return this.collision;
  }

  increaseHeight(ctx) {
    if (this.isPressing) {
      this.height += 1 * stickConfig.growSpeed;
      this.position.y -= 1 * stickConfig.growSpeed;
      this.drawStick(ctx);
      /* this.stickGrowSound(); */
    }
  }
}
export function clearSticks() {
  sticks.length = 0;
}

export function animateDoubleScore(heroX) {
  const doubleScoreText = document.createElement("div");
  doubleScoreText.textContent = "PERFECT! +2";
  doubleScoreText.style.position = "absolute";
  const screenX = heroX - camera.x;
  const screenY = 550;
  console.log(`heroX: ${heroX}, Camera X: ${camera.x}, Screen X: ${screenX}`);

  doubleScoreText.style.left = `${screenX}px`;

  doubleScoreText.style.top = `${screenY}px`;
  doubleScoreText.style.color = "gold";
  doubleScoreText.style.fontFamily = "Helvetica";
  doubleScoreText.style.fontWeight = "bold";
  doubleScoreText.style.fontSize = "16px";
  doubleScoreText.style.textShadow = "2px 2px 4px rgba(0,0,0,0.5)";
  doubleScoreText.style.animation = "fadeUp 3s forwards";

  document.body.appendChild(doubleScoreText);
  setTimeout(() => {
    document.body.removeChild(doubleScoreText);
  }, 3000);
}
