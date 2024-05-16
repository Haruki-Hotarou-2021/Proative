// CONFIG ------------------------------

// Cria a tag main e configura o body
const screen = {}

const bodyElement = document.body;
bodyElement.style.width = '100vw';
bodyElement.style.height = '100vh';
bodyElement.style.overflow = 'hidden';
bodyElement.style.margin = '0';
bodyElement.style.padding = '0';
bodyElement.style.backgroundColor = '#42445A';

const mainElement = document.createElement('main');

mainElement.style.width = '2000px';
mainElement.style.height = '2000px';
mainElement.style.position = 'fixed';
mainElement.style.top = '50%';
mainElement.style.left = '50%';
mainElement.style.transform = 'translate(-50%, -50%)';
mainElement.style.overflow = 'hidden';
mainElement.style.backgroundColor = 'transparent';

document.body.appendChild(mainElement);


screen.width = mainElement.offsetWidth;
screen.height = mainElement.offsetHeight;


// SCENES ------------------------------

var _pauseEngine = false;

// Cria uma cena
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


// CAMERA ------------------------------

// Cria uma camera
const camera = {
  x: 0,
  y: 0,
  width: 1,
  height: 1,
  rotation: 0,
  follow: undefined,
  smooth: 1,
  update() {
    if (this.follow.body) {
      var targetX = this.follow.body.position[0];
      var targetY = this.follow.body.position[1];
      var dx = (targetX - this.x) * this.smooth;
      var dy = (targetY - this.y) * this.smooth;
      this.x += dx;
      this.y += dy;
    } else {
      var targetX = this.follow.x;
      var targetY = this.follow.y;
      var dx = (targetX - this.x) * this.smooth;
      var dy = (targetY - this.y) * this.smooth;
      this.x += dx;
      this.y += dy;
    }
  }
};


// OBJECTS -----------------------------

// Cria um retângulo
class Rect {
  constructor(x = 0, y = 0, height = 50, width = 50, color = 'black', fill = 'fill') {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.width = width;
    this.height = height;
    this.borderSize = 1;
    this.color = color;
    this.fill = fill; // 'fill' ou 'stroke'
  }

  display() {
    const rectElement = document.createElement('div');
    rectElement.style.position = 'fixed';
    rectElement.style.zIndex = this.z;
    rectElement.style.left = `${(this.x+screen.width/2)-(this.width/2)}px`;
    rectElement.style.bottom = `${(this.y+screen.height/2)-(this.height/2)}px`;
    
    if (this.fill !== 'stroke') {
      rectElement.style.width = this.width + 'px';
      rectElement.style.height = this.height + 'px';
      rectElement.style.backgroundColor = this.color;
      
    }else{
      
      rectElement.style.border = `${this.borderSize}px solid ${this.color}`;
      rectElement.style.width = `${this.width-2}px`;
      rectElement.style.height = `${this.height-2}px`;
      rectElement.style.backgroundColor = 'transparent';
    }
    
    mainElement.appendChild(rectElement);
    
  }
  
   // Destrói o retângulo
  destroy() {
    mainElement.removeChild(this.rectElement);
  }
  /*
  onTouchStart(callback) {
    this.rectElement.addEventListener('touchstart', callback);
    */
    
    /*
    this.rectElement.addEventListener('touchstart', this.onTouchStart.bind(this));
    
    this.isDragging = true; // Indica se o retângulo está sendo arrastado
    this.startX = event.touches[0].clientX; // Posição inicial X do toque
    this.startY = event.touches[0].clientY; // Posição inicial Y do toque
    */
  //}
  /*
  onTouchMove(event) {
    this.rectElement.addEventListener('touchmove', this.onTouchMove.bind(this));
    
    if (!this.isDragging) return; // Retorna se não estiver arrastando

    const currentX = event.touches[0].clientX; // Posição X atual do toque
    const currentY = event.touches[0].clientY; // Posição Y atual do toque

    // Calcular nova posição do retângulo
    const deltaX = currentX - this.startX;
    const deltaY = currentY - this.startY;

    this.x += deltaX;
    this.y += deltaY;

    // Atualizar a posição do elemento DOM
    this.rectElement.style.left = `${this.x}px`;
    this.rectElement.style.bottom = `${this.y}px`;

    // Atualizar valores iniciais para o próximo movimento
    this.startX = currentX;
    this.startY = currentY;
  }

  onTouchEnd(event) {
    this.rectElement.addEventListener('touchend', this.onTouchEnd.bind(this));
    
    this.isDragging = false; // Indica que o arrasto terminou
  }
*/
}

// Cria um sprite
class Spr {
  constructor(x = 0, y = 0, width = 50, height = 50, img, smooth = false) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.width = width;
    this.height = height;
    this.img = img;
    this.smooth = smooth;
  }
  
  display() {
    // Criar elemento DOM para o sprite
    this.spriteElement = document.createElement('img');
    this.spriteElement.src = this.img;
    this.spriteElement.style.position = 'fixed';
    this.spriteElement.style.zIndex = this.z;
    this.spriteElement.style.width = this.width + 'px';
    this.spriteElement.style.height = this.height + 'px';
    this.spriteElement.style.left = `${(this.x+screen.width/2)-(this.width/2)}px`;
    this.spriteElement.style.bottom = `${(this.y+screen.height/2)-(this.height/2)}px`;
    
    if(!this.smooth) {
      // Aplica as propriedades de renderização da imagem
      this.spriteElement.style.imageRendering = 'pixelated'; 
      //this.spriteElement.style.imageRendering = '-moz-crisp-edges';
      //this.spriteElement.style.imageRendering = '-o-pixelated';
      //this.spriteElement.style.imageRendering = '-webkit-optimize-contrast';
      //this.spriteElement.style.imageRendering = 'crisp-edges';
    }

    // Adicionar sprite ao DOM
    mainElement.appendChild(this.spriteElement);
  }
  
  // Destrói o sprite
  destroy() {
    mainElement.removeChild(this.spriteElement);
  }
}


// FUNCTIONS UTILS ---------------------

// Limpa a tela
function cls() {
  // Get all child elements of the body
  const bodyChildren = mainElement.childNodes;

  // Iterate through the child elements in reverse order for efficient removal
  for (let i = bodyChildren.length - 1; i >= 0; i--) {
    // Remove each child element from the body
    mainElement.removeChild(bodyChildren[i]);
  }
}

// Cria um novo script
function newScript(script) {
  const _newScript = document.createElement("script");
  _newScript.src = script;
  document.game-scripts.appendChild(_newScript);
}