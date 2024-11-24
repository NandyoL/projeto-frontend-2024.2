////////// Carrossel ////////////
const container = document.querySelector(".container");
const containercarrossel = container.querySelector(".container-carrossel");
const carrossel = container.querySelector(".carrossel");
const carrosselItems = carrossel.querySelectorAll(".carrossel-item");

// Iniciamos variáveis que mudarão seu estado.
let rotateY = 0;  // Armazena o ângulo de rotação do carrossel

const createcarrossel = () => {
  const carrosselProps = onResize();
  const length = carrosselItems.length; // Quantidade de itens
  const degress = 360 / length; // Graus por item
  const gap = 20; // Espaço entre os itens
  const tz = distanceZ(carrosselProps.w, length, gap);

  const fov = calculateFov(carrosselProps);
  const height = calculateHeight(tz);

  container.style.width = tz * 2 + gap * length + "px";
  container.style.height = height + "px";

  carrosselItems.forEach((item, i) => {
    const degressByItem = degress * i + "deg";
    item.style.setProperty("--rotatey", degressByItem);
    item.style.setProperty("--tz", tz + "px");
  });
};

// Função que dá suavidade à animação
const lerp = (a, b, n) => {
  return n * (a - b) + b;
};

// https://3dtransforms.desandro.com/carousel
const distanceZ = (widthElement, length, gap) => {
  return widthElement / 2 / Math.tan(Math.PI / length) + gap; // Distância Z dos itens
};

// Calcula o alto do contêiner usando o campo de visão e a distância da perspectiva
const calculateHeight = (z) => {
  const t = Math.atan((90 * Math.PI) / 180 / 2);
  const height = t * 2 * z;

  return height;
};

// Calcula o campo de visão do carrossel
const calculateFov = (carrosselProps) => {
  const perspective = window
    .getComputedStyle(containercarrossel)
    .perspective.split("px")[0];

  const length =
    Math.sqrt(carrosselProps.w * carrosselProps.w) +
    Math.sqrt(carrosselProps.h * carrosselProps.h);
  const fov = 2 * Math.atan(length / (2 * perspective)) * (180 / Math.PI);
  return fov;
};

// Função de rotação automática
const autoRotate = () => {
  rotateY -= 0.2;  // Define a velocidade da rotação (ajuste esse valor para acelerar ou desacelerar)
  carrossel.style.setProperty("--rotatey", rotateY + "deg");
  requestAnimationFrame(autoRotate);  // Animação contínua
};

// Função chamada na redimensionamento da tela
const onResize = () => {
  const boundingcarrossel = containercarrossel.getBoundingClientRect();

  const carrosselProps = {
    w: boundingcarrossel.width,
    h: boundingcarrossel.height,
  };

  return carrosselProps;
};

const initEvents = () => {
  window.addEventListener("resize", createcarrossel);
  createcarrossel();
  update();
  autoRotate();  // Inicia a rotação automática
};

// Função para atualizar constantemente
const update = () => {
  requestAnimationFrame(update);
};

// Inicializa os eventos e a rotação
initEvents();
