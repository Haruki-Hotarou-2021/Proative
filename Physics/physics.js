// physics.js
class PhysicsEngine {
  constructor() {
    this.engine = Matter.Engine.create();
    this.world = this.engine.world;
    this.runner = Matter.Runner.create();
    this.renderer = Matter.Render.create({
      element: document.body,
      engine: this.engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false
      }
    });

    Matter.Runner.run(this.runner, this.engine);
    Matter.Render.run(this.renderer);
  }

  setGravity(gravity = 1) {
    this.world.gravity.y = gravity;
  }

  addBody(body) {
    Matter.World.add(this.world, body);
  }
}

const physicsEngine = new PhysicsEngine();

class Spr {
  constructor(x = 0, y = 0, width = 50, height = 50, img, smooth = false) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.width = width;
    this.height = height;
    this.img = img;
    this.smooth = smooth;
    this.isPressed = false;
  }

  display(state = 'show') {
    // Criar elemento DOM para o sprite
    this.spriteElement = document.createElement('img');
    this.spriteElement.src = this.img;
    this.spriteElement.style.position = 'fixed';
    this.spriteElement.style.zIndex = this.z;
    this.spriteElement.style.width = this.width + 'px';
    this.spriteElement.style.height = this.height + 'px';
    this.spriteElement.style.left = `${(this.x + window.innerWidth / 2) - (this.width / 2)}px`;
    this.spriteElement.style.bottom = `${(this.y + window.innerHeight / 2) - (this.height / 2)}px`;

    if (!this.smooth) {
      this.spriteElement.style.imageRendering = 'pixelated';
    }

    // Adiciona eventos de clique e touch para o sprite
    this.spriteElement.addEventListener('touchstart', this.onTouchStart.bind(this));
    this.spriteElement.addEventListener('touchend', this.onTouchEnd.bind(this));

    // Adicionar sprite ao DOM
    document.body.appendChild(this.spriteElement);

    if (state == 'hide') {
      this.spriteElement.style.visibility = 'hidden';
    } else {
      this.spriteElement.style.visibility = 'visible';
    }
  }

  onTouchStart(callback) {
    this.isPressed = true;
    if (typeof callback === 'function') {
      callback();
    }
  }

  onTouchEnd(callback) {
    this.isPressed = false;
    if (typeof callback === 'function') {
      callback();
    }
  }

  destroy() {
    document.body.removeChild(this.spriteElement);
  }

  rigidBody(type = 'dynamic') {
    const options = {
      isStatic: type === 'static',
      friction: 0.1,
      restitution: 0.6
    };

    this.body = Matter.Bodies.rectangle(this.x, this.y, this.width, this.height, options);
    physicsEngine.addBody(this.body);
  }
}

function setGravity(gravity) {
  physicsEngine.setGravity(gravity);
}


