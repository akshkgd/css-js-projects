const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");

const sizeEL = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");

const ctx = canvas.getContext("2d");

colorEl.addEventListener('input', setColorElBg);
function setColorElBg(){
  colorEl.style.backgroundColor = colorEl.value;
}
setColorElBg();

window.addEventListener("resize", setCanvasSize);
function setCanvasSize() {
  canvas.width = window.innerWidth * 0.9;  // 90% of the viewport width
  canvas.height = window.innerHeight * 0.9; // 90% of the viewport height
}
setCanvasSize();


let size = 6;
let isPressed = false;
let color = "black";
let x;
let y;

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;

  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1); // start
  ctx.lineTo(x2, y2); // end
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function updateSizeOnScreen() {
  sizeEL.innerText = size;
}

increaseBtn.addEventListener("click", () => {
  size += 2;

  if (size > 50) {
    size = 50;
  }

  updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
  size -= 2;

  if (size < 2) {
    size = 2;
  }

  updateSizeOnScreen();
});

colorEl.addEventListener("change", (e) => (color = e.target.value));

clearEl.addEventListener("click", () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height)
);


canvas.addEventListener("touchstart", (e) => {
  isPressed = true;

  x = e.touches[0].clientX - canvas.offsetLeft;
  y = e.touches[0].clientY - canvas.offsetTop;
});

canvas.addEventListener("touchend", (e) => {
  isPressed = false;

  x = undefined;
  y = undefined;
});

canvas.addEventListener("touchmove", (e) => {
  if (isPressed) {
    const x2 = e.touches[0].clientX - canvas.offsetLeft;
    const y2 = e.touches[0].clientY - canvas.offsetTop;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
  }
});