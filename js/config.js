// Cria a tag main e configura o body
const screen = {}

const bodyElement = document.body;
bodyElement.style.width = '100vw';
bodyElement.style.height = '100vh';
bodyElement.style.overflow = 'hidden';
bodyElement.style.margin = '0';
bodyElement.style.padding = '0';
bodyElement.style.backgroundColor = '#42445A';

const mainElement = document.createElement('main');

mainElement.style.width = '2000px';
mainElement.style.height = '2000px';
mainElement.style.position = 'fixed';
mainElement.style.top = '50%';
mainElement.style.left = '50%';
mainElement.style.transform = 'translate(-50%, -50%)';
mainElement.style.overflow = 'hidden';
mainElement.style.backgroundColor = 'transparent';

document.body.appendChild(mainElement);


screen.width = mainElement.offsetWidth;
screen.height = mainElement.offsetHeight;

// Cria um novo estilo
const style = document.createElement('style');
style.type = 'text/css';