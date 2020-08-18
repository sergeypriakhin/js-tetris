import { createPlayField } from "../utils/playField";

class Game {
  constructor() {
    this.score = 0;
    this.field = createPlayField();
    this.activeFigure = this._createFigure();
    this.nextFigure = this._createFigure();
  }

  _isFigureOutOfPlayField() {
    const { y: figureY, x: figureX, figure } = this.activeFigure;

    for (let y = 0; y < figure.length; y++) {
      for (let x = 0; x < figure[y].length; x++) {
        if (
          figure[y][x] !== 0 &&
          (this.field[figureY + y] === undefined ||
            this.field[figureY + y][figureX + x] === undefined ||
            this.field[figureY + y][figureX + x] !== 0)
        ) {
          return true;
        }
      }
    }

    return false;
  }

  _createFigure() {
    const index = Math.floor(Math.random() * 7);
    const figure = 'OISZLJT'[index];
    let newFigure = {};

    switch (figure) {
      case 'O': {
        newFigure = {
          x: 0,
          y: 0,
          figure: [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
          ],
        };
        break;
      }
      case 'I': {
        newFigure = {
          x: 0,
          y: 0,
          figure: [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
        };
        break;
      }
      case 'S': {
        newFigure = {
          x: 0,
          y: 0,
          figure: [
            [0, 3, 3],
            [3, 3, 0],
            [0, 0, 0],
          ],
        };
        break;
      }
      case 'Z': {
        newFigure = {
          x: 0,
          y: 0,
          figure: [
            [4, 4, 0],
            [0, 4, 4],
            [0, 0, 0],
          ],
        };
        break;
      }
      case 'L': {
        newFigure = {
          x: 0,
          y: 0,
          figure: [
            [0, 5, 0],
            [0, 5, 0],
            [0, 5, 5],
          ],
        };
        break;
      }
      case 'J': {
        newFigure = {
          x: 0,
          y: 0,
          figure: [
            [0, 6, 0],
            [0, 6, 0],
            [6, 6, 0],
          ],
        };
        break;
      }
      case 'T': {
        newFigure = {
          x: 0,
          y: 0,
          figure: [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
          ],
        };
        break;
      }
      default: {
        throw new Error('Нет такой фигуры');
      }
    }

    return newFigure;
  }

  _updateFigure() {
    this.activeFigure = this.nextFigure;
    this.nextFigure = this._createFigure();
  }

  get state() {
    const { y: figureY, x: figureX, figure } = this.activeFigure;
    let playField = createPlayField();

    for (let y = 0; y < this.field.length; y++) {
      for (let x = 0; x < this.field[x].length; x++) {
        playField[y][x] = this.field[y][x];
      }
    }

    for (let y = 0; y < figure.length; y++) {
      for (let x = 0; x < figure[y].length; x++) {
        if (figure[y][x]) {
          playField[figureY + y][figureX + x] = figure[y][x];
        }
      }
    }

    return { playField };
  }

  moveLeft() {
    this.activeFigure.x -= 1;

    if (this._isFigureOutOfPlayField() === true) {
      this.activeFigure.x += 1;
    }
  }

  moveRight() {
    this.activeFigure.x += 1;

    if (this._isFigureOutOfPlayField() === true) {
      this.activeFigure.x -= 1;
    }
  }

  moveDown() {
    this.activeFigure.y += 1;

    if (this._isFigureOutOfPlayField() === true) {
      this.activeFigure.y -= 1;
      this.lockFigure();
      this._updateFigure();
    }
  }

  rotateFigure() {
    const { figure } = this.activeFigure;
    const len = figure.length;

    let temp = [];
    for (let i = 0; i < len; i++) {
      temp[i] = new Array(len).fill(0);
    }

    for (let y = 0; y < len; y++) {
      for (let x = 0; x < len; x++) {
        temp[x][y] = figure[len - 1 - y][x];
      }
    }

    this.activeFigure.figure = temp;

    if (this._isFigureOutOfPlayField() === true) {
      this.activeFigure.figure = figure;
    }
  }

  lockFigure() {
    const { y: figureY, x: figureX, figure } = this.activeFigure;

    for (let y = 0; y < figure.length; y++) {
      for (let x = 0; x < figure[y].length; x++) {
        if (figure[y][x]) {
          this.field[figureY + y][figureX + x] = figure[y][x];
        }
      }
    }
  }
}

export default Game;
