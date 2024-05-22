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

// Define o Título da página
function setTitle(title) {
  document.title = title;
}

// Define o favicon da página
function setFavicon(url) {
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = url;
  document.head.appendChild(link);
}

// Recarrega a página
function reload() {
  window.location.reload();
}

// Aguardar segundos e executar callback
function wait(seconds, callback) {
  if (isNaN(seconds) || seconds < 0) {
    console.error("O parâmetro 'seconds' deve ser um número não negativo");
    return; // Retorna undefined se o parâmetro 'seconds' for inválido
  }
  if (typeof callback !== 'function') {
    console.error("O parâmetro 'callback' deve ser uma função");
    return; // Retorna undefined se o parâmetro 'callback' não for uma função
  }
  setTimeout(() => {
    callback(); // Chama a função callback após o tempo de espera
  }, seconds * 1000);
}
