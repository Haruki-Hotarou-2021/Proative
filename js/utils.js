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