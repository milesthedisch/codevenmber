const canvasElm = document.getElementsByTagName('canvas');
const canvas = canvasElm[0];
const w = canvas.width = window.innerWidth;
const h = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

window.onmousemove = ({pageX, pageY}) => {

}

window.ontouchmove = ({pageX, pageY}) => {

}

const cartesianing = () => {
  ctx.translate(canvas.width/2,canvas.height/2);  
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

const start = () => {
  // Lets center this shit.
  cartesianing();

  (function animate() {
    ctx.clearRect(-w/2, -h/2, w, h);

    for (var i = 0; i < Math.PI * 2; i += 0.1) {
      const x = r * Math.cos(i);
      const y = r * Math.sin(i);

      if (!i) {
        ctx.moveTo(x, y);
        break;
      }`    `

      ctx.lineTo(x, y);
      ctx.stroke():
    }

    // window.requestAnimationFrame(animate);
  })()
}

window.onload = start;
