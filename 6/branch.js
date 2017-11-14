const branchCreator = function (ctx) {

  const line = (x0, y0, x1, y1) => {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  }

  const rotate = function (angle, dx, dy) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const rx = dx * cos - dy * sin;
    const ry = dy * cos + dx * sin;

    return { x: rx, y: ry };
  }

  const branch = Object.create(null);

  Object.assign(branch, {
    init(start = {x: 0, y: -20}, end = {x: 0, y: -100}) {
      this.start = start;
      this.end = end;
      return this;
    },

    duplicate(len=0.67, angle=-2 * Math.PI / 3) {
      const dx = this.start.x - this.end.x;
      const dy = this.start.y - this.end.y;

      const rotatedVecA = rotate(angle, dx, dy);

      rotatedVecA.y *= len;
      rotatedVecA.x *= len;

      rotatedVecA.y += this.end.y;
      rotatedVecA.x += this.end.x;

      const rotatedVecB = rotate(-angle + (Math.random() * 0.4), dx, dy);

      rotatedVecB.y *= len;
      rotatedVecB.x *= len;

      rotatedVecB.y += this.end.y;      
      rotatedVecB.x += this.end.x;

      this.finished = true;

      return [
        Object.create(branch).init(this.end, rotatedVecA),
        Object.create(branch).init(this.end, rotatedVecB)
      ];
    },

    show() {
      line(this.start.x, this.start.y, this.end.x, this.end.y);
      return this;
    }
  });

  return branch;
}
