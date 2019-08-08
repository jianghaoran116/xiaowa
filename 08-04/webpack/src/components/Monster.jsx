import Body from './Body';
import inherit from '../helper/inherit';

const defaultImgPos = {
  x: 858,
  y: 529,
  width: 32,
  height: 32,
};

const defaultRect = {
  x: 100,
  y: 100,
  width: 40,
  height: 40,
};

function Monster(context, allSpriteImg, imgPos = defaultImgPos, rect = defaultRect) {
  Body.call(this, context, allSpriteImg, imgPos, rect);
  this.die = function die() {
    this.context
      .clearRect(
        this.rect.x,
        this.rect.y,
        this.rect.width,
        this.rect.height,
      );
  };
}

inherit(Monster, Body);

Monster.prototype.getRect = function getRect() {
  return this.rect;
};

export default Monster;
