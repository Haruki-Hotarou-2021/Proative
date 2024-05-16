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
