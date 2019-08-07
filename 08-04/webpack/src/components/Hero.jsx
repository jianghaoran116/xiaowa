import Body from './Body';

const defaultImgPos = {
  x: 0,
  y: 0,
  width: 32,
  height: 32,
};

const defaultRect = {
  x: 0,
  y: 0,
  width: 40,
  height: 40,
};

export default function Hero(context, heroImg, imgPos = defaultImgPos, rect = defaultRect) {
  Body.call(this, context, heroImg, imgPos, rect);
}

Hero.prototype = Object.create(Body.prototype);

Hero.prototype.move = function move(dir, monsterRect, canvasScope) {
  switch (dir) {
    case 'down':
      if (this.rect.y + this.rect.height < canvasScope.height) {
        if (!(this.rect.x >= monsterRect.x - this.rect.width && this.rect.x <= monsterRect.x + monsterRect.width && this.rect.y >= monsterRect.y - this.rect.height && this.rect.y <= monsterRect.y)) {
          this.context
            .clearRect(
              this.rect.x,
              this.rect.y,
              this.rect.width,
              this.rect.height,
            );
          this.context
            .drawImage(
              this.img,
              this.imgPos.x,
              this.imgPos.y,
              this.imgPos.width,
              this.imgPos.height,
              this.rect.x,
              this.rect.y += 5,
              this.rect.width,
              this.rect.height,
            );
        }
      }
      break;
    case 'up':
      if (this.rect.y > 0) { // 画布上边界
        if (!(this.rect.x >= monsterRect.x - this.rect.width && this.rect.x <= monsterRect.x + monsterRect.width && this.rect.y >= monsterRect.y + monsterRect.height && this.rect.y <= monsterRect.y + monsterRect.height)) {
          this.context
            .clearRect(
              this.rect.x,
              this.rect.y,
              this.rect.width,
              this.rect.height,
            );
          this.context
            .drawImage(
              this.img,
              this.imgPos.x,
              this.imgPos.y,
              this.imgPos.width,
              this.imgPos.height,
              this.rect.x,
              this.rect.y -= 5,
              this.rect.width,
              this.rect.height,
            );
        }
      }
      break;
    case 'left':
      if (this.rect.x > 0) { // 画布左边界
        if (!(this.rect.x >= monsterRect.x + monsterRect.width && this.rect.x <= monsterRect.x + monsterRect.width && this.rect.y >= monsterRect.y - this.rect.height && this.rect.y <= monsterRect.y + monsterRect.height)) {
          this.context
            .clearRect(
              this.rect.x,
              this.rect.y,
              this.rect.width,
              this.rect.height,
            );
          this.context
            .drawImage(
              this.img,
              this.imgPos.x,
              this.imgPos.y,
              this.imgPos.width,
              this.imgPos.height,
              this.rect.x -= 5,
              this.rect.y,
              this.rect.width,
              this.rect.height,
            );
        }
      }
      break;
    case 'right':
      if (this.rect.x + this.rect.width < canvasScope.width) { // 画布右边界
        if (!(this.rect.x >= monsterRect.x - this.rect.width && this.rect.x <= monsterRect.x && this.rect.y >= monsterRect.y - this.rect.height && this.rect.y <= monsterRect.y + monsterRect.height)) {
          this.context
            .clearRect(
              this.rect.x,
              this.rect.y,
              this.rect.width,
              this.rect.height,
            );
          this.context
            .drawImage(
              this.img,
              this.imgPos.x,
              this.imgPos.y,
              this.imgPos.width,
              this.imgPos.height,
              this.rect.x += 5,
              this.rect.y,
              this.rect.width,
              this.rect.height,
            );
        }
      }
      break;
    default:
      break;
  }
};
