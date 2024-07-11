// Carrega a fonte
//loadFont('/Template/fonts/PrStart.ttf');

// Cria um retângulo verde preenchido
const right = new Rect(120, -100, 50, 50, 'green');

// Cria um retângulo vermelho com contorno
const left = new Rect(-120, -100, 50, 50, 'red',);

// Cria um sprite sem suavização de imagem
const player = new Spr(0, 100, 50, 50, '/Template/img/player.png');
camera(player)


// Loop do jogo
function TIC() {
  
  // Limpa a tela
  cls();
  
  // Desenha os objetos na tela
  player.display();
  right.display();
  left.display();
  

  // Exibe hm texto na tela
  //const txt = new Text('Hey Devs!', player.x, player.y+30, 'PrStart');
  //txt.color = '#FFFFFF';
  
  
  // Executa a função move()
  move()
}


let speed = 2;

function move() {
  if (right.isPressed) {
    player.x += speed;
  } else if (left.isPressed) {
    player.x -= speed;
  }
  if (player.isPressed) {
    startScene('gameActivity')
  }
}

