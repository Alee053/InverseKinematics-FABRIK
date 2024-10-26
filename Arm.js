class Piece {
  constructor(x0, y0, size, angle) {
    this.x0 = x0;
    this.y0 = y0;
    this.size = size;
    this.angle = angle;
    this.xf = 0;
    this.yf = 0;
    this.calc();
  }
  calc() {
    angleMode("degrees");
    this.xf = this.x0 + cos(this.angle) * this.size;
    this.yf = this.y0 + sin(this.angle) * this.size;
  }
  draw() {
    line(this.x0, this.y0, this.xf, this.yf);
  }
}
class Arm {
  constructor(x0, y0, n, size) {
    this.x0 = x0;
    this.y0 = y0;
    this.size = size;
    this.n = n;
    this.arm = [];
    this.init();
  }
  init() {
    this.arm.push(new Piece(this.x0, this.y0, this.size, 0));
    for (let i = 1; i < this.n; i++)
      this.arm.push(
        new Piece(this.arm[i - 1].xf, this.arm[i - 1].yf, this.size, 0),
      );
    console.log(this.arm);
  }
  calc(x, y) {
    let dist = sqrt(pow(x - this.x0, 2) + pow(y - this.y0, 2));
    if (dist >= this.n * this.size) {
      let angle =
        x >= this.x0
          ? atan((y - this.y0) / (x - this.x0))
          : 180 + atan((y - this.y0) / (x - this.x0));

      this.arm[0].angle = angle;
      this.arm[0].calc();
      for (let i = 1; i < this.n; i++) {
        this.arm[i].angle = angle;
        this.arm[i].x0 = this.arm[i - 1].xf;
        this.arm[i].y0 = this.arm[i - 1].yf;
        this.arm[i].calc();
      }
    } else {
      let error = 0;
      if (
        !(
          (abs(this.arm[0].xf - this.x0) < error &&
            abs(this.arm[0].yf - this.y0) < error &&
            abs(this.arm[this.n - 1].x0 - x) < error &&
            abs(this.arm[this.n - 1].y0 - y) < error) ||
          (abs(this.arm[0].x0 - this.x0) < error &&
            abs(this.arm[0].y0 - this.y0) < error &&
            abs(this.arm[this.n - 1].xf - x) < error &&
            abs(this.arm[this.n - 1].yf - y) < error)
        )
      )
        //BACKWARDS
        for (let i = this.n - 1; i >= 0; i--) {
          let curr = this.arm[i];
          let prev = i != 0 ? this.arm[i - 1] : { xf: this.x0, yf: this.y0 };
          let next = i != this.n - 1 ? this.arm[i + 1] : { xf: x, yf: y };
          curr.x0 = next.xf;
          curr.y0 = next.yf;
          let angle =
            prev.xf >= curr.x0
              ? atan((prev.yf - curr.y0) / (prev.xf - curr.x0))
              : atan((prev.yf - curr.y0) / (prev.xf - curr.x0)) - 180;
          curr.angle = angle;
          curr.calc();
        }

      for (let i = 0; i < this.n; i++) {
        let curr = this.arm[i];
        let prev = i != 0 ? this.arm[i - 1] : { xf: this.x0, yf: this.y0 };
        let next = i != this.n - 1 ? this.arm[i + 1] : { xf: x, yf: y };
        curr.x0 = prev.xf;
        curr.y0 = prev.yf;
        let angle =
          next.xf >= curr.x0
            ? atan((next.yf - curr.y0) / (next.xf - curr.x0))
            : atan((next.yf - curr.y0) / (next.xf - curr.x0)) - 180;
        curr.angle = angle;
        curr.calc();
      }
    }
  }
  draw() {
    for (let i = 0; i < this.n; i++) {
      stroke(100 / (i + 0.5), 255 / (i + 0.5), 255 / (i + 0.5));
      this.arm[i].draw();
    }
  }
}
