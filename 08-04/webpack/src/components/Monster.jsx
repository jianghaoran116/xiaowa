import Body from './Body';

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

export default function Monster(context, allSpriteImg, imgPos = defaultImgPos, rect = defaultRect) {
  Body.call(this, context, allSpriteImg, imgPos, rect);
}

Monster.prototype = Object.create(Body.prototype);

Monster.prototype.getRect = function getRect() {
  return this.rect;
};
