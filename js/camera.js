// ATUALMENTE EM DESENVOLVIMENTO


// CAMERA ------------------------------
/*
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
*/




// Câmera (Funcional)


// Funções de câmera
let cameraTarget = null;
let cameraSmooth = 1;

function camera(target, smooth = 1) {
  cameraTarget = target;
  cameraSmooth = smooth;
}

// Loop de atualização da câmera
function updateCamera() {
  if (cameraTarget) {
    const targetX = cameraTarget.x;
    const targetY = cameraTarget.y;

    const offsetX = (targetX + screen.width / 2) / cameraSmooth;
    const offsetY = (-targetY + screen.height / 2) / cameraSmooth;

    mainElement.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
  } else {
    mainElement.style.transform = 'translate(-50%, -50%)';
  }
}