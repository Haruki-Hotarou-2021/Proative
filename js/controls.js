// Cria um botão
class Btn {
  constructor(image, x = 0, y = 0, width = 50, height = 50, align = 'left') {
    this.image = image;
    this.x = x;
    this.y = y;
    this.z = 9999999999999;
    this.width = width;
    this.height = height;
    this.insert = align;
    this.isPressed = false;
  }
  
  display() {
    // Cria o elemento DOM do botão
    this.buttonElement = document.createElement('button');
    this.buttonElement.style.zIndex = this.z;
    this.buttonElement.style.width = this.width + 'px';
    this.buttonElement.style.height = this.height + 'px';
    this.buttonElement.style.position = 'fixed';
    this.buttonElement.style.margin = this.margin;
    
    if(this.insert == 'left') {
      this.buttonElement.style.left = `${(this.x+screen.width/2)-(this.width/2)}px`;
    } else if (this.insert == 'right') {
      this.buttonElement.style.right = `${(this.x+screen.width/2)-(this.width/2)}px`
    }
    this.buttonElement.style.bottom = `${(this.y+screen.height/2)-(this.height/2)}px`;
    this.buttonElement.style.cursor = 'pointer';
    this.buttonElement.style.backgroundImage = `url(${this.image})`;
    this.buttonElement.style.backgroundSize = 'cover';
    this.buttonElement.style.border = 'none';

    // Adiciona eventos de clique e touch para o botão
    //this.buttonElement.addEventListener('click', this.onClick.bind(this));
    this.buttonElement.addEventListener('touchstart', this.onTouchStart.bind(this));
    this.buttonElement.addEventListener('touchend', this.onTouchEnd.bind(this));

    // Adiciona o botão ao DOM
    mainElement.appendChild(this.buttonElement);
  }

  /*
  // Callback para o evento de clique
  onClick() {
    this.isClicked = true;
  }
  */

  // Callback para o evento de touchstart
  onTouchStart() {
    this.isPressed = true;
  }

  // Callback para o evento de touchend
  onTouchEnd() {
    this.isPressed = false;
  }

  // Destrói o botão
  destroy() {
    mainElement.removeChild(this.buttonElement);
  }
}

// Array que armazena os botões do gamepad
const buttons = [];

// Largura e altura da tela
let w = window.innerWidth;
let h = window.innerHeight;

// Posiciona cada botão e adiciona a array buttons
const _up_ = new Btn(undefined, w*-0.2, h*-0.2, 50, 50);
buttons.push(_up_);

const _down_ = new Btn(undefined, w*-0.2, h*-0.4, 50, 50);
buttons.push(_down_);

const _left_ = new Btn(undefined, w*-0.3, h*-0.3, 50, 50);
buttons.push(_left_);

const _right_ = new Btn(undefined, w*-0.1, h*-0.3, 50, 50);
buttons.push(_right_);

const _a_ = new Btn(undefined, 50, -150, 50, 50);
buttons.push(_a_);

const _b_ = new Btn(undefined, 100, -100, 50, 50);
buttons.push(_b_);

const _x_ = new Btn(undefined, 0, -100, 50, 50);
buttons.push(_x_);

const _y_ = new Btn(undefined, 50, -50, 50, 50);
buttons.push(_y_);

// Função que detecta toque em cada botao do gamepad (Retorna true ou false)
function btn(id) {
  if (id < 0 || id > 7) {
    console.error(`Invalid button ID: ${id}`);
    return false;
  }
  const _button = buttons[id];
  _button.display();
  return button.isPressed;
}


// Variável de estado de pressão da tecla
let isKeyPressed = false;

// função que detecta a tecla pressionada
function keyPressed(keyToMonitor) {
  
  let isKeyPressed = false;

  // Adiciona o evento para detectar se a tecla foi pressionada
  document.addEventListener('keydown', (event) => {
    if (event.key === keyToMonitor) {
      isKeyPressed = true;
    }
  });

  // Adiciona o evento para detectar se a tecla deixou de ser pressionada
  document.addEventListener('keyup', (event) => {
    if (event.key === keyToMonitor) {
      isKeyPressed = false;
    }
  });

  // Retorna o estado atual da tecla
  return isKeyPressed;
}


function pressKey(keyToSimulate) {
  
  const keyboardEventDown = new KeyboardEvent('keydown', {
    key: keyToSimulate,
    code: keyToSimulate.toUpperCase()
  });

  document.dispatchEvent(keyboardEventDown);

  isKeyPressed = true;
}

function releaseKey(keyToSimulate) {
  
  const keyboardEventUp = new KeyboardEvent('keyup', {
    key: keyToSimulate,
    code: keyToSimulate.toUpperCase()
  });

  document.dispatchEvent(keyboardEventUp);

  isKeyPressed = false;
}
