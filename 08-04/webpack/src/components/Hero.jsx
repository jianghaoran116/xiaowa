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
