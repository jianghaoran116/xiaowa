import Monster from '../components/Monster';
import Hero from '../components/Hero';
// import ConstructCell from '../components/ConstructCell';

export default function drawHero(context, heroImg, allSpriteImg) {
  // const constructCell = ConstructCell(context, allSpriteImg);
  // constructCell.draw();

  let monster = new Monster(context, allSpriteImg);
  monster.draw();
  monster.staticFun();

  const hero = new Hero(context, heroImg);
  hero.draw();

  document.addEventListener('keydown', (e) => {
    if (e) {
      if (e.keyCode === 37) { // 左
        hero.move('left', monster, { width: 500, height: 300 }); // 方向键 怪物区域 画布区域
      }
      if (e.keyCode === 38) { // 上
        hero.move('up', monster, { width: 500, height: 300 });
      }
      if (e.keyCode === 40) { // 下
        hero.move('down', monster, { width: 500, height: 300 });
      }
      if (e.keyCode === 39) { // 右
        hero.move('right', monster, { width: 500, height: 300 });
      }
      if (e.keyCode === 32) {
        if (hero.attack(monster)) {
          monster = null;
        }
        hero.say();
      }
    }
  });
}
