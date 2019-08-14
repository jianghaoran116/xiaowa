import prepare from './containers/prepare';
import drawHero from './containers/drawHero';
import './styles/index.css';

const resourceManager = prepare();
resourceManager.getResource((context, heroImg, allSpriteImg) => {
  drawHero(context, heroImg, allSpriteImg);
});
