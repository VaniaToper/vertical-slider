const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");
const leftSide = document.querySelector(".leftside");
const rightSide = document.querySelector(".rightside");
const container = document.querySelector(".container");
const photoCount = leftSide.querySelectorAll("div").length;
leftSide.style.top = `-${(photoCount - 1) * 100}vh`;
let slideIndex = 0;

const changeSlide = (direction) => {
  const height = container.clientHeight;
  if (direction === "up") {
    slideIndex++;
    if (slideIndex === photoCount) {
      slideIndex = 0;
    }
  } else if (direction === "down") {
    slideIndex--;
    if (slideIndex < 0) {
      slideIndex = photoCount - 1;
    }
  }
  rightSide.style.transform = `translateY(-${slideIndex * height}px)`;
  leftSide.style.transform = `translateY(${slideIndex * height}px)`;
};

let isDown = false;
let startY;
let scrollTop;

container.addEventListener("mousedown", (e) => {
  isDown = true;
  startY = e.pageY - container.offsetTop;
});
container.addEventListener("mouseleave", () => {
  isDown = false;
});
container.addEventListener("mouseup", () => {
  isDown = false;
});
container.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const y = e.pageY - container.offsetTop;
  const walk = y - startY;
  if (walk === 200) {
    changeSlide("up");
    return;
  }
  if (walk === -200) {
    changeSlide("down");
    return;
  }
});

function mouseScroll(event) {
  if (event.deltaY === -100) {
    changeSlide("up");
  }
  if (event.deltaY === 100) {
    changeSlide("down");
  }
}

upBtn.addEventListener("click", () => changeSlide("up"));
downBtn.addEventListener("click", () => changeSlide("down"));
document.addEventListener("wheel", () => mouseScroll(event));
