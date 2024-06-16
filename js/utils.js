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
  
function loadFont(font) {
  
  let url = font;
let fontName = url.split('/').pop().split('.')[0]; // Obtém o nome da fonte a partir da URL
let fontFace;

// Verifica se a URL termina com .ttf, .woff, .woff2, etc.
if (url.endsWith('.ttf')) {
  fontFace = `@font-face {
    font-family: '${fontName}';
    src: url('${url}') format('truetype');
  }`;
} else if (url.endsWith('.woff')) {
  fontFace = `@font-face {
    font-family: '${fontName}';
    src: url('${url}') format('woff');
  }`;
} else if (url.endsWith('.woff2')) {
  fontFace = `@font-face {
    font-family: '${fontName}';
    src: url('${url}') format('woff2');
  }`;
} // Adicione mais formatos conforme necessário

  
  /*
  // Define o conteúdo da regra @font-face com o nome da fonte passado como parâmetro
  let URL;

  if (!url) {
    URL = `${fontName}.ttf`;
  } else {
    URL = url;
  }
  
  let fontFace = '\
  @font-face {\
    font-family: "' + fontName + '";\
    src: url("' + URL + '") format("truetype")}'/*,\
    src: url("' + URL + '") format("opentype"),\
    src: url("' + URL + '") format("woff"),\
    src: url("' + URL + '") format("woff2"),\
  }'*/
  // Adiciona a regra @font-face ao estilo
  style.appendChild(document.createTextNode(fontFace));
  // Adiciona o estilo ao cabeçalho do documento
  document.head.appendChild(style);
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
