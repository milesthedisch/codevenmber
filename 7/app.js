const canvasElm = document.getElementsByTagName('canvas');
const canvas = canvasElm[0];
const w = canvas.width = window.innerWidth;
const h = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let _a; 
let _b;
let _n = 1;

n.oninput = ({ target: { valueAsNumber } }) => {
  _n = valueAsNumber * 2;
};

window.onmousemove = ({pageX, pageY}) => {
  _a = pageX / 10;
  _b = pageY / 10;
}

window.onmousewheel = ({wheelDeltaY}) => {
  _n = 1/wheelDelta + 1;
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

const colorIn = (len) => {
  ctx.shadowBlur = (10 * (5/len) ) | 0;
  ctx.shadowColor = `rgba(100, ${len * 255 | 0}, 100, 1)`;
  ctx.strokeStyle = `rgba(${len | 0}, ${42}, 40, ${len/80})`;
  ctx.lineWidth = len / 30;
}

// Radius
const r = 100;

const sgn = (t) => t ? t / Math.abs(t) : 0;

const superellipse = (a=r, b=r, i, n=1) => {
  // Superrrrrrr ELLIPSE!
  const pow = 2/n;
  const x = Math.pow(Math.abs(Math.cos(i)), pow) * a * sgn(Math.cos(i));
  const y = Math.pow(Math.abs(Math.sin(i)), pow) * b * sgn(Math.sin(i));

  return {x, y};
};

let delta = 0;

function supershape(theta, ox, oy) {
  ctx.beginPath();

  for (var i = 0; i < Math.PI * 2.1; i += 0.1) {
    var {x, y} = superellipse(_a, _b, i, _n * theta);

    if (i <= 0.1) {
      ctx.moveTo(x + ox, y + oy);
    }

    ctx.lineTo(x + ox, y + oy);
  }

  ctx.closePath();
  ctx.fill();
}

function animate() {
  let theta = Math.sin(((delta++ * 2)/ 1000) + Math.sin(delta/10)) / 2;
      theta = Math.pow(theta + 1, 2) / 3;

  ctx.clearRect(0, 0, w, h);
  ctx.lineWidth = 1;
  ctx.lineJoin = "round";

  var j = 0;
  for (var y = 0; y < h; y += 120) {
    for (var x = 0; x < w; x += 120) {
      j += 0.01
      ctx.fillStyle = `rgba(${100}, ${50 * (j * 3) | 0}, ${(30 * (j * 7)) | 0}, ${theta})`;
      supershape(theta, x + 50, y + 50);  
    }  
  }

  requestAnimationFrame(animate);
}

window.onload = () => {
  // cartesianing();
  animate();
};
