// Cria um retângulo verde preenchido
const right = new Rect(120, -100, 50, 50, 'green');

// Cria um retângulo vermelho com contorno
const left = new Rect(-120, -100, 50, 50, 'red',);

// Cria um sprite sem suavização de imagem
const player = new Spr(20, 100, 50, 50, '/Template/img/player.png');

// Loop do jogo
function TIC() {
  
  // Limpa a tela
  cls();
  
  // Desenha os objetos na tela
  player.display();
  right.display();
  left.display();
  
  // Exibe hm texto na tela
  print('Hey Devs!', player.x, player.y+10, 14, '#FFFFFF', 'center');
  
  // Executa a função move()
  move()
}


let speed = 1;

function move() {
  if (right.isPressed) {
    player.x += speed;
  }
  if (left.isPressed) {
    player.x -= speed;
  }
  /*
  if (btn(2)) {
    spr1.x -= speed;
  }
  if (btn(3)) {
    spr1.x += speed;
  }
  */
}