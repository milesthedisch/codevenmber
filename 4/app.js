const canvasElm = document.getElementsByTagName('canvas');
const canvas = canvasElm[0];
const w = canvas.width = window.innerWidth;
const h = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const n = 200;
const bouncyness = 0.1;
const offset = 500;
let friction = 0.9;
let cx=w/2;
let cy=h/2;

window.onload = setup;

const handler = ({pageX, pageY}) => {cx = pageX, cy = pageY}

if (window.hasOwnProperty('ontouchmove')) {
  friction = 0.7;
}

window.onmousemove = handler;
window.ontouchmove = handler;

const o = Object.create(null);
const spring = Object.assign(o, {
  init(id) {
    this.offset = offset * Math.random() + 10 | 0;
    this.id = id;
    this.velocityX = Math.random() * 500 | 0;
    this.velocityY = Math.random() * 100 | 0;
    this.positionX = (w/2 * Math.random()) | 0;
    this.positionY = (h/2 * Math.random()) | 0;
    this.accelerationX = Math.random() * 2 + 10 | 0;
    this.accelerationY = Math.random() * 2 + 10 | 0;
    return this;
  },
  accelerate(x, y) {
    this.velocityX += (x || this.accelerationX);
    this.velocityY += (y || this.accelerationY);
  },
  updatePosition() {
    if (Math.abs(this.velocityY) < 0.005 && Math.abs(this.velocityX) < 0.005) {
      this.stop();
    }

    this.velocityY *= friction;
    this.velocityX *= friction;

    this.positionX += this.velocityX;
    this.positionY += this.velocityY;
  },
  stop() {
    this.velocityY = 0;
    this.velocityX = 0;
    this.accelerationX = 0;
    this.accelerationY = 0; 
  },
  springTo(x, y) {
    const dx = x - this.positionX | 0;
    const dy = y - this.positionY | 0;

    const dist = Math.hypot(dx, dy);

    const springForce = (dist - this.offset) * bouncyness;
    
    const ax =  dx / dist * springForce;
    const ay =  dy / dist * springForce;

    this.accelerationX = ax;
    this.accelerationY = ay; 
  }

});

let s = Object.create(spring).init();

function setup(e) {
  springs = generateSprings(n || 10);

  draw();
}


function draw() {
  ctx.clearRect(0, 0, w, h);

  update();

  springs.forEach(s => {
    let dist = Math.hypot(s.velocityX, s.velocityY) + 2;

    let r = (dist * (cx/50)) | 0;
    let g = (dist * (cy/50)) | 0;
    let b = (dist * 2) | 0
    let a = 1 / dist;

    ctx.shadowBlur = (dist + dist) + 20 | 0;
    ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${a * 100}`;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dist / 50 + 0.2}`;
    ctx.beginPath();
    ctx.arc(s.positionX, s.positionY, 10, 0, Math.PI * 2);
    ctx.fill();
  });
 

  requestAnimationFrame(draw);
}

function update() {  
  springs.forEach(s => {
    s.springTo(cx, cy);
    s.accelerate();
    s.updatePosition();   
  });
}

function generateSprings(n) {
  return Array(n)
    .fill(1)
    .map((x, i) => Object.create(spring).init(i));
}
