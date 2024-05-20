// Cria um botão
class Btn {
  constructor(image, x = 0, y = 0, width = 50, height = 50, id = 'btn') {
    this.id = id;
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.top = 10;
    this.right = 10;
    this.bottom = 10;
    this.left = 10;
    this.isPressed = false;
  }
  
  display() {
    // Cria o elemento DOM do botão
    this.buttonElement = document.createElement('button');
    this.buttonElement.id = this.id.toString();
    this.buttonElement.style.width = this.width + 'px';
    this.buttonElement.style.height = this.height + 'px';
    this.buttonElement.style.position = 'fixed';
    this.buttonElement.style.left = `${(this.x+screen.width/2)-(this.width/2)}px`;
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
    this.isPressed = true;
    console.log(`Botão ${this.id} pressionado`);
  }
*/

  // Callback para o evento de touchstart
  onTouchStart() {
    this.isPressed = true;
    console.log(`Botão ${this.id} pressionado (touch)`);
  }

  // Callback para o evento de touchend
  onTouchEnd() {
    this.isPressed = false;
    console.log(`Botão ${this.id} solto (touch)`);
  }

  // Destrói o botão
  destroy() {
    mainElement.removeChild(this.buttonElement);
  }
}

const buttons = [];

let w = window.innerWidth;
let h = window.innerHeight;

const up = new Btn(undefined, w*-0.2, h*-0.2, 50, 50);
buttons.push(up);

const down = new Btn(undefined, w*-0.2, h*-0.4, 50, 50);
buttons.push(down);

const left = new Btn(undefined, w*-0.3, h*-0.3, 50, 50);
buttons.push(left);

const right = new Btn(undefined, w*-0.1, h*-0.3, 50, 50);
buttons.push(right);

const a = new Btn(undefined, 50, -150, 50, 50);
buttons.push(a);

const b = new Btn(undefined, 100, -100, 50, 50);
buttons.push(b);

const x = new Btn(undefined, 0, -100, 50, 50);
buttons.push(x);

const y = new Btn(undefined, 50, -50, 50, 50);
buttons.push(y);

function btn(id) {
  if (id < 0 || id > 7) {
    console.error(`Invalid button ID: ${id}`);
    return false;
  }
  const button = buttons[id];
  button.display();
  return button.isPressed;
}

/*
const groupX = w * -0.3; // Adjust X position for group placement
const groupY = h * -0.4; // Adjust Y position for group placement

const buttonGroup = document.createElement('div');
buttonGroup.style.position = 'absolute';
buttonGroup.style.left = `${groupX}px`;
buttonGroup.style.bottom = `${groupY}px`;

// Append buttons to the group element (optional)
buttons.forEach(button => buttonGroup.appendChild(button.buttonElement));
*/

let isKeyPressed = false; // Variable to track key press state

function keyPressed(keyToMonitor) {
  // Initialize a variable to track key press state
  let isKeyPressed = false;

  // Add event listeners for keydown and keyup events
  document.addEventListener('keydown', (event) => {
    if (event.key === keyToMonitor) {
      isKeyPressed = true;
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.key === keyToMonitor) {
      isKeyPressed = false;
    }
  });

  // Return the current key press state
  return isKeyPressed;
}


function pressKey(keyToSimulate) {
  // Simulate pressing the specified key
  const keyboardEventDown = new KeyboardEvent('keydown', {
    key: keyToSimulate,
    code: keyToSimulate.toUpperCase()
  });

  // Dispatch the keydown event to simulate the key press
  document.dispatchEvent(keyboardEventDown);

  // Set isKeyPressed to true to indicate key pressed
  isKeyPressed = true;
}

function releaseKey(keyToSimulate) {
  // Simulate releasing the specified key
  const keyboardEventUp = new KeyboardEvent('keyup', {
    key: keyToSimulate,
    code: keyToSimulate.toUpperCase()
  });

  // Dispatch the keyup event to simulate the key release
  document.dispatchEvent(keyboardEventUp);

  // Set isKeyPressed to false to indicate key released
  isKeyPressed = false;
}
