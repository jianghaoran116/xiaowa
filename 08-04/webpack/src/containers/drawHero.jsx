import Monster from '../components/Monster';
import Hero from '../components/Hero';

export default function drawHero(context, heroImg, allSpriteImg) {
  const monster = new Monster(context, allSpriteImg);
  monster.draw();

  const hero = new Hero(context, heroImg);
  hero.draw();
}
