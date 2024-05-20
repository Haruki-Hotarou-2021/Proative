// Cria um retângulo verde preenchido
const rect1 = new Rect(0, 0, 50, 50, 'green');

// Cria um retângulo vermelho com contorno
const rect2 = new Rect(0, 0, 50, 50, 'red', 'stroke');

// Cria um sprite sem suavização de imagem
const spr1 = new Spr(20, 100, 50, 50, '/Template/img/player.png');

// Cria um sprite com suavização de imagem
const spr2 = new Spr(0, -50, 50, 50, 'img/player.png', true);

//const button = new Btn('0', undefined, 100, 100, 50, 50);

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
  rect2.x = spr1.x;
  rect2.y = spr1.y;
  //spr1.x -= 1;
  //pontoDeFocoMovel(rect1)
  
  print('Hello, World!', 0, 0, 24, '#FFFFFF', 'center', 'latin_modern_mono');
  
  move()
}

let speed = 2;
function move() {
  if (btn(0)) {
    spr1.y += speed;
  }
  if (btn(1)) {
    spr1.y -= speed;
  }
  if (btn(2)) {
    spr1.x -= speed;
  }
  if (btn(3)) {
    spr1.x += speed;
  }
  
  
  if (btn(4)) {
    spr1.z -= speed;
  }
  if (btn(5)) {
    spr1.z += speed;
  }
  
  if (btn(6)) {
    rect1.x -= speed;
  }
  if (btn(7)) {
    rect1.y += speed;
  }
  
}