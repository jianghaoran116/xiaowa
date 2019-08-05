
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
  };

  hero.draw();
  monster.draw();
}
