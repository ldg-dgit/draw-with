const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".controls__color");
const range = document.querySelector(".range");
const mode = document.querySelector(".mode");
const saveBtn = document.querySelector(".save");
const resetBtn = document.querySelector(".reset");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = 700;
const INITIAL_CANVAS_COLOR = "white";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = INITIAL_CANVAS_COLOR;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = ctx.strokeStyle;
}

function rangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function changeMode(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function canvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function contextMenu(event) {
  event.preventDefault();
}

function saveImg(event) {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  const date = Date.now();
  link.download = `Draw-with-export-${date}`;
  link.click();
}

function reset(event) {
  ctx.fillStyle = INITIAL_CANVAS_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = INITIAL_COLOR;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("mousedown", canvasClick);
  canvas.addEventListener("contextmenu", contextMenu);
}

if (range) {
  range.addEventListener("input", rangeChange);
}

if (mode) {
  mode.addEventListener("click", changeMode);
}

if (saveBtn) {
  saveBtn.addEventListener("click", saveImg);
}

if (resetBtn) {
  resetBtn.addEventListener("click", reset);
}

colors.forEach((color) => color.addEventListener("click", changeColor));
