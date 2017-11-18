const canvasElm = document.getElementsByTagName('canvas');
const canvas = canvasElm[0];
const w = canvas.width = window.innerWidth;
const h = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let mx = 0;
let my = -1000;
let theta = 10;
window.friction = 0.7;
window.gravity = -0.05;

const branchs = [];

const treesian = () => {
  ctx.translate(canvas.width/2,canvas.height);
  ctx.save();
};

let branches = [];
const rootBranch = Object.create(branchCreator(ctx))

branches.push(rootBranch.init());
branches = branches.concat(...rootBranch.duplicate(0.7 * Math.random(), (2.4 * Math.random() + 2.3)));
branches = branches.concat(...rootBranch.duplicate(0.6 * Math.random() + 0.2, (2.4 * Math.random() + 2.3)));

const start = () => {
  // Lets center ground this shit.
  treesian();

  let delta = 0;
  (function animate() {
    ctx.clearRect(-w/2, -h, w, h);
    delta += 0.1 * Math.random();

    branches.forEach((b, i) => {
      const gamma = b.dist/(b.dist+50);

      ctx.strokeStyle = `rgba(${67 * b.dist/100 | 0}, ${42}, 40,${gamma})`;

      ctx.lineWidth = b.dist / 67;

      if (i === 0) {
        ctx.lineWidth = 10;
      }

      const len = Math.hypot(b.end.x - mx, b.end.y - my) | 0;

      b.vel.x += Math.sin(delta/2) * (100/b.dist + 1) / 20 // Remove random to make the branches not go crazy
      b.vel.y += Math.sin(delta/4) * (100/b.dist + 1) / 20 // Remove random to make the branches not go crazy

      if (i > 4 && !b.finished) {
        b.spring(b.start, b.end);  
      } 

      let r = Math.abs(b.vel.x) + 0.5;
      let g = Math.abs(b.vel.y) + 0.5;
      let _b = Math.abs(b.vel.y) + 0.5 * Math.random();

      if (!b.finished && len < 200) {
        // rainbow leafs
        ctx.save();
        // ctx.shadowBlur = 2;
        // ctx.shadowColor = `rgba(${40 * b.dist/100 | 0}, ${42}, 40,${gamma})`;
        b.leaf(`rgba(${r * 255 | 0},${g * 255 | 0}, ${_b * 255 | 0},${b.dist/(b.dist+10)}`);
        ctx.restore();
      }
        
      b.show();
    });

    window.requestAnimationFrame(animate);
  })()
};

window.onload = start;

const interval = setInterval(() => {
  if (branches.length > 3000) { 
    clearInterval(interval);
    return; 
  }

  Object.keys(branches)
    .forEach((b, i) => {
      b = branches[i];
      if (!b.finished) {
        branches.push(...b.duplicate(0.2 * Math.random() + 0.6, 2.4 * Math.random() + 2.2));  
        branches.push(...b.duplicate(0.2 * Math.random() + 0.6, 2.4 * Math.random() + 2.2));
      }
  });
}, 40);

window.onclick = ({pageX, pageY}) => {
  mx = pageX - w/2;
  my = pageY - h;
  window.onmousemove = ({pageX, pageY}) => {
    mx = pageX - w/2;
    my = pageY - h;
  }
}
