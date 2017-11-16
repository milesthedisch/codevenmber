const canvasElm = document.getElementsByTagName('canvas');
const canvas = canvasElm[0];
const w = canvas.width = window.innerWidth;
const h = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let mx = w/2;
let my = h/2;

const branchs = [];

const cartesianing = () => {
  ctx.translate(canvas.width/2,canvas.height);
  ctx.save();
};

let branches = [];
const rootBranch = Object.create(branchCreator(ctx))

branches.push(rootBranch.init());
branches = branches.concat(...rootBranch.duplicate(0.8 * Math.random() + 0.7, (2.4 * Math.random() + 2)));
branches = branches.concat(...rootBranch.duplicate(0.8 * Math.random() + 0.7, (2.4 * Math.random() + 2)));

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

      // let dx = b.end.x - mx;
      // let dy = b.end.y - my;

      // let dist = Math.hypot(dx, dy) | 0;

      // if (dist <= 50 && dist >= 3) {
      //   // ctx.strokeStyle = "red";
      //   b.end.x -= dx / 30 | 0;
      //   b.end.y -= dy / 30 | 0;
      //   b.start.y -= dy / 30 | 0;
      //   b.start.x -= dx / 30 | 0;
      // }
      
      b.vel.x = (rnd1 * Math.sin((i * i) * 200)) / 10;
      b.vel.y = (rnd2 * Math.cos((i * i) * 200)) / 10;

      b.moveEnd();
        
      b.show();
    });

    window.requestAnimationFrame(animate);
  })()
};

window.onload = start;

let growth = 0;

const interval = setInterval(() => {
  if (branches.length > 2000 * Math.random() + 500) { 
    clearInterval(interval);
    return; 
  }

  Object.keys(branches)
    .forEach((b, i) => {
      b = branches[i];
      if (!b.finished) {
        branches.push(...b.duplicate(0.9 * Math.random(), (2.4 * Math.random() + 2.2)));  
        branches.push(...b.duplicate(0.9 * Math.random(), (2.4 * Math.random() + 2.2)));
        // branches.push(...b.duplicate(0.9 * Math.random(), (2.4 * Math.random() + 2.2)));
        // branches.push(...b.duplicate(0.9 * Math.random(), (2.4 * Math.random() + 2.2)));
        // branches.push(...b.duplicate(0.9 * Math.random(), (2.4 * Math.random() + 2.2)));
        // branches.push(...b.duplicate(0.9 * Math.random(), (2.4 * Math.random() + 2.2)));  
      }
  });
}, 40);

window.onmousemove = ({pageX, pageY}) => {
  mx = pageX - w/2;
  my = pageY - h;
}
