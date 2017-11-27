const canvasElm = document.getElementsByTagName('canvas');
const canvas = canvasElm[0];
const w = canvas.width = window.innerWidth;
const h = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

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

function animate() {
  ctx.clearRect(0, 0, w, h);
  // ctx.lineWidth = 1;
  // ctx.lineJoin = "round";

  // requestAnimationFrame(animate);
}

window.onload = () => {
  // cartesianing();
  animate();
};
