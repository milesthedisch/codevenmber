const canvasElm = document.getElementsByTagName('canvas');
const canvas = canvasElm[0];
const w = canvas.width = window.innerWidth / 4;
const h = canvas.height = window.innerHeight / 4;
const ctx = canvas.getContext('2d');

window.onload = init;

const o = Object.create(null);
const amnt = 2;

const ball = Object.assign(o, {
  init() { 
    this.velocity = [Math.random() * 50 / 2 - 1, Math.random() * 30 / 2 - 1]
    this.position = [Math.random() * w - 1, Math.random() * h - 1]
    return this;
  },
  position: [100, 100],
  radius: 10,
  velocity: [0, 0]
});

const balls = [
  Object.create(ball).init(),
  Object.create(ball).init(),
  Object.create(ball).init(),
  Object.create(ball).init()
]

function init() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  update(data);
}

function update(data) {

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let sum = 0;
      let index = (x + y * w) * 4;

      for (let i in balls) {
        let ball = balls[i];
        sum += 100000 * ball.radius / Math.hypot(x - ball.position[0], y - ball.position[1]);
      }

      let r = index;
      let g = index + 1;
      let b = index + 2;
      let a = index + 3;

      data[a] = sum / 255;
      data[r] = sum / 200;
      data[g] = sum / 200;
      data[b] = sum / 255;
    }
  }

  const red = new ImageData(data, w, h);
  ctx.putImageData(red, 0, 0);

  balls.forEach((ball) => {
    ball.position[0] += ball.velocity[0];
    ball.position[1] += ball.velocity[1];

    if (ball.position[0] > w || ball.position[0] < 0) {
      ball.velocity[0] *= -1;
    } 

    if (ball.position[1] > h || ball.position[1] < 0) {
      ball.velocity[1] *= -1;
    }

    // ctx.beginPath()
    // ctx.arc(ball.position[0], ball.position[1], ball.radius, 0, 2 * Math.PI);
    // ctx.stroke();
  });



  requestAnimationFrame(update.bind(null, data));
}


