const canvas = document.getElementById('myCanvas');
const c = canvas.getContext('2d');

let mouseX;
let mouseY;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const maxRadius = 35;

const colorArray = ['#F2059F', '#04B2D9', '#04D94F', '#F2CB05', '#F28705'];

canvas.onmousemove = function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
};

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function() {
    if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
  
    if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
  
    this.x += this.dx;
    this.y += this.dy;

    // interactivity  
    if (mouseX - this.x < 50 && mouseX - this.x > -50 &&
        mouseY - this.y < 50 && mouseY - this.y > -50) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

let circleArray = [];

function init() {
  circleArray = [];
  
  for (let i = 0; i < 1000; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5);
    let dy = (Math.random() - 0.5);
  
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();

animate();