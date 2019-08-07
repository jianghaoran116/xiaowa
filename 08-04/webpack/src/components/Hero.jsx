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
  this.speak = '';
  this.attack = function attack(monster) {
    this.speak = '你必须靠近魔王';
    if (monster) {
      const monsterRect = monster.getRect();
      // 判断英雄是否在魔王的范围内， 通过判断英雄的位置是否都在魔王范围内，位置和范围都通过绘制的四个点的位置来确认
      if (this.rect.x >= monsterRect.x - this.rect.width && this.rect.y >= monsterRect.y - this.rect.height) { // 左上角
        if (this.rect.x >= monsterRect.x - this.rect.width && this.rect.y <= monsterRect.y + monsterRect.height) { // 左下角
          if (this.rect.x <= monsterRect.x + monsterRect.width && this.rect.y <= monsterRect.y + monsterRect.height) { // 右下角
            if (this.rect.x <= monsterRect.x + monsterRect.width && this.rect.y >= monsterRect.y - this.rect.height) { // 右上角
              this.speak = '干掉魔王';
              monster.die();
              return true;
            }
          }
        }
      }
    } else {
      this.speak = 'NO 魔王';
    }
    return undefined;
  };
  this.move = function move(dir, monster, canvasScope) {
    const monsterRect = monster && monster.getRect();
    // 先通过dir确认方向, 然后判断是否有魔王, 然后确认是否能继续往该移动
    switch (dir) {
      case 'down':
        if (this.rect.y + this.rect.height < canvasScope.height) {
          if (monster) {
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
          } else {
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
          if (monster) {
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
          } else {
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
          if (monster) {
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
          } else {
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
          if (monster) {
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
          } else {
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
}

Hero.prototype = Object.create(Body.prototype);

Hero.prototype.say = function say() {
  document.getElementById('hero-speak').innerText = this.speak;
  return this.speak;
};
