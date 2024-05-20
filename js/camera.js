// CAMERA ------------------------------

// Cria uma camera
const camera = {
  x: 0,
  y: 0,
  width: 1,
  height: 1,
  rotation: 0,
  smooth: 1,

  // Função para seguir um objeto
  follow(targetObject) {
    // Calcular a posição alvo (considerando a posição e o offset do mainElement)
    let targetX = targetObject.x + mainElement.offsetLeft;
    let targetY = targetObject.y + mainElement.offsetBottom;

    // Aplicar suavização à posição da câmera
    var dx = (targetX - this.x) * this.smooth;
    var dy = (targetY - this.y) * this.smooth;
    this.x += dx;
    this.y += dy;
  }
};
