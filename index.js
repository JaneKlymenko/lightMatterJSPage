const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

const iEngine = Engine.create();
const iRunner = Runner.create();

const container = document.querySelector("#canvas-container");

const canvasWidth = container.clientWidth;
const canvasHeight = container.clientHeight;

const iRender = Render.create({
  element: container,
  engine: iEngine,
  options: {
    width: canvasWidth,
    height: canvasHeight,
    wireframes: false,
    background: "transparent",
    options: { wireframes: false },
  },
});

const ground = Bodies.rectangle(canvasWidth / 2, 480, canvasWidth, 20, {
  isStatic: true,
  render: {
    visible: false,
  },
});

const leftWall = Bodies.rectangle(0, canvasHeight / 2, 1, canvasHeight, {
  isStatic: true,
  render: {
    visible: false,
  },
});

const rightWall = Bodies.rectangle(
  canvasWidth,
  canvasHeight / 2,
  1,
  canvasHeight,
  {
    isStatic: true,
    render: {
      visible: false,
    },
  }
);

Composite.add(iEngine.world, [ground, leftWall, rightWall]);

Render.run(iRender);
Runner.run(iRunner, iEngine);

let sunflowers = [];
let flowers = [];
let leaves = [];

function clearWorld() {
  Composite.remove(iEngine.world, sunflowers);
  Composite.remove(iEngine.world, flowers);
  Composite.remove(iEngine.world, leaves);

  sunflowers = [];
  flowers = [];
  leaves = [];
}

function addSunflowers() {
  clearWorld();
  for (let i = 0; i < 60; i++) {
    let x = Math.random() * container.clientWidth;
    let y = -Math.random() * 80;
    let size = 50 + Math.random() * 20;
    const sunflower = Bodies.rectangle(x, y, size, size, {
      render: {
        sprite: {
          texture: "./img/sunflower.png",
          xScale: 0.5,
          yScale: 0.5,
        },
      },
    });
    sunflowers.push(sunflower);
    Composite.add(iEngine.world, sunflower);
  }
}

function addFlowers() {
  clearWorld();
  for (let i = 0; i < 60; i++) {
    let x = Math.random() * container.clientWidth;
    let y = -Math.random() * 200;
    let size = 50 + Math.random() * 20;
    const flower = Bodies.rectangle(x, y, size, size, {
      render: {
        sprite: {
          texture: "./img/flower.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });

    flowers.push(flower);
    Composite.add(iEngine.world, flower);
  }
}

function addLeaves() {
  clearWorld();
  for (let i = 0; i < 60; i++) {
    let x = Math.random() * container.clientWidth;
    let y = -Math.random() * 70;
    let size = 50 + Math.random() * 20;
    const leaf = Bodies.rectangle(x, y, size, size, {
      render: {
        sprite: {
          texture: "./img/leaf.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });
    leaves.push(leaf);
    Composite.add(iEngine.world, leaf);
  }
}

const buttons = {
  sunflowers: document.getElementById("sunflowers"),
  flowers: document.getElementById("flowers"),
  leaves: document.getElementById("leaves"),
};

Object.keys(buttons).forEach((key) => {
  const button = buttons[key];
  button.addEventListener("click", window[`add${capitalizeFirstLetter(key)}`]);
  button.addEventListener("click", () => toggleActive(button));
});

function toggleActive(activeButton) {
  Object.values(buttons).forEach((button) =>
    button.classList.toggle("active", button === activeButton)
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
