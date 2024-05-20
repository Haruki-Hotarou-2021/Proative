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


// CAMERA ------------------------------

// Cria uma camera
const camera = {
  x: 0,
  y: 0,
  width: 1,
  height: 1,
  rotation: 0,
  smooth: 1,

  // Função para seguir um objeto
  follow(targetObject) {
    // Calcular a posição alvo (considerando a posição e o offset do mainElement)
    let targetX = targetObject.x + mainElement.offsetLeft;
    let targetY = targetObject.y + mainElement.offsetTop;

    // Aplicar suavização à posição da câmera
    var dx = (targetX - this.x) * this.smooth;
    var dy = (targetY - this.y) * this.smooth;
    this.x += dx;
    this.y += dy;
    console.log('X: '+this.x, 'Y: '+this.y);
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

    } else {

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

    if (!this.smooth) {
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
  document.game - scripts.appendChild(_newScript);
}




function pontoDeFocoMovel(obj) {
  // Calculate the center of the screen relative to the mainElement
  const centerX = screen.width / 2 + mainElement.offsetLeft;
  const centerY = screen.height / 2 + mainElement.offsetTop;

  // Calculate the offset needed to center the object on the screen
  const offsetX = centerX - (obj.x + obj.width / 2);
  const offsetY = centerY - (obj.y + obj.height / 2);

  // Apply smoothing to the camera movement (optional)
  const smooth = camera.smooth;
  const dx = offsetX * smooth;
  const dy = offsetY * smooth;

  // Update the camera position with smoothing
  camera.x += dx;
  camera.y += dy;
/*
  // Clamp the camera position within the mainElement bounds (optional)
  camera.x = Math.max(0, Math.min(camera.x, mainElement.offsetWidth - screen.width));
  camera.y = Math.max(0, Math.min(camera.y, mainElement.offsetHeight - screen.height));
*/
  // Update the position of all displayed objects based on the camera movement
  for (const child of mainElement.children) {
    if (child.tagName === 'DIV') { // Assuming your objects are displayed as DIVs
      const objX = parseFloat(child.style.left) + screen.width / 2;
      const objY = parseFloat(child.style.bottom) + screen.height / 2;
      child.style.left = `${objX - camera.x}px`;
      child.style.bottom = `${objY - camera.y}px`;
    }
  }
}
