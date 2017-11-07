const canvasElm = document.getElementsByTagName('canvas');
const canvas = canvasElm[0];
const w = canvas.width = window.innerWidth;
const h = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const n = 200;
const bouncyness = 0.6;
const friction = 0.999;
const theta = 4;
const amp = 10

window.onload = setup;

const o = Object.create(null);
const spring = Object.assign(o, {
  init(id) {
    this.id = id;
    this.velocityX = Math.random() * 1 - 1;
    this.velocityY = Math.random() * 1 - 1;
    this.positionX = w/2 * Math.random() + w/4;
    this.positionY = h/2;
    this.accelerationX = 0.01;
    this.accelerationY = 0.01;
    return this;
  },
  accelerate(x, y) {
    this.velocityX += x || this.accelerationX;
    this.velocityY += y || this.accelerationY;
  },
  updatePosition() {
    this.positionX += this.velocityX;
    this.positionY += this.velocityY;
  }
});

let springs = [];

function setup(e) {
  springs = generateSprings(n || 10);

  draw();
}

function generateSprings(n) {
  return Array(n)
    .fill(1)
    .map((x, i) => Object.create(spring).init(i));
}

function draw() {
  // ctx.clearRect(0, 0, w, h);

  update();

  springs.forEach(s => {
    const vector = Math.hypot(s.velocityY, s.velocityX);
    ctx.shadowBlur = vector * 20;
    ctx.shadowColor = `rgba(${Math.floor(vector * 150)}, ${Math.floor(s.positionX / 10)}, ${Math.floor(s.positionY / 10)}, ${1 / (vector * 2)})`;
    ctx.fillStyle = `rgba(${Math.floor(vector * 150)}, ${Math.floor(s.positionX / 10)}, ${Math.floor(s.positionY / 10)}, ${1 / (vector * 2)})`;
    ctx.beginPath();
    ctx.arc(s.positionX, s.positionY, 10, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

function update() {
  springs.forEach(s => {
    springs
      .filter(_s => s !== _s)
      .forEach(a => {
        let dx = s.positionY - a.positionY;
        let dy = s.positionX - a.positionX;
        let dist = Math.hypot(dx, dy);

        let springForce = dist * bouncyness;
        let ax = (dx / dist) * springForce;
        let ay = (dy / dist) * springForce;
        a.accelerate(ax / 100000000, ay / 100000000);

        s.velocityY -= ay / 10000000;
        s.velocityX -= ax / 10000000;
    });

    
    s.updatePosition();
  });
 
}

