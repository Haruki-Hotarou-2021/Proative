// Limpa a tela
function cls() {
  // Get all child elements of the body
  const bodyChildren = mainElement.childNodes;

  // Iterate through the child elements in reverse order for efficient removal
  for (let i = bodyChildren.length - 1; i >= 0; i--) {
    // Remove each child element from the body
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

  // Create a text element
  const textElement = document.createElement('p');
  textElement.textContent = text;

  // Set text style properties
  textElement.style.fontSize = `${fontSize}px`;
  textElement.style.color = color;
  textElement.style.position = 'fixed';
  textElement.style.left = `${textX}px`;
  textElement.style.bottom = `${textY}px`;
  textElement.style.textAlign = align;
  
  //if(font !== 'Arial') {

    // Function to check font existence
    async function checkFont(font) {
      // Assuming font files are in the same directory (adjust path if needed)
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


    // Check font existence and apply if available
    checkFont(font).then(fontExists => {
      if (fontExists) {
        textElement.style.fontFamily = font;
      } else {
        textElement.style.fontFamily = 'Arial'; // Fallback font
      }
      // Append the text element to the DOM
      mainElement.appendChild(textElement);
    });
  //} else {
    //mainElement.appendChild(textElement)
  //}

  // Return the text element for further customization (optional)
  return textElement;
}
