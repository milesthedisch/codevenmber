const canvasElm = document.getElementsByTagName('canvas');
const canvas = canvasElm[0];
const w = canvas.width = window.innerWidth;
const h = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let angle = 1 / w/2 - 0.04;
let height = 200;
let calls = 0;

window.onmousemove = (e) => {
  angle = (20 / e.pageX);
  height = e.pageY / 3;
}

window.ontouchmove = (e) => {
  angle = (20 / e.pageX) * Math.PI * 2;
  height = e.pageY / 5;
}

const cartesianing = () => {
  ctx.translate(canvas.width/2,canvas.height);
  ctx.save();
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

function branch(x, y, len) {
  if (len < 15) {
    return;
  }

  len = len * 0.67;
  line(0, 0, 0, -len);

  colorIn(len);

  ctx.save();

  ctx.translate(0, -len);
  
  ctx.save()
  ctx.rotate(Math.PI / 5 + angle);
  branch(x, y, len - (Math.sin(len) + 0.04));
  ctx.restore();

  ctx.save();
  ctx.rotate(-Math.PI / 5 - angle);
  branch(x, y, len - (Math.sin(len) + 0.04));
  ctx.restore(); 

  ctx.save()
  ctx.rotate(Math.PI * (2 * angle));
  branch(x, y, len + 1);
  ctx.restore();

  ctx.save()
  ctx.rotate(-Math.PI * (2 * angle));
  branch(x, y, len / 2);
  ctx.restore();  

  ctx.restore();
}

const start = () => {
  // Lets center this shit.
  cartesianing();

  (function animate() {
    ctx.clearRect(-w/2, -h, w, h)  

    branch(0, 0, height);
    window.requestAnimationFrame(animate);
  })()
}

window.onload = start;
