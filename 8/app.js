const canvasElm = document.getElementsByTagName('canvas');
const canvas = canvasElm[0];
const w = canvas.width = window.innerWidth;
const h = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let _m;
let _a;
let _b;

window.onmousemove = ({pageX, pageY}) => {
  _a = pageX / 8;
  _b = pageY / 8;
}

n.oninput = ({target}) => {
  _m = target.valueAsNumber;
}

const cartesianing = () => {
  ctx.translate(canvas.width/2, canvas.height/2);  
}

const line = (x0, y0, x1, y1) => {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

const supershape = ({theta, a=100, b=100, n1=1, n2=1, n3=1, m=0}) => {
  const g = m/4;
  const part1 = Math.pow(Math.abs(1/a * Math.cos(g * theta)), n2);
  const part2 = Math.pow(Math.abs(1/b * Math.sin(g * theta)), n3);
  const r = Math.pow(part1 + part2, 1/n1);

  if (r === 0) {
    return { x: 0, y: 0 };
  }

  const x = 1 / r * Math.cos(theta);
  const y = 1 / r * Math.sin(theta);
  return { x, y };
}

const drawSupershape = (points, ox=0, oy=0, args, pi) => {
  ctx.beginPath();

  const {
    a = 100,
    b = 100,
    n1,
    n2,
    n3,
    m = 1
  } = args;

  for (let i = 0; i <= points; i++) {
    let theta = i * (Math.PI * pi) / points;

    const {x, y} = supershape({
      theta,
      a: a,
      b: b,
      n1: n1,
      n2: n2,
      n3: n3,
      m: m
    });
    if (!i) {
      ctx.moveTo(x + ox, y + oy);  
    }
    
    ctx.lineTo(x + ox, y + oy);
    supershape(theta);
  }

  ctx.closePath();
  ctx.stroke();
}

let phi = 0;
let o = 0;
let amount = 2;
function animate() {
  o += 0.01;
  phi += 0.001;

  const sine = Math.pow(Math.sin(phi * 2) * Math.cos(phi + 2), 2);
  const cosine = Math.cos(phi) * 20;
  const tane = Math.tan(o) / 100;

  // ctx.clearRect(-w/2, -h/2, w, h);  
  
  ctx.lineWidth = 1;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = 'rgba(0, ' + Math.floor(255 * sine) + ', ' + 
                         Math.floor(255 * cosine) + ', ' + 0.02 + ')'

  drawSupershape(10000, undefined, undefined, {
    a: ((_a || 3) * cosine * 20) + 100,
    b: ((_b || 3) * cosine) + 100,
    n1: sine + 0.3,
    n2: sine + 0.3,
    n3: sine + 0.3,
    m: (_m || 1) * sine + 1
  }, 20 );
           

  requestAnimationFrame(animate);
}

window.onload = () => {
  cartesianing();
  animate();
};
