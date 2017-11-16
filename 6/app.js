const canvasElm = document.getElementsByTagName('canvas');
const canvas = canvasElm[0];
const w = canvas.width = window.innerWidth;
const h = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let mx = 0;
let my = -1000;
window.friction = 0.7;

const branchs = [];

const cartesianing = () => {
  ctx.translate(canvas.width/2,canvas.height);
  ctx.save();
};

let branches = [];
const rootBranch = Object.create(branchCreator(ctx))

branches.push(rootBranch.init());
branches = branches.concat(...rootBranch.duplicate(0.8, (2.4 * Math.random() + 2.3)));
branches = branches.concat(...rootBranch.duplicate(0.8, (2.4 * Math.random() + 2.3)));

const start = () => {
  // Lets center this shit.
  cartesianing();

  const rnd1 = 10 * Math.random() | 0;
  const rnd2 = 10 * Math.random() | 0;
  const rnd3 = 10 * Math.random() | 0;

  let delta = 0;
  (function animate() {
    ctx.clearRect(-w/2, -h, w, h);
    delta += 0.3 * Math.random()

    branches.forEach((b, i) => {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;

      if (i < 10) {
        ctx.lineWidth = 10;
      }

      if (i % rnd1 === 0 && rnd3 === 0) {
        ctx.lineWidth = 2 + 10/i;  
      }

      if (i % rnd2 === 0 && rnd3 === 0) {
        ctx.lineWidth = 3 + 10/i;   
      }

      const len = Math.hypot(b.end.x - mx, b.end.y - my);

      // console.log(len);
      b.vel.x += Math.sin(delta/2) * 10 / 50;
      // b.vel.y += my/200 * 10 / 50;

      if (i > 1) {
        b.spring(b.start, b.end);  
      }
        
      b.show();
    });

    window.requestAnimationFrame(animate);
  })()
};

window.onload = start;

const interval = setInterval(() => {
  if (branches.length > 1000) { 
    clearInterval(interval);
    return; 
  }

  Object.keys(branches)
    .forEach((b, i) => {
      b = branches[i];
      if (!b.finished) {
        branches.push(...b.duplicate(0.9 * Math.random() + 0.4, 2.4 * Math.random() + 2.3));  
        branches.push(...b.duplicate(0.9 * Math.random() + 0.4, 2.4 * Math.random() + 2.3));
      }
  });
}, 40);

window.onmousemove = ({pageX, pageY}) => {
  mx = pageX - w/2;
  my = pageY - h;
}
