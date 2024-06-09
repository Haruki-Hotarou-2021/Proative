// EM DESENVOLVIMENTO


var _pauseEngine = false;

// Scenes
const SCENES = [];
class Scene {
  constructor() {
    this.objects = [];
    this.element = document.createElement("div");
    this.onRead = function() {};
    this.element.setAttribute("style", `
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
      background-color: #6495ED;
      opacity: 0;
      transition: opacity 1s;
    `);

    this.world = new p2.World({ gravity: [0, 5 * 150] });
    this.world.setGlobalStiffness(1e5);
    this.world.defaultContactMaterial.friction = 1;
    this.world.solver.iterations = 20;

    SCENES.push(this);
  }

  load() {
    if (this_scene) {
      document.body.removeChild(this_scene.element);
    }
    this_scene = this;
    document.body.appendChild(this.element);
    this.element.style.opacity = 1;
    this_scene = this;
    setTimeout(this.onRead);
  }

  update() {
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].update();
    }
  }
}
const main = new Scene();
let this_scene = undefined;

// Função assíncrona que pré carrega a tela
async function preloadScene(pageName) {
  try {
    const response = await fetch(`${pageName}.html`);
    if (response.ok) {
      console.log(`Preloaded: ${pageName}.html`);
    } else {
      console.error(`Failed to preload: ${pageName}.html`);
    }
  } catch (error) {
    console.error(`Preloading error: ${error.message}`);
  }
}

// Função para trocar de tela
function startScene(pageName) {
  window.location.href = `${pageName}.html`;
}

// Função para fechar a tela
function preventBack() {
  //window.close();
  // Prevent default back button behavior
  history.pushState(null, null, ""); // Update browser history without creating a new entry
  // Optionally, disable the back button (only works in some browsers)
  if (window.history.replaceState) {
    window.history.replaceState(null, null, ""); // Replace the current history entry
  }
}

// Função para salvar dados localmente
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Função para carregar dados salvos localmente
function load(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

