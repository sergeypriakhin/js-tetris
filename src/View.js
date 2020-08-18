class View {
  constructor(e, w, h, r, c) {
    this.element = e;
    this.width = w;
    this.height = h;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.classList.add("canvas");
    this.context = this.canvas.getContext("2d");
    this.figureWidth = this.width / c;
    this.figureHeight = this.height / r;

    this.element.appendChild(this.canvas);
  }

  setColorFigure(type) {
    const colorMap = {
      1: "yellow",
      2: 'cyan',
      3: 'green',
      4: 'red',
      5: 'orange',
      6: 'blue',
      7: 'purple',
    };

    return colorMap[type] || 'red';
  }

  render({ playField }) {
    this.clearScreen();
    this.renderPlayField(playField);
  }

  renderPlayField(playField) {
    for (let y = 0; y < playField.length; y++) {
      const row = playField[y];

      for (let x = 0; x < row.length; x++) {
        const col = row[x];

        if (col !== 0) {
          this.renderFigure(
            x * this.figureWidth,
            y * this.figureHeight,
            this.figureWidth,
            this.figureHeight,
            this.setColorFigure(col)
          );
        }
      }
    }
  }

  renderFigure(x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = "black";
    this.context.lineWidth = 2;

    this.context.fillRect(x, y, width, height);
    this.context.strokeRect(x, y, width, height);
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}

export default View;
