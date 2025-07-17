// 🕒 Contador de amor
const inicio = new Date("2024-05-17T00:00:00");
setInterval(() => {
  const ahora = new Date();
  const diff = ahora - inicio;
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = ahora.getHours();
  const minutos = ahora.getMinutes();
  const segundos = ahora.getSeconds();
  document.getElementById("contador").textContent =
    `Llevamos ${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos juntos 💞`;
}, 1000);

// 💬 Mensajes románticos
const mensajes = [
  "Eres mi persona favorita no sabes cuanto te amo y estoy muy orgulloso de ti, nunca dudes mi amorcito te amo eres mi princesa hermosa la unica te amo te amo te amo no me canzo de decirlo eres la mejor te mando muchos besitos mi chiquita hermosa FELIZ ANIVERSARIO MI NIÑA HERMOSA 😍🥰😘💖",
  "Gracias por cada momento juntos, me llenas de felicidad eres maravillosa nunca lo olvides brillas mas que todas eres mi amor preciado que quiero que siempre este a mi lado te amo mi amorcito FELIZ ANIVERSARIO MI NIÑA HERMOSA 😘❤️🌟",
  "Te amo más de lo que las palabras pueden decir no lo puedo demostrar quisas dia a dia pero eres la mujer que quiero para toda mi vida te amo no lo dudes y que quiero estar solo con vos mi amorcito te amo muchisimo FELIZ ANIVERSARIO MI NIÑA HERMOSA 😍💕💌"
];
function mostrarMensaje() {
  const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];
  document.getElementById("mensajeMostrado").textContent = "";
  let i = 0;
  const escribir = setInterval(() => {
    document.getElementById("mensajeMostrado").textContent += mensaje[i];
    i++;
    if (i >= mensaje.length) clearInterval(escribir);
  }, 50);
}

// 🧩 Rompecabezas
const container = document.getElementById("puzzle-container");
const mensajeFinal = document.getElementById("mensaje-final");
let piezas = [];

for (let i = 0; i < 9; i++) {
  const div = document.createElement("div");
  div.classList.add("pieza");
  div.setAttribute("draggable", true);
  div.dataset.pos = i;
  div.style.backgroundPosition = `${-(i % 3) * 100}px ${-Math.floor(i / 3) * 100}px`;
  piezas.push(div);
}

piezas.sort(() => Math.random() - 0.5);
piezas.forEach(p => container.appendChild(p));

let dragged;
container.addEventListener("dragstart", e => {
  dragged = e.target;
});
container.addEventListener("dragover", e => {
  e.preventDefault();
});
container.addEventListener("drop", e => {
  e.preventDefault();
  if (e.target.classList.contains("pieza")) {
    const from = dragged;
    const to = e.target;
    const temp = document.createElement("div");
    container.replaceChild(temp, from);
    container.replaceChild(from, to);
    container.replaceChild(to, temp);
    verificarPuzzle();
  }
});

function verificarPuzzle() {
  const piezasActuales = Array.from(container.children);
  const correcto = piezasActuales.every((pieza, index) => pieza.dataset.pos == index);
  if (correcto) {
    mensajeFinal.classList.remove("oculto");
    lanzarConfeti();
    new Audio("victoria.mp3").play(); // Asegúrate de tener este archivo
  }
}

// 🎁 Tarjetas interactivas
function voltear(elemento) {
  elemento.classList.toggle("volteada");
}

// 🎆 Fuegos artificiales
function lanzarFuegos() {
  const canvas = document.getElementById("fuegosCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const estrellas = [];
  for (let i = 0; i < 60; i++) {
    estrellas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.5
    });
  }

  let tiempo = 0;
  const animar = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    estrellas.forEach(e => {
      e.x += e.dx;
      e.y += e.dy;

      ctx.beginPath();
      ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 215, 0, ${e.opacity})`;
      ctx.shadowColor = "#ffffaa";
      ctx.shadowBlur = 10;
      ctx.fill();
    });

    tiempo++;
    if (tiempo < 300) {
      requestAnimationFrame(animar);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  animar();
}

// 🎉 Confeti adicional al completar el rompecabezas
function lanzarConfeti() {
  const canvas = document.getElementById("fuegosCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confeti = [];
  for (let i = 0; i < 100; i++) {
    confeti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 4,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      dx: (Math.random() - 0.5) * 2,
      dy: Math.random() * 2 + 1
    });
  }

  let frames = 0;
  const animarConfeti = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confeti.forEach(c => {
      c.x += c.dx;
      c.y += c.dy;
      ctx.fillStyle = c.color;
      ctx.fillRect(c.x, c.y, c.size, c.size);
    });

    frames++;
    if (frames < 200) {
      requestAnimationFrame(animarConfeti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  animarConfeti();
}

function responderSi() {
  document.getElementById("respuesta").textContent = "¡Sabía que aceptarias seguir compartiendo nuestras vidas mi amorcito! Te amo 💖";
}

// Botón "No" escurridizo
const btnNo = document.getElementById("btn-no");

function moverBotonNo() {
  const container = document.querySelector(".botones");
  const maxX = container.offsetWidth - btnNo.offsetWidth;
  const maxY = container.offsetHeight - btnNo.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  btnNo.style.left = `${randomX}px`;
  btnNo.style.top = `${randomY}px`;
}

btnNo.addEventListener("mouseenter", moverBotonNo); // PC
btnNo.addEventListener("touchstart", moverBotonNo); // móvil