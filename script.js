const form = document.querySelector("#buttonCreator");
const btn = document.querySelector(".btn");
const rangeInputs = document.querySelectorAll('input[type="range"]');
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

//Adiciona o comportamento do background dos inputs do tipo range
rangeInputs.forEach((input) => {
  input.addEventListener("input", handleInputChange);
  input.style.backgroundSize =
    ((localStorage[input.id] - input.min) * 100) / (input.max - input.min) +
    "% 100%";
});
//Adiciona o comportamento de modificar o estilo do botão através do menu e exibir o código
form.addEventListener("change", handleChange);
//Adiciona o comportamento de copiar o código através do ícone
const copy = document.querySelector(".copy");
copy.addEventListener("click", cpyToClipboard);
//Atualiza os valores com base no conteúdo do localStorage
setValues();

function handleChange(event) {
  const name = event.target.name;
  const value = event.target.value;

  handleStyle[name](value);
  saveValue(name, value);
  showCss();
}

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

function showCss() {
  const css = document.querySelector(".code");

  let text =
    "<span></span>" +
    btn.style.cssText.split("; ").join(";<span></span>") +
    "<span></span>";
  css.innerHTML = text;
}

function cpyToClipboard() {
  const value = `.btn { \n\ ${document.querySelector(".code").innerText} \n\}`;
  console.log(value);
  navigator.clipboard.writeText(value);
}

function saveValue(name, value) {
  localStorage[name] = value;
}

function setValues() {
  const properties = Object.keys(localStorage);
  if (properties) {
    properties.forEach((propertie) => {
      handleStyle[propertie](localStorage[propertie]);
      form.elements[propertie].value = localStorage[propertie];
      showCss;
    });
  }
}
