
export default function drawHero(context, heroImg, allSpriteImg) {
  function draw() {
    this.context
      .drawImage(
        this.img,
        this.imgPos.x,
        this.imgPos.y,
        this.imgPos.width,
        this.imgPos.height,
        this.rect.x,
        this.rect.y,
        this.rect.width,
        this.rect.height,
      );
  }

  function move(dir, monsterRect, canvasScope) {
    const self = this;
    /**
     * a d
     * b c
     */
    function outMonsterRange() { // 接触到怪物时返回false
      const heroRange = {};
      const monsterRange = {};

      heroRange.a = {
        x: self.rect.x,
        y: self.rect.y,
      };
      heroRange.b = {
        x: self.rect.x,
        y: self.rect.y + self.rect.height,
      };
      heroRange.c = {
        x: self.rect.x + self.rect.width,
        y: self.rect.y + self.rect.height,
      };
      heroRange.d = {
        x: self.rect.x + self.rect.width,
        y: self.rect.y,
      };

      monsterRange.a = {
        x: monsterRect.x - self.rect.width,
        y: monsterRect.y - self.rect.height,
      };
      monsterRange.b = {
        x: monsterRect.x - self.rect.width,
        y: monsterRect.y + monsterRect.height + self.rect.height,
      };
      monsterRange.c = {
        x: monsterRect.x + monsterRect.width + self.rect.width,
        y: monsterRect.y + monsterRect.height + self.rect.height,
      };
      monsterRange.d = {
        x: monsterRect.x + monsterRect.width + self.rect.width,
        y: monsterRect.y - self.rect.height,
      };

      if (monsterRange.a.x - heroRange.a.x <= 0 && monsterRange.a.y - heroRange.a.y <= 0) {
        if (monsterRange.b.x - heroRange.b.x <= 0 && monsterRange.b.y - heroRange.b.y >= 0) {
          if (monsterRange.c.x - heroRange.c.x >= 0 && monsterRange.c.y - heroRange.c.y >= 0) {
            if (monsterRange.d.x - heroRange.d.x >= 0 && monsterRange.d.y - heroRange.d.y <= 0) {
              return {
                heroRange: heroRange,
                monsterRange: monsterRange,
                res: false,
              };
            }
          }
        }
      }
      return {
        heroRange: heroRange,
        monsterRange: monsterRange,
        res: true,
      };
    }

    const resObj = outMonsterRange();

    switch (dir) {
      case 'down':
        if (!resObj.res) {
          this.context
            .clearRect(
              this.rect.x,
              this.rect.y,
              this.rect.width,
              this.rect.height,
            );
          this.rect.y += 10;
          // if (resObj.heroRange.b.y === resObj.monsterRange.b.y) {
          //   this.rect.y += 10;
          // }
        }
        if (this.rect.y + this.rect.height < canvasScope.height && resObj.res) {
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
              this.rect.y += 10,
              this.rect.width,
              this.rect.height,
            );
        }
        break;
      case 'up':
        // if (!outMonsterRange()) {
        //   this.context
        //     .clearRect(
        //       this.rect.x,
        //       this.rect.y,
        //       this.rect.width,
        //       this.rect.height,
        //     );
        //   this.rect.y -= 10;
        // }
        if (this.rect.y > 0 && outMonsterRange().res) { // 画布上边界
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
              this.rect.y -= 10,
              this.rect.width,
              this.rect.height,
            );
        }
        break;
      case 'left':
        // if (!outMonsterRange()) {
        //   this.context
        //     .clearRect(
        //       this.rect.x,
        //       this.rect.y,
        //       this.rect.width,
        //       this.rect.height,
        //     );
        //   this.rect.x -= 10;
        // }
        if (this.rect.x > 0 && outMonsterRange().res) { // 画布左边界
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
              this.rect.x -= 10,
              this.rect.y,
              this.rect.width,
              this.rect.height,
            );
        }
        break;
      case 'right':
        // if (!outMonsterRange()) {
        //   this.context
        //     .clearRect(
        //       this.rect.x,
        //       this.rect.y,
        //       this.rect.width,
        //       this.rect.height,
        //     );
        //   this.rect.x += 10;
        // }
        if (this.rect.x + this.rect.width < canvasScope.width && outMonsterRange().res) { // 画布右边界
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
              this.rect.x += 10,
              this.rect.y,
              this.rect.width,
              this.rect.height,
            );
        }
        break;
      default:
        break;
    }
  }

  function getRect() {
    return this.rect;
  }

  const hero = {
    img: heroImg,
    context: context,
    imgPos: {
      x: 0,
      y: 0,
      width: 32,
      height: 32,
    },
    rect: {
      x: 0,
      y: 0,
      width: 40,
      height: 40,
    },
    draw: draw,
    move: move,
  };

  const monster = {
    img: allSpriteImg,
    context: context,
    imgPos: {
      x: 858,
      y: 529,
      width: 32,
      height: 32,
    },
    rect: {
      x: 100,
      y: 100,
      width: 40,
      height: 40,
    },
    draw: draw,
    getRect: getRect,
  };

  hero.draw();
  monster.draw();

  document.addEventListener('keydown', (e) => {
    if (e) {
      if (e.keyCode === 37) { // 左
        hero.move('left', monster.getRect(), { width: 500, height: 300 }); // 方向键 怪物区域 画布区域
      }
      if (e.keyCode === 38) { // 上
        hero.move('up', monster.getRect(), { width: 500, height: 300 });
      }
      if (e.keyCode === 40) { // 下
        hero.move('down', monster.getRect(), { width: 500, height: 300 });
      }
      if (e.keyCode === 39) { // 右
        hero.move('right', monster.getRect(), { width: 500, height: 300 });
      }
    }
  });
}
