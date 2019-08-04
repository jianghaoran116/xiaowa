import prepare from './components/prepare';
import drawHero from './components/drawHero';
import './styles/index.css';

const resourceManager = prepare();
resourceManager.getResource((context, heroImg, allSpriteImg) => {
  drawHero(context, heroImg, allSpriteImg);
});
