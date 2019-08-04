
export default function drawHero(context, heroImg, allSpriteImg) {
  const draw = (obj) => {
    obj.context
      .drawImage(
        obj.img,
        obj.imgPos.x,
        obj.imgPos.y,
        obj.imgPos.width,
        obj.imgPos.height,
        obj.rect.x,
        obj.rect.y,
        obj.rect.width,
        obj.rect.height,
      );
  };

  const hero = {
    img: heroImg,
    context,
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
  };

  const monster = {
    img: allSpriteImg,
    context,
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
  };

  draw(hero);
  draw(monster);
}
