import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';

import { TransformControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/TransformControls.js';

let w = window.innerWidth,
    h = window.innerHeight;
let renderer, section, scene, camera, light, aLight;
let shapesScene, shapesCamera, shapesLight, shapesALight, currentObj, lastPosition;

renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(w, h);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x333333, 1);

section = document.querySelector("section");
section.appendChild(renderer.domElement);

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 30000);
camera.position.set(-1000, 1000, -2300);
camera.lookAt(scene.position);

light = new THREE.HemisphereLight(0xffffff, 0x000000, .8);
aLight = new THREE.AmbientLight(0x777777, 1);
scene.add(light);
scene.add(aLight);

//separate scene / camera for the shapes at the bottom of the screen
//need this so they won't move with the orbit control on the main scene / camera
shapesScene = new THREE.Scene();
shapesCamera = new THREE.PerspectiveCamera(50, w / h, 0.1, 30000);
shapesCamera.position.set(0, 0, -5000);
shapesCamera.lookAt(shapesScene.position);

shapesLight = new THREE.HemisphereLight(0xffffff, 0x000000, .8);
shapesALight = new THREE.AmbientLight(0x777777, 1);
shapesScene.add(shapesLight);
shapesScene.add(shapesALight);

//make the helper grids for the play area
const makeBoxGrid = (size, segments, color1, color2, x, y, z, rX, rY, rZ) => {
    const grid = new THREE.GridHelper(size, segments, color1, color2);
    grid.position.set(x, y, z);
    grid.rotation.x = rX;
    grid.rotation.y = rY;
    grid.rotation.z = rZ;

    scene.add(grid);
    return grid;
};
let deg90 = Math.PI / 2;
makeBoxGrid(1000, 10, 0x777777, 0x777777, 50, -50, 50, 0, 0, 0);
makeBoxGrid(1000, 10, 0x777777, 0x777777, 50, 450, 550, 0, deg90, deg90);
makeBoxGrid(1000, 10, 0x777777, 0x777777, 550, 450, 50, 0, 0, deg90);

//create a single cube - these become the children of each shape
const createBox = (x, y, z, c, w = 100, h = 100, d = 100) => {
    const g = new THREE.BoxBufferGeometry(w, h, d);
    g.center();
    const m = new THREE.MeshLambertMaterial({ color: c });
    const box = new THREE.Mesh(g, m);
    box.position.set(x, y, z);
    return box;
}

//create the locators that show up on each helper grid 
//J, L, S, T, Z shapes need a group of 2 rectangles on the XY plane
const createBoxLoc = (w, h, d, x, y, z, c, second = false, w2, h2, d2, x2, y2, z2) => {
    const g = new THREE.BoxBufferGeometry(w, h, d);
    const m = new THREE.MeshBasicMaterial({ color: c });
    const box = new THREE.Mesh(g, m);
    box.position.set(x, y, z);
    if (second) {
        const g2 = new THREE.BoxBufferGeometry(w2, h2, d2);
        const m2 = new THREE.MeshBasicMaterial({ color: c });
        const box2 = new THREE.Mesh(g2, m2);
        box2.position.set(x2, y2, z2);
        box.add(box2);
    }

    scene.add(box);
    return box;
}

//functions to create each shape
//scene 1 is main play scene, scene 2 is shapes at bottom
const createO = (x, y, z, thisScene = 1, c = 0x264653) => {
    const box1 = createBox(0, 0, 0, c);
    const box2 = createBox(0, 100, 0, c);
    const box3 = createBox(100, 0, 0, c);
    const box4 = createBox(100, 100, 0, c);
    const box5 = createBox(0, 0, 100, c);
    const box6 = createBox(0, 100, 100, c);
    const box7 = createBox(100, 0, 100, c);
    const box8 = createBox(100, 100, 100, c);
    const group = new THREE.Group();
    group.add(box1);
    group.add(box2);
    group.add(box3);
    group.add(box4);
    group.add(box5);
    group.add(box6);
    group.add(box7);
    group.add(box8);
    group.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
    if (thisScene == 2) {
        shapesScene.add(group);

    } else {
        scene.add(group);
    }
    return group;
}
const createI = (x, y, z, thisScene = 1, c = 0x2A9D8F) => {
    const box1 = createBox(0, 0, 0, c);
    const box2 = createBox(0, 100, 0, c);
    const box3 = createBox(0, 200, 0, c);
    const box4 = createBox(0, 300, 0, c);
    const box5 = createBox(0, 0, 100, c);
    const box6 = createBox(0, 100, 100, c);
    const box7 = createBox(0, 200, 100, c);
    const box8 = createBox(0, 300, 100, c);
    const group = new THREE.Group();
    group.add(box1);
    group.add(box2);
    group.add(box3);
    group.add(box4);
    group.add(box5);
    group.add(box6);
    group.add(box7);
    group.add(box8);
    group.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
    if (thisScene == 2) {
        shapesScene.add(group);

    } else {
        scene.add(group);
    }
    return group;
}
const createJ = (x, y, z, thisScene = 1, c = 0xE9C46A) => {
    const box1 = createBox(0, 0, 0, c);
    const box2 = createBox(0, 100, 0, c);
    const box3 = createBox(0, 200, 0, c);
    const box4 = createBox(100, 0, 0, c);
    const box5 = createBox(0, 0, 100, c);
    const box6 = createBox(0, 100, 100, c);
    const box7 = createBox(0, 200, 100, c);
    const box8 = createBox(100, 0, 100, c);
    const group = new THREE.Group();
    group.add(box1);
    group.add(box2);
    group.add(box3);
    group.add(box4);
    group.add(box5);
    group.add(box6);
    group.add(box7);
    group.add(box8);
    group.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
    if (thisScene == 2) {
        shapesScene.add(group);

    } else {
        scene.add(group);
    }
    return group;
}
const createL = (x, y, z, thisScene = 1, c = 0xF4A261) => {
    const box1 = createBox(0, 0, 0, c);
    const box2 = createBox(100, 100, 0, c);
    const box3 = createBox(100, 200, 0, c);
    const box4 = createBox(100, 0, 0, c);
    const box5 = createBox(0, 0, 100, c);
    const box6 = createBox(100, 100, 100, c);
    const box7 = createBox(100, 200, 100, c);
    const box8 = createBox(100, 0, 100, c);
    const group = new THREE.Group();
    group.add(box1);
    group.add(box2);
    group.add(box3);
    group.add(box4);
    group.add(box5);
    group.add(box6);
    group.add(box7);
    group.add(box8);
    group.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
    if (thisScene == 2) {
        shapesScene.add(group);

    } else {
        scene.add(group);
    }
    return group;
}
const createT = (x, y, z, thisScene = 1, c = 0xE76F51) => {
    const box1 = createBox(0, 100, 0, c);
    const box2 = createBox(100, 100, 0, c);
    const box3 = createBox(200, 100, 0, c);
    const box4 = createBox(100, 0, 0, c);
    const box5 = createBox(0, 100, 100, c);
    const box6 = createBox(100, 100, 100, c);
    const box7 = createBox(200, 100, 100, c);
    const box8 = createBox(100, 0, 100, c);
    const group = new THREE.Group();
    group.add(box1);
    group.add(box2);
    group.add(box3);
    group.add(box4);
    group.add(box5);
    group.add(box6);
    group.add(box7);
    group.add(box8);
    group.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
    if (thisScene == 2) {
        shapesScene.add(group);

    } else {
        scene.add(group);
    }
    return group;
}
const createZ = (x, y, z, thisScene = 1, c = 0xBCAED6) => {
    const box1 = createBox(0, 0, 0, c);
    const box2 = createBox(100, 100, 0, c);
    const box3 = createBox(200, 100, 0, c);
    const box4 = createBox(100, 0, 0, c);
    const box5 = createBox(0, 0, 100, c);
    const box6 = createBox(100, 100, 100, c);
    const box7 = createBox(200, 100, 100, c);
    const box8 = createBox(100, 0, 100, c);
    const group = new THREE.Group();
    group.add(box1);
    group.add(box2);
    group.add(box3);
    group.add(box4);
    group.add(box5);
    group.add(box6);
    group.add(box7);
    group.add(box8);
    group.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
    if (thisScene == 2) {
        shapesScene.add(group);

    } else {
        scene.add(group);
    }
    return group;
}
const createS = (x, y, z, thisScene = 1, c = 0x8E8DBE) => {
    const box1 = createBox(0, 100, 0, c);
    const box2 = createBox(100, 100, 0, c);
    const box3 = createBox(200, 0, 0, c);
    const box4 = createBox(100, 0, 0, c);
    const box5 = createBox(0, 100, 100, c);
    const box6 = createBox(100, 100, 100, c);
    const box7 = createBox(200, 0, 100, c);
    const box8 = createBox(100, 0, 100, c);
    const group = new THREE.Group();
    group.add(box1);
    group.add(box2);
    group.add(box3);
    group.add(box4);
    group.add(box5);
    group.add(box6);
    group.add(box7);
    group.add(box8);
    group.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
    if (thisScene == 2) {
        shapesScene.add(group);
    } else {
        scene.add(group);
    }

    return group;
}

//create the shapes at the bottom of the screen
const OSHAPE = createO(900, -1000, -2500, 2);
const ISHAPE = createI(700, -1000, -2500, 2);
const JSHAPE = createJ(400, -1000, -2500, 2);
const LSHAPE = createL(100, -1000, -2500, 2);
const TSHAPE = createT(-300, -1000, -2500, 2);
const ZSHAPE = createZ(-700, -1000, -2500, 2);
const SSHAPE = createS(-1100, -1000, -2500, 2);


let boxControl = new TransformControls(camera, renderer.domElement);

//make sure dragging on the transform control doesn't rotate the camera's orbit control
boxControl.addEventListener('dragging-changed', (e) => {
    orbit.enabled = !e.value;
});
//snap it to the grid
boxControl.setTranslationSnap(100);
boxControl.setMode("translate");
scene.add(boxControl);

//variables for location helpers
let box1XZ, box1XY, box1YZ;
//function to create shape object
//min, max values determine where the shape's origin can be in space and still be within the play area
//XZx, XZz, XYx, XYy, YZy, YZz values determine the offset of the loaction helper (since the position of an obect is the center of one of it's children, helpers may need offset to match the shape to the grid) - these are to be used in transform control event listener to move the helper to the correct location
function Shape(type, x = 0, y = 1100, z = 0) {
    this.type = type;
    switch (type) {
        case "O":
            this.object = createO(x, y, z);
            box1XZ = createBoxLoc(200, 0, 200, x + 50, -50, z + 50, 0x000000);
            box1XY = createBoxLoc(200, 200, 0, x + 50, y + 50, 550, 0x000000);
            box1YZ = createBoxLoc(0, 200, 200, 550, y + 50, z + 50, 0x000000);
            this.XZx = 50;
            this.XZz = 50;
            this.XYx = 50;
            this.XYy = 50;
            this.YZy = 50;
            this.YZz = 50;
            this.minX = -400;
            this.maxX = 400;
            this.minY = 0;
            this.maxY = 800;
            this.minZ = -400;
            this.maxZ = 400;
            break;
        case "I":
            this.object = createI(x, y, z);
            box1XZ = createBoxLoc(100, 0, 200, x, -50, z + 50, 0x000000);
            box1XY = createBoxLoc(100, 400, 0, x, y + 150, 550, 0x000000);
            box1YZ = createBoxLoc(0, 400, 200, 550, y + 150, z + 50, 0x000000);
            this.XZx = 0;
            this.XZz = 50;
            this.XYx = 0;
            this.XYy = 150;
            this.YZy = 150;
            this.YZz = 50;
            this.minX = -400;
            this.maxX = 500;
            this.minY = 0;
            this.maxY = 600;
            this.minZ = -400;
            this.maxZ = 400;
            break;
        case "J":
            this.object = createJ(x, y, z);
            box1XZ = createBoxLoc(200, 0, 200, x + 50, -50, z + 50, 0x000000);
            box1XY = createBoxLoc(100, 300, 0, x, y + 100, 550, 0x000000, true, 100, 100, 0, 100, -100, 0);
            box1YZ = createBoxLoc(0, 300, 200, 550, y + 100, z + 50, 0x000000);
            this.XZx = 50;
            this.XZz = 50;
            this.XYx = 0;
            this.XYy = 100;
            this.YZy = 100;
            this.YZz = 50;
            this.minX = -400;
            this.maxX = 400;
            this.minY = 0;
            this.maxY = 700;
            this.minZ = -400;
            this.maxZ = 400;
            break;
        case "L":
            this.object = createL(x, y, z);
            box1XZ = createBoxLoc(200, 0, 200, x + 50, -50, z + 50, 0x000000);
            box1XY = createBoxLoc(100, 300, 0, x + 100, y + 100, 550, 0x000000, true, 100, 100, 0, -100, -100, 0);
            box1YZ = createBoxLoc(0, 300, 200, 550, y + 100, z + 50, 0x000000);
            this.XZx = 50;
            this.XZz = 50;
            this.XYx = 100;
            this.XYy = 100;
            this.YZy = 100;
            this.YZz = 50;
            this.minX = -400;
            this.maxX = 400;
            this.minY = 0;
            this.maxY = 700;
            this.minZ = -400;
            this.maxZ = 400;
            break;
        case "T":
            this.object = createT(x, y, z);
            box1XZ = createBoxLoc(300, 0, 200, x + 100, -50, z + 50, 0x000000);
            box1XY = createBoxLoc(300, 100, 0, x + 100, y + 100, 550, 0x000000, true, 100, 100, 0, 0, -100, 0);
            box1YZ = createBoxLoc(0, 200, 200, 550, y + 50, z + 50, 0x000000);
            this.XZx = 100;
            this.XZz = 50;
            this.XYx = 100;
            this.XYy = 100;
            this.YZy = 50;
            this.YZz = 50;
            this.minX = -400;
            this.maxX = 300;
            this.minY = 0;
            this.maxY = 800;
            this.minZ = -400;
            this.maxZ = 400;
            break;
        case "Z":
            this.object = createZ(x, y, z);
            box1XZ = createBoxLoc(300, 0, 200, x + 100, -50, z + 50, 0x000000);
            box1XY = createBoxLoc(200, 100, 0, x + 150, y + 100, 550, 0x000000, true, 200, 100, 0, -100, -100, 0);
            box1YZ = createBoxLoc(0, 200, 200, 550, y + 50, z + 50, 0x000000);
            this.XZx = 100;
            this.XZz = 50;
            this.XYx = 150;
            this.XYy = 100;
            this.YZy = 50;
            this.YZz = 50;
            this.minX = -400;
            this.maxX = 300;
            this.minY = 0;
            this.maxY = 800;
            this.minZ = -400;
            this.maxZ = 400;
            break;
        case "S":
            this.object = createS(x, y, z);
            box1XZ = createBoxLoc(300, 0, 200, x + 100, -50, z + 50, 0x000000);
            box1XY = createBoxLoc(200, 100, 0, x + 50, y + 100, 550, 0x000000, true, 200, 100, 0, 100, -100, 0);
            box1YZ = createBoxLoc(0, 200, 200, 550, y + 50, z + 50, 0x000000);
            this.XZx = 100;
            this.XZz = 50;
            this.XYx = 50;
            this.XYy = 100;
            this.YZy = 50;
            this.YZz = 50;
            this.minX = -400;
            this.maxX = 300;
            this.minY = 0;
            this.maxY = 800;
            this.minZ = -400;
            this.maxZ = 400;
            break;
    }
    //child positions needed for collision detection
    this.childPositions = [];
    this.object.children.forEach(child => {
        this.childPositions.push(child.position);
    });
    currentObj = this;
    //make transform control the current object
    boxControl.attach(currentObj.object);
}

//initialize with a random shape
let shapes = ["O", "I", "J", "L", "T", "Z", "S"];
let randInt = Math.floor(Math.random() * 7);
new Shape(shapes[randInt]);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

lastPosition = currentObj.object.position;

//activePositions are the live positions of the current objects children
//invaildPositions holds positions of each child that is in the play area
let activePositions = [];
let invalidPositions = [];
let invalid = false;
//live position of a child is it's original position added to the live origin of the parent group
const resetActivePos = () => {
    for (let i = 0; i < currentObj.childPositions.length; i++) {
        activePositions[i] = new THREE.Vector3().addVectors(currentObj.object.position, currentObj.childPositions[i]);
    }
}

boxControl.addEventListener("objectChange", (e) => {
    //check if the box is within the bounds of the play area
    //this makes the box immobile on init, but it can be pulled directly down into the grid and then in any direction (transform bug? ... if you continue to drag past a collision to a vaild position it will move through the collision to the valid point)
    if (e.target.object.position.x < currentObj.minX || e.target.object.position.x > currentObj.maxX || e.target.object.position.y < currentObj.minY || e.target.object.position.y > currentObj.maxY || e.target.object.position.z < currentObj.minZ || e.target.object.position.z > currentObj.maxZ) {
        currentObj.object.position.set(lastPosition.x, lastPosition.y, lastPosition.z);
    }
    resetActivePos();
    invalid = false;
    invalidPositions.forEach(position => {
        activePositions.forEach(active => {
            if (active.x == position.x && active.y == position.y && active.z == position.z) {
                invalid = true;
            }
        })
    })
    if (invalid) {
        currentObj.object.position.set(lastPosition.x, lastPosition.y, lastPosition.z);
    }
    resetActivePos();
    lastPosition = currentObj.object.position.clone();
});

//remove the helper planes on the transform controls
for (let i = 10; i < 19; i++) {
    boxControl.children[0].children[0].children[i].material.opacity = 0;
    boxControl.children[0].children[0].children[i].material.visible = false;
}
//set the transform controls to black
for (let i = 0; i < 10; i++) {
    boxControl.children[0].children[0].children[i].material.color.set(0x000000);
}

//run render on a loop to avoid flicker on collision
const render = () => {
    if (currentObj) {
        box1XZ.position.set(currentObj.object.position.x + currentObj.XZx, -50, currentObj.object.position.z + currentObj.XZz);
        box1XY.position.set(currentObj.object.position.x + currentObj.XYx, currentObj.object.position.y + currentObj.XYy, 550);
        box1YZ.position.set(550, currentObj.object.position.y + currentObj.YZy, currentObj.object.position.z + currentObj.YZz);
    }
    //autoClear false after first render to keep both scenes visible
    renderer.autoClear = true;
    renderer.render(scene, camera);
    renderer.autoClear = false;
    renderer.render(shapesScene, shapesCamera);

    requestAnimationFrame(render);
}

render();

//function to create a new shape object to be used in keyboard event listener
//add the position of each child to invalid position array then reset activePositions for the new shape
//reset lastPosition so dragging the shape into play doesn't move it to the location of the last shape
const newShape = () => {
    activePositions.forEach(position => {
        invalidPositions.push(position);
    });
    activePositions.length = 0;
    randInt = Math.floor(Math.random() * 7);
    new Shape(shapes[randInt]);
    lastPosition = currentObj.object.position;
}

//on ENTER remove the shape from the transform control and create a new shape
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "Enter":
            boxControl.detach(currentObj.object);
            newShape();
            break;
    }
});