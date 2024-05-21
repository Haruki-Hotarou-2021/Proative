// EM DESENVOLVIMENTO


var _pauseEngine = false;

// Scenes
const SCENES = [];
class Scene {
  constructor() {
    this.objects = [];
    this.element = document.createElement("div");
    this.onRead = function() {};
    this.element.setAttribute("style", `
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
      background-color: #6495ED;
      opacity: 0;
      transition: opacity 1s;
    `);

    this.world = new p2.World({ gravity: [0, 5 * 150] });
    this.world.setGlobalStiffness(1e5);
    this.world.defaultContactMaterial.friction = 1;
    this.world.solver.iterations = 20;

    SCENES.push(this);
  }

  load() {
    if (this_scene) {
      document.body.removeChild(this_scene.element);
    }
    this_scene = this;
    document.body.appendChild(this.element);
    this.element.style.opacity = 1;
    this_scene = this;
    setTimeout(this.onRead);
  }

  update() {
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].update();
    }
  }
}
const main = new Scene();
let this_scene = undefined;