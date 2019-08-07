import Monster from '../components/Monster';
import Hero from '../components/Hero';

export default function drawHero(context, heroImg, allSpriteImg) {
  const monster = new Monster(context, allSpriteImg);
  monster.draw();

  const hero = new Hero(context, heroImg);
  hero.draw();

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
