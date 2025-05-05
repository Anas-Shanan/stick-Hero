import { sticks, camera } from "./main.js";

const stickConfig = {
  width: 5,
  growSpeed: 7,
  color: "black",
  rotationSpeed: 1,
};

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
    this.rotationSpeed = 0.03;
  }
  //////////////////////// functions //////////////////////////////////////

  resetCollision() {
    this.collision = false;
  }

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
        }
      }
      ctx.save();

      ctx.translate(this.position.x, this.position.y + this.height);
      ctx.rotate(this.currentRotation);
      ctx.fillStyle = stickConfig.color;
      ctx.fillRect(0, -this.height, stickConfig.width, this.height);
      ctx.restore();
    } else if (!this.isPressing) {
      // Just do a normal non-animated rotation (your original code)
      ctx.save();
      ctx.translate(this.position.x, this.position.y);
      ctx.rotate(Math.PI / 2);
      ctx.fillStyle = stickConfig.color;
      ctx.fillRect(0, -this.height, stickConfig.width, this.height);
      ctx.restore();
      this.collision = true;
    }

    return this.collision;
  }

  increaseHeight(ctx) {
    if (this.isPressing) {
      this.height += 1 * stickConfig.growSpeed;
      this.position.y -= 1 * stickConfig.growSpeed;
      this.drawStick(ctx);
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
  console.log(`heroX: ${heroX}, Camera X: ${camera.x}, Screen X: ${screenX}`);

  doubleScoreText.style.left = `${screenX - 150}px`;

  doubleScoreText.style.top = `${450}px`;
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
/* export function anim(heroX) {
  const anim = document.createElement("div");
  anim.textContent = "Stick Hero";
  anim.style.position = "absolute";

  anim.style.left = `${500}px`;

  anim.style.top = `${120}px`;
  anim.style.color = "black";
  anim.style.fontFamily = "Helvetica";
  anim.style.fontWeight = "300";
  anim.style.fontSize = "100px";
  anim.style.textShadow = "2px 2px 10px rgba(136, 13, 13, 0.5)";
  anim.style.animation = "slideIn 5s forwards";
  console.log(anim.style);
  document.body.appendChild(anim);
  setTimeout(() => {
    document.body.removeChild(anim);
  }, 3000);
} */
