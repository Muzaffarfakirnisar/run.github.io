let canvas = document.getElementById('canvas');
let s = document.getElementById('s');
let c = canvas.getContext('2d');
let w = innerWidth;
let h = innerHeight;
canvas.width = w;
canvas.height = h;
let g = 0.4;
// img
let pl = new Image();
let coin = new Image();
let ob = new Image();
let over = new Audio();
let start = new Audio();
start.src = 'start.mp3';
over.src = 'Over.wav';
ob.src = 'Ob.png';
coin.src = 'Coin.png';
pl.src = 'P.png';
class Player {
  constructor() {
    this.pos = {
      x: 2,
      y: 10

    }
    this.vel = {
      x: 0,
      y: 0
    }
    this.w = 108;
    this.h = 140;
    this.fx = 0;
    this.count = 0;
    this.scale = 1;
  }
  draw() {
    c.beginPath();
    c.drawImage(pl, this.fx * this.w, 0, this.w, this.h, this.pos.x, this.pos.y, 50 * this.scale, 90);
    c.fillStyle = this.color
    c.fill();
    c.stroke();
    this.count++;
    if (this.count > 7) {
      this.fx++;
      this.count = 0
    }
    if (this.fx > 7) {
      this.fx = 0
    }
    if (this.pos.y + 78 + this.vel.y <= h) {
      this.vel.y += g;
    } else {
      this.vel.y = 0
    }
    if (this.pos.x + this.w + this.vel.x <= w) {
      this.vel.x += 0;
    } else {
      this.vel.x = 0
    }
  }

  update() {
    this.draw();
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }
}
// enemy
let p = new Player();

let en = [];
let ani;
en[0] = {
  x: 500,
  y: 430
}

function enemy() {
  for (var i = 0; i < en.length; i++) {
    let fx = 0;
    let count = 0;
    let scale = 1;
    let height = 200;
    let width = 300;
    c.beginPath();
    c.drawImage(ob, fx * width, 0, width, height, en[i].x, en[i].y, 80 * scale, 80);

    c.fillStyle = 'black'
    c.fill();
    c.stroke();
    count++;
    if (count > 3) {
      fx++;
      count = 0
    }
    if (fx > 3) {
      fx = 0
    }
    en[i].x--;
    if (en[i].x == 125) {
      en.push({
        x: 500,
        y: 430
      });
    }
    // coliision
    if (p.pos.x + 50 >= en[i].x && p.pos.x <= en[i].x + 77 && p.pos.y + 78 >= en[i].y && p.pos.y <= en[i].y + 82) {
      setTimeout(() => {
        location.reload(true);
        cancelAnimationFrame(ani);

      }, 100);

    }

  }

}
let point = [];
point[0] = {
  x: 126,
  y: 470,
}
let score = 0

function points() {
  for (var i = 0; i < point.length; i++) {
    let fx = 0;
    let count = 0;
    let scale = 1;
    let width = 175;
    let height = 171;

    c.beginPath();
    c.drawImage(coin, fx * width, 0, width, height, point[i].x, point[i].y, 29, 29);
    c.stroke();
    count++
    if (count > 5) {
      fx++;
      count = 0
    }
    if (fx > 5) {
      fx = 0
    }
    point[i].x--;
    if (point[i].x == 125) {
      point.push({
        x: 238,
        y: 470
      });
    }
    if (p.pos.x + 30 >= point[i].x && p.pos.x <= point[i].x - 29 && p.pos.y + 78 >= point[i].y && p.pos.y <= point[i].y - 29) {
      point.splice(i, 1);
      //console.log('gain');
      score += 10;
      s.innerHTML = score;




    }

  }
}
// add event listen 
window.addEventListener('click', jump);

function jump(e) {
  p.vel.y -= 10;
  p.vel.x += 0.0001
}

function animate() {
  ani = requestAnimationFrame(animate);
  c.clearRect(0, 0, w, h)
  p.update();
  enemy();
  points();

}
animate();