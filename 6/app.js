const canvasElm = document.getElementsByTagName('canvas');
const canvas = canvasElm[0];
const w = canvas.width = window.innerWidth;
const h = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let mx = 0;
let my = -1000;
let theta = 10;
window.friction = 0.7;

const branchs = [];

const treesian = () => {
  ctx.translate(canvas.width/2,canvas.height);
  ctx.save();
};

let branches = [];
const rootBranch = Object.create(branchCreator(ctx))

branches.push(rootBranch.init());
branches = branches.concat(...rootBranch.duplicate(0.7, (2.4 * Math.random() + 2.3)));
branches = branches.concat(...rootBranch.duplicate(0.7, (2.4 * Math.random() + 2.3)));

const start = () => {
  // Lets center ground this shit.
  treesian();

  let delta = 0;
  (function animate() {
    ctx.clearRect(-w/2, -h, w, h);
    delta += 0.1 * Math.random();

    branches.forEach((b, i) => {
      const gamma = b.dist/(b.dist+50);

      ctx.strokeStyle = `rgba(${80 * b.dist/100 | 0}, ${42}, 40,${gamma})`;
      ctx.lineWidth = b.dist / 67;

      if (i === 0) {
        ctx.lineWidth = 10;
      }

      const len = Math.hypot(b.end.x - mx, b.end.y - my);

      b.vel.x += Math.sin(delta/2) * (100/b.dist + 1) / (50 * Math.random() + 10) // Remove random to make the branches not go crazy
      b.vel.y += Math.sin(delta/4) * (100/b.dist + 1) / (50 * Math.random() + 10) // Remove random to make the branches not go crazy

      if (i > 4 && !b.finished) {
        b.spring(b.start, b.end);  
      } else if (i < 2 && i) {
        b.spring(b.start, {x: b.end.x * 0.67, y: b.end.y * 0.67})
      } 

      if (len < 200 && !b.finished) {
        b.leaf(`rgba(200,0,0,${b.dist/(b.dist+10)}`);
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
        branches.push(...b.duplicate(0.67, 2.4 * Math.random() + 2.2));  
        branches.push(...b.duplicate(0.67, 2.4 * Math.random() + 2.2));
      }
  });
}, 40);

window.onclick = () => {
  window.onmousemove = ({pageX, pageY}) => {
    mx = pageX - w/2;
    my = pageY - h;
  }
}
