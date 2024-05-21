// Limpa a tela
function cls() {
  // Obtem todos os elementos filhos do body
  const bodyChildren = mainElement.childNodes;

  for (let i = bodyChildren.length - 1; i >= 0; i--) {
    // Remove cada elemento filho do body
    mainElement.removeChild(bodyChildren[i]);
  }
}

// Cria um novo script
function newScript(script) {
  const _newScript = document.createElement("script");
  _newScript.src = script;
  document.game-scripts.appendChild(_newScript);
}

function print(text, x, y, fontSize = 20, color = '#000', align = 'left', font = 'Arial') {
  let textX = x + screen.width / 2;
  let textY = y + screen.height / 2;

  // Cria um elemento de texto
  const textElement = document.createElement('p');
  textElement.textContent = text;

  // Define as propriedades do texto
  textElement.style.fontSize = `${fontSize}px`;
  textElement.style.color = color;
  textElement.style.position = 'fixed';
  textElement.style.left = `${textX}px`;
  textElement.style.bottom = `${textY}px`;
  textElement.style.textAlign = align;
  
  //if(font !== 'Arial') {

    // Função para checar a existência da fonte
    async function checkFont(font) {
      
      const fontFileURL = `./${font}.ttf`; 

      const fontFace = new FontFace(font, `url('${fontFileURL}')`);
      try {
        await fontFace.load();
        return true;
      } catch (error) {
        console.error(`Font '${font}' not found. Falling back to Arial.`);
        return false;
      }
    }


    // Checa a existência da fonte e aplica a fonte ao texto
    checkFont(font).then(fontExists => {
      if (fontExists) {
        textElement.style.fontFamily = font;
      } else {
        textElement.style.fontFamily = 'Arial';
      }
      
      // Adiciona o texto ao elemento do DOM
      mainElement.appendChild(textElement);
    });
  //} else {
    //mainElement.appendChild(textElement)
  //}

  // Retorna o elemento de texto
  return textElement;
}
