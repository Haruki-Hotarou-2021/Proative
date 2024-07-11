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
      
    }else{
      
      rectElement.style.border = `${this.borderSize}px solid ${this.color}`;
      rectElement.style.width = `${this.width-2}px`;
      rectElement.style.height = `${this.height-2}px`;
      rectElement.style.backgroundColor = 'transparent';
    }
    
    // Adiciona eventos de clique e touch para o retângulo
    rectElement.addEventListener('touchstart', this.onTouchStart.bind(this));
    rectElement.addEventListener('touchend', this.onTouchEnd.bind(this));
    
    mainElement.appendChild(rectElement);
    
  }

  // Callback para o evento de touchstart
  onTouchStart() {
    this.isPressed = true;
  }

  // Callback para o evento de touchend
  onTouchEnd() {
    this.isPressed = false;
  }
  
   // Destrói o retângulo
  destroy() {
    mainElement.removeChild(this.rectElement);
  }
}
function rect(x = 0, y = 0, height = 50, width = 50, color = 'black', fill = 'fill') {
  let rect = new Rect(x, y, height,width, color, fill);
  rect.display();
  return rect;
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

    // Adiciona eventos de clique e touch para o sprite
    this.spriteElement.addEventListener('touchstart', this.onTouchStart.bind(this));
    this.spriteElement.addEventListener('touchend', this.onTouchEnd.bind(this));

    // Adicionar sprite ao DOM
    mainElement.appendChild(this.spriteElement);
  }

  // Callback para o evento de touchstart
  onTouchStart() {
    this.isPressed = true;
  }

  // Callback para o evento de touchend
  onTouchEnd() {
    this.isPressed = false;
  }
  
  // Destrói o sprite
  destroy() {
    mainElement.removeChild(this.spriteElement);
  }
}
function spr(x = 0, y = 0, width = 50, height = 50, img, smooth = false) {
  let spr = new Spr(x, y, width, height, img, smooth);
  spr.display();
  return spr;
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

function loadFont(font) {
  
  let url = font;
let fontName = url.split('/').pop().split('.')[0]; // Obtém o nome da fonte a partir da URL
let fontFace;

// Verifica se a URL termina com .ttf, .woff, .woff2, etc.
if (url.endsWith('.ttf')) {
  fontFace = `@font-face {
    font-family: '${fontName}';
    src: url('${url}') format('truetype');
  }`;
} else if (url.endsWith('.woff')) {
  fontFace = `@font-face {
    font-family: '${fontName}';
    src: url('${url}') format('woff');
  }`;
} else if (url.endsWith('.woff2')) {
  fontFace = `@font-face {
    font-family: '${fontName}';
    src: url('${url}') format('woff2');
  }`;
}

  // Adiciona a regra @font-face ao estilo
  style.appendChild(document.createTextNode(fontFace));
  // Adiciona o estilo ao cabeçalho do documento
  document.head.appendChild(style);


function print(text, x, y, fontSize = 20, color = '#000', align = 'center') {
  
  // Cria um elemento de texto
  const textElement = document.createElement('p');
  textElement.textContent = text;
  
  // Define as propriedades do texto
  textElement.style.fontSize = `${fontSize}px`;
  textElement.style.color = color;
  textElement.style.position = 'fixed';
  
  // Adiciona o texto ao elemento do DOM
  mainElement.appendChild(textElement);
  
  // Calcula o tamanho do texto
  const textMetrics = textElement.getBoundingClientRect();
  const textWidth = textMetrics.width;
  const textHeight = textMetrics.height;
  
  // Define a origem do texto
  let centerX = screen.width / 2;
  let centerY = screen.height / 2;
  let textX = x;
  if (align == 'right') {
      textX = x + centerX;
  } else if (align == 'left') {
      textX = (x - textWidth) + centerX;
  } else {
      textX = (x - textWidth / 2) + centerX;
  }
  
  // Define a posição vertical do texto
  let textY = (y - textHeight) + centerY;
  
  // Define a posição do texto
  textElement.style.left = `${textX}px`;
  textElement.style.bottom = `${textY}px`;
  
  // Retorna o elemento de texto
  return textElement;
}


// Funções de câmera
let cameraTarget = null;
let cameraSmooth = 1;

function camera(target, smooth = 1) {
  cameraTarget = target;
  cameraSmooth = smooth;
}

// Posições atuais da câmera
let currentOffsetX = 0;
let currentOffsetY = 0;

// Loop de atualização da câmera
function updateCamera() {
  if (cameraTarget) {
    const targetX = -cameraTarget.x;
    const targetY = cameraTarget.y;

    const desiredOffsetX = targetX - screen.width / 2;
    const desiredOffsetY = targetY - screen.height / 2;

    // Ajuste suave da posição atual
    currentOffsetX += (desiredOffsetX - currentOffsetX) / cameraSmooth;
    currentOffsetY += (desiredOffsetY - currentOffsetY) / cameraSmooth;

    mainElement.style.transform = `translate(${currentOffsetX}px, ${currentOffsetY}px)`;
  } else {
    mainElement.style.transform = 'translate(-50%, -50%)';
  }
}


// LOOP --------------------------------

let loop = `
    function update() {
        let lastTime = 0;
        function loop(timestamp) {
          const dt = timestamp - lastTime;
          if (typeof TIC === 'function') {
            TIC(dt);
          }
          updateCamera();
          lastTime = timestamp;
          requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
      }
      update();
  `;

// Cria um novo elemento <script>
let scpt = document.createElement('script');

// Atribui o código JavaScript à propriedade textContent do novo elemento <script>
scpt.textContent = loop;

// Seleciona o elemento body
let body = document.querySelector('body');

// Adiciona o novo elemento <script> como um nó irmão do elemento body
document.body.parentNode.insertBefore(scpt, document.body.nextSibling);