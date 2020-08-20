import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';

import { TransformControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/TransformControls.js';

let w = window.innerWidth,
    h = window.innerHeight;
let renderer, section, scene, camera, light, aLight;
let shapesScene, shapesCamera, shapesLight, shapesALight;

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

shapesScene = new THREE.Scene();
shapesCamera = new THREE.PerspectiveCamera(50, w / h, 0.1, 30000);
shapesCamera.position.set(0, 0, -5000);
shapesCamera.lookAt(shapesScene.position);

light = new THREE.HemisphereLight(0xffffff, 0x000000, .8);
aLight = new THREE.AmbientLight(0x777777, 1);
scene.add(light);
scene.add(aLight);
shapesLight = new THREE.HemisphereLight(0xffffff, 0x000000, .8);
shapesALight = new THREE.AmbientLight(0x777777, 1);
shapesScene.add(shapesLight);
shapesScene.add(shapesALight);

const makeBoxGrid = (size, segments, color1, color2, x, y, z, rX, rY, rZ) => {
    const grid = new THREE.GridHelper(size, segments, color1, color2);
    grid.position.set(x, y, z);
    grid.rotation.x = rX;
    grid.rotation.y = rY;
    grid.rotation.z = rZ;

    scene.add(grid);
    return grid;
};

let deg90 = Math.PI / 2,
    gXZ1, gXZ2, gXY1, gXY2, gYZ1, gYZ2;
gXZ1 = makeBoxGrid(1000, 10, 0x777777, 0x777777, 50, -50, 50, 0, 0, 0);
gXY1 = makeBoxGrid(1000, 10, 0x777777, 0x777777, 50, 450, 550, 0, deg90, deg90);
gYZ1 = makeBoxGrid(1000, 10, 0x777777, 0x777777, 550, 450, 50, 0, 0, deg90);



const createBox = (x, y, z, c, w = 100, h = 100, d = 100) => {
    const g = new THREE.BoxBufferGeometry(w, h, d);
    g.center();
    const m = new THREE.MeshLambertMaterial({ color: c });
    const box = new THREE.Mesh(g, m);
    box.position.set(x, y, z);
    scene.add(box);
    return box;
}

const createBoxLoc = (w, h, d, x, y, z, c) => {
    const g = new THREE.BoxBufferGeometry(w, h, d);
    const m = new THREE.MeshBasicMaterial({ color: c });
    const box = new THREE.Mesh(g, m);
    box.position.set(x, y, z);
    scene.add(box);
    return box;
}

const createO = (x, y, z, scene = 1, c = 0x264653) => {
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

    if (scene == 2) {
        shapesScene.add(group);
        group.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
    }
    return group;
}

const createI = (x, y, z, scene = 1, c = 0x2A9D8F) => {
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

    if (scene == 2) {
        shapesScene.add(group);
        group.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
    }
    return group;
}
const createJ = (x, y, z, scene = 1, c = 0xE9C46A) => {
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

    if (scene == 2) {
        shapesScene.add(group);
        group.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
    }
    return group;
}
const createL = (x, y, z, scene = 1, c = 0xF4A261) => {
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

    if (scene == 2) {
        shapesScene.add(group);
        group.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
    }
    return group;
}

const createT = (x, y, z, scene = 1, c = 0xE76F51) => {
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

    if (scene == 2) {
        shapesScene.add(group);
        group.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
    }
    return group;
}

const createZ = (x, y, z, scene = 1, c = 0xBCAED6) => {
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

    if (scene == 2) {
        shapesScene.add(group);
        group.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
    }
    return group;
}
const createS = (x, y, z, scene = 1, c = 0x8E8DBE) => {
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

    if (scene == 2) {
        shapesScene.add(group);
        group.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
    }
    return group;
}

const OSHAPE = createO(900, -1000, -2500, 2);
const ISHAPE = createI(700, -1000, -2500, 2);
const JSHAPE = createJ(400, -1000, -2500, 2);
const LSHAPE = createL(100, -1000, -2500, 2);
const TSHAPE = createT(-300, -1000, -2500, 2);
const ZSHAPE = createZ(-700, -1000, -2500, 2);
const SSHAPE = createS(-1100, -1000, -2500, 2);

let box1, box1XZ, box1XY, box1YZ, boxControl;
box1 = createBox(500, 0, 500, 0xFF5A36);
box1XZ = createBoxLoc(100, 0, 100, 500, -50, 500, 0x000000);
box1XY = createBoxLoc(100, 100, 0, 500, 0, 550, 0x000000);
box1YZ = createBoxLoc(0, 100, 100, 550, 0, 500, 0x000000);
boxControl = new TransformControls(camera, renderer.domElement);

boxControl.addEventListener('dragging-changed', (e) => {
    orbit.enabled = !e.value;
});
boxControl.setTranslationSnap(100);
boxControl.setMode("translate");
boxControl.attach(box1);
scene.add(boxControl);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

let currentObj = box1;

let lastPosition = currentObj.position;

boxControl.addEventListener("objectChange", (e) => {
    if (e.target.object.position.x < -400 || e.target.object.position.x > 500 || e.target.object.position.y < 0 || e.target.object.position.y > 900 || e.target.object.position.z < -400 || e.target.object.position.z > 500) {
        currentObj.position.set(lastPosition.x, lastPosition.y, lastPosition.z);
    }
    lastPosition = currentObj.position.clone();
});


for (let i = 10; i < 19; i++) {
    boxControl.children[0].children[0].children[i].material.opacity = 0;
    boxControl.children[0].children[0].children[i].material.visible = false;
}
for (let i = 0; i < 10; i++) {
    boxControl.children[0].children[0].children[i].material.color.set(0x000000);
}

console.log(boxControl.children[0].children[0]);

const render = () => {
    // OSHAPE.rotateY(0.01);
    box1XZ.position.set(box1.position.x, -50, box1.position.z);
    box1XY.position.set(box1.position.x, box1.position.y, 550);
    box1YZ.position.set(550, box1.position.y, box1.position.z);
    renderer.autoClear = true;
    renderer.render(scene, camera);
    renderer.autoClear = false;
    renderer.render(shapesScene, shapesCamera);

    requestAnimationFrame(render);
}

render();

window.addEventListener("keydown", (e) => {
    console.log(e);

    switch (e.key) {
        case "Enter":
            boxControl.detach(box1);
    }
});