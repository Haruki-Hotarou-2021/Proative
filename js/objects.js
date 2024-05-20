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
    rectElement.addEventListener('click', this.onClick.bind(this));
    rectElement.addEventListener('touchstart', this.onTouchStart.bind(this));
    rectElement.addEventListener('touchend', this.onTouchEnd.bind(this));
    
    mainElement.appendChild(rectElement);
    
  }
  
    // Callback para o evento de clique
  onClick() {
    this.isPressed = true;
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
    this.spriteElement.addEventListener('click', this.onClick.bind(this));
    this.spriteElement.addEventListener('touchstart', this.onTouchStart.bind(this));
    this.spriteElement.addEventListener('touchend', this.onTouchEnd.bind(this));

    // Adicionar sprite ao DOM
    mainElement.appendChild(this.spriteElement);
  }
  

  // Callback para o evento de clique
  onClick() {
    this.isPressed = true;
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


class Btn {
  constructor(id, image, x = 0, y = 0, width = 50, height = 50) {
    this.id = id;
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
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

  // Destrói o botão do DOM
  destroy() {
    mainElement.removeChild(this.buttonElement);
  }
}
