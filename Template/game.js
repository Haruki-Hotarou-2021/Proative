// Cria um retângulo verde preenchido
const rect1 = new Rect(0, 0, 50, 50, 'green');

// Cria um retângulo vermelho com contorno
const rect2 = new Rect(0, 0, 50, 50, 'red', 'stroke');

// Cria um sprite sem suavização de imagem
const spr1 = new Spr(20, 100, 50, 50, '/Template/img/player.png');

// Cria um sprite com suavização de imagem
const spr2 = new Spr(0, -50, 50, 50, 'img/player.png', true);

const button = new Btn('0', undefined, 100, 100, 50, 50);

// Loop do jogo
function TIC() {
  // Limpa a tela
  cls();
  // Desenha os objetos na tela
  rect1.display();
  rect2.display();
  spr1.display();
  //spr2.display();
  
  // Move os objetos
  //rect1.x += 1;
  rect2.y += 1;
  spr1.x -= 1;
  //pontoDeFocoMovel(rect1)
  
  button.display()
  move()
}

function move() {
  if (button.isPressed) {
    rect1.x += 1;
  }
}