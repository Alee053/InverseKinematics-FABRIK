let N = 4,
  size = 300 / N;
let arm;
let t = 0;
function setup() {
  frameRate(60);
  createCanvas(600, 600);

  arm = new Arm(0, 0, N, size);

  textAlign("center");

  let minus = createButton("-");
  let plus = createButton("+");

  plus.mousePressed(() => {
    N++;
    size = 300 / N;
    arm = new Arm(0, 0, N, size);
  });
  minus.mousePressed(() => {
    if (N > 1) {
      N--;
      size = 300 / N;
      arm = new Arm(0, 0, N, size);
    }
  });
}

function draw() {
  t += 1 / 60;
  translate(width / 2, height / 2);
  background(25);
  strokeWeight(10);
  stroke(255);
  angleMode("degrees");

  let tarX = mouseX - width / 2,
    tarY = mouseY - height / 2;

  arm.calc(tarX, tarY);
  arm.draw();

  stroke(255, 0, 0);
  point(tarX, tarY);
  point(0, 0);

  stroke(0);
  fill(255);
  strokeWeight(5);
  textSize(25);
  text("N: " + N, 0, -200);
  textSize(12);
}
