export default function Body(context, heroImg, imgPos, rect) {
  this.img = heroImg;
  this.context = context;
  this.imgPos = imgPos;
  this.rect = rect;
}

Body.prototype = {
  constructor: Body,
  draw() {
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
  },
};
