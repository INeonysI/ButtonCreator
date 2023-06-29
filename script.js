const rangeInputs = document.querySelectorAll('input[type="range"]');

function handleInputChange(e) {
  let target = e.target;
  if (e.target.type !== "range") {
    target = document.getElementById("range");
  }
  const min = target.min;
  const max = target.max;
  const val = target.value;

  target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
}

rangeInputs.forEach((input) => {
  input.addEventListener("input", handleInputChange);
});

const form = document.querySelector("#buttonCreator");
const btn = document.querySelector(".btn");

form.addEventListener("change", handleChange);

function handleChange(event) {
  const name = event.target.name;
  const value = event.target.value;

  handleStyle[name](value);
  showCss();
}

const handleStyle = {
  element: btn,
  text(value) {
    this.element.innerHTML = value;
  },
  color(value) {
    this.element.style.color = value;
  },
  backgroundColor(value) {
    this.element.style.backgroundColor = value;
  },
  height(value) {
    this.element.style.height = value + "px";
  },
  width(value) {
    this.element.style.width = value + "px";
  },
  border(value) {
    this.element.style.border = value;
  },
  borderRadius(value) {
    this.element.style.borderRadius = value + "px";
  },
  fontFamily(value) {
    this.element.style.fontFamily = value;
  },
  fontSize(value) {
    this.element.style.fontSize = value + "px";
  },
};

function showCss() {
  const css = document.querySelector(".code");

  let text =
    "<span></span>" +
    btn.style.cssText.split("; ").join(";<span></span>") +
    "<span></span>";
  css.innerHTML = text;
}

const copy = document.querySelector(".copy");
copy.addEventListener("click", cpyToClipboard);

function cpyToClipboard() {
  const value = `.btn { \n\ ${document.querySelector(".code").innerText} \n\}`;
  console.log(value);
  navigator.clipboard.writeText(value);
}
