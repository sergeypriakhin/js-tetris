import './index.css';
import Game from './Game';
import View from './View';

const app = document.getElementById('app');

const game = new Game();
const view = new View(app, 320, 640, 20, 10);

window.game = game;
window.view = view;

document.addEventListener('keydown', (event) => {
  switch(event.keyCode) {
    // LEFT ARROW
    case 37: {
      game.moveLeft();
      view.render(game.state);
      break;
    }
    // UP ARROW
    case 38: {
      game.rotateFigure();
      view.render(game.state);
      break;
    }
    // RIGHT ARROW
    case 39: {
      game.moveRight();
      view.render(game.state);
      break;
    }
    // DOWN ARROW
    case 40: {
      game.moveDown();
      view.render(game.state);
      break;
    }
  }
});

