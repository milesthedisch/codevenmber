const canvasElm = document.getElementsByTagName('canvas');
const canvas = canvasElm[0];
const w = canvas.width = window.innerWidth;
const h = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const n = 100;
const bouncyness = 0.1;
const offset = 500;
let friction = 0.9;
let cx=w/2;
let cy=h/2;

window.onload = setup;

const thandler = ({layerX, layerY}) => {cx = layerX, cy = layerY}
const whandler = ({clientX, clientY}) => {cx = clientX, cy = clientY}

if (window.hasOwnProperty('ontouchmove')) {
  friction = 0.7;
  window.ontouchmove = thandler;
}

window.onmousemove = whandler;

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
    const dx = x - this.positionX;
    const dy = y - this.positionY;

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

    let r = (dist * (cx/100) + 100) | 0;
    let g = (dist * (cy/100) + 20) | 0;
    let b = (dist) | 0
    let a = 1/dist;

    ctx.shadowBlur = (dist) + 20 | 0;
    ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${1}`;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${1}`;
    ctx.beginPath();
    ctx.arc(s.positionX, s.positionY, 10, 0, Math.PI * 2);
    ctx.fill();

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
