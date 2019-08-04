import heropng from '../images/hero.png';
import alljpg from '../images/all.jpg';

export default function prepare() {
  const imgTask = (img, src) => new Promise((resolve, reject) => {
    const image = img;
    image.onload = resolve;
    image.onerror = reject;
    image.src = src;
  });

  const context = document.getElementById('content').getContext('2d');
  const heroImg = new Image();
  const allSpriteImg = new Image();

  const allresourceTask = Promise.all([
    imgTask(heroImg, heropng),
    imgTask(allSpriteImg, alljpg),
  ]);

  return {
    /**
     * @param {Function} [callback] - 当准备好了之后要调用的回掉函数
     */
    getResource(callback) {
      allresourceTask.then(() => {
        if (callback) callback(context, heroImg, allSpriteImg);
      });
    },
  };
}
