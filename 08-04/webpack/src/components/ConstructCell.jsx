function ConstructCell(context, img) {
  const cells = [];
  const initCell = {
    icon: 'normal',
    imgPos: {
      x: 0,
      y: 0,
      width: 30,
      height: 30,
    },
    mapPos: {},
  };
  const width = 15;
  const cellWidth = 40;
  for (let i = 0; i < width; i += 1) {
    cells[i] = [];
    for (let j = 0; j < width; j += 1) {
      cells[i][j] = JSON.parse(JSON.stringify(initCell));
      cells[i][j].mapPos = {
        x: i * cellWidth,
        y: j * cellWidth,
        width: cellWidth,
        height: cellWidth,
      };
    }
  }
  return {
    getCells: function getCells() {
      return cells;
    },
    decorateCell: function decorateCell({ x, y }, value) {
      cells[x][y] = value;
    },
    forEach: function forEach(cb) {
      cells.forEach((column) => {
        column.forEach((cell) => {
          if (cb) cb(cell);
        });
      });
    },

    judgeIn: function judgeIn(pos) {
      return (pos.x >= 0
        && pos.y >= 0
        && pos.x < width * cellWidth
        && pos.y < width * cellWidth);
    },
    draw: function draw() {
      this.forEach((cell) => {
        const { imgPos, mapPos } = cell;
        context.drawImage(img, imgPos.x, imgPos.y,
          imgPos.width, imgPos.height,
          mapPos.x, mapPos.y, mapPos.width, mapPos.height);
      });
    },
  };
}

export default ConstructCell;
