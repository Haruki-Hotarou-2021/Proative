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
    /*
    rectElement.addEventListener('click', this.onClick.bind(this));
    */
    rectElement.addEventListener('touchstart', this.onTouchStart.bind(this));
    rectElement.addEventListener('touchend', this.onTouchEnd.bind(this));
    
    mainElement.appendChild(rectElement);
    
  }
  
  /*
    // Callback para o evento de clique
  onClick() {
    this.isPressed = true;
  }
  */

  // Callback para o evento de touchstart
  onTouchStart(callback) {
    this.isPressed = true;
    if (typeof callback == 'function') {
      callback();
    }
  }

  // Callback para o evento de touchend
  onTouchEnd(callback) {
    this.isPressed = false;
    if (typeof callback == 'function') {
      callback();
    }
  }
  
   // Destrói o retângulo
  destroy() {
    mainElement.removeChild(this.rectElement);
  }
}
function rect(x = 0, y = 0, height = 50, width = 50, color = 'black', fill = 'fill') {
  let _rect = new Rect(x, y, height,width, color, fill);
  _rect.display();
  return _rect;
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
    /*
    this.spriteElement.addEventListener('click', this.onClick.bind(this));
    */
    this.spriteElement.addEventListener('touchstart', this.onTouchStart.bind(this));
    this.spriteElement.addEventListener('touchend', this.onTouchEnd.bind(this));

    // Adicionar sprite ao DOM
    mainElement.appendChild(this.spriteElement);
  }
  
/*
  // Callback para o evento de clique
  onClick() {
    this.isPressed = true;
  }
*/
  // Callback para o evento de touchstart
  onTouchStart(callback) {
    this.isPressed = true;
    if (typeof callback == 'function') {
      callback();
    }
  }

  // Callback para o evento de touchend
  onTouchEnd(callback) {
    this.isPressed = false;
    if(typeof callback == 'function'){
      callback();
    }
  }
  
  // Destrói o sprite
  destroy() {
    mainElement.removeChild(this.spriteElement);
  }
}
function spr(x = 0, y = 0, width = 50, height = 50, img, smooth = false) {
  let _spr = new Spr(x, y, width, height, img, smooth);
  _spr.display();
  return _spr;
}

class Text {
  constructor(text = '', x = 0, y = 0, font = 'Arial') {
    this.text = text;
    this.x = x;
    this.y = y;
    this.font = font;
    this.align = 'center';
    this.size = 20;
    this.color = '#fff';
  }
  
  display() {
    // Cria um elemento de texto
    this.textElement = document.createElement('p');
    this.textElement.textContent = this.text;
    // Define as propriedades do texto
    this.textElement.style.fontSize = `${this.size}px`;
    this.textElement.style.fontFamily = this.font;
    this.textElement.style.color = this.color;
    this.textElement.style.position = 'fixed';
    // Adiciona o texto ao elemento do DOM
    mainElement.appendChild(this.textElement);
    // Calcula o tamanho do texto
    const textMetrics = this.textElement.getBoundingClientRect();
    const textWidth = textMetrics.width;
    const textHeight = textMetrics.height;
    // Define a origem do texto
    let centerX = screen.width / 2;
    let centerY = screen.height / 2;
    let textX = this.x;
    if (this.align == 'right') {
      textX = this.x + centerX;
    } else if (this.align == 'left') {
      textX = (this.x - textWidth) + centerX;
    } else {
      textX = (this.x - textWidth / 2) + centerX;
    }
    // Define a posição vertical do texto
    let textY = (this.y - textHeight) + centerY;
    // Define a posição do texto
    this.textElement.style.left = `${textX}px`;
    this.textElement.style.bottom = `${textY}px`;
  }
  destroy() {
    mainElement.removeChild(this.textElement);
  }
}
function print(text = '', x = 0, y = 0, font = 'Arial', fontSize = 20, color = '#000', align = 'center') {
  let _text = new Text(text, x, y, font);
  _text.color = color;
  _text.size = fontSize;
  _text.align = align;
  _text.display();
  return _text;
}