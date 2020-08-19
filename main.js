import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';

import { TransformControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/TransformControls.js';

let w = window.innerWidth;
let h = window.innerHeight;


const renderer = new THREE.WebGLRenderer({
    antialias: true
});
const render = () => {
    renderer.render(scene, camera);

    box1XZ.position.set(box1.position.x, -50, box1.position.z);
    box1XY.position.set(box1.position.x, box1.position.y, 550);
    box1YZ.position.set(550, box1.position.y, box1.position.z);

}


renderer.setSize(w, h);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x333333, 1);

const section = document.querySelector("section");
section.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const makeBoxGrid = (size, segments, color1, color2, x, y, z, rX, rY, rZ) => {
    const grid = new THREE.GridHelper(size, segments, color1, color2);
    grid.position.set(x, y, z);
    grid.rotation.x = rX;
    grid.rotation.y = rY;
    grid.rotation.z = rZ;

    scene.add(grid);
    return grid;
};
const deg90 = Math.PI / 2;
const gXZ1 = makeBoxGrid(1000, 10, 0x777777, 0x777777, 50, -50, 50, 0, 0, 0);
const gXZ2 = makeBoxGrid(1000, 10, 0x777777, 0x777777, 50, 950, 50, 0, 0, 0);
const gXY1 = makeBoxGrid(1000, 10, 0x777777, 0x777777, 50, 450, 550, 0, deg90, deg90);
const gXY2 = makeBoxGrid(1000, 10, 0x777777, 0x777777, 50, 450, -450, 0, deg90, deg90);
const gYZ1 = makeBoxGrid(1000, 10, 0x777777, 0x777777, 550, 450, 50, 0, 0, deg90);
const gYZ2 = makeBoxGrid(1000, 10, 0x777777, 0x777777, -450, 450, 50, 0, 0, deg90);

const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 30000);
camera.position.set(-1000, 1000, -2300);
camera.lookAt(scene.position);


const light = new THREE.HemisphereLight(0xffffff, 0x000000, .8);
const aLight = new THREE.AmbientLight(0x777777, 1);
// light.position.set(0, 0, -1);
scene.add(light);
scene.add(aLight);

const shapes = [];

const createBox = (w, h, d, x, y, z, c) => {
    const g = new THREE.BoxBufferGeometry(w, h, d);
    const m = new THREE.MeshLambertMaterial({ color: c });
    const box = new THREE.Mesh(g, m);
    box.position.set(x, y, z);
    scene.add(box);
    return box;
}

const createBoxLoc = (w, h, d, x, y, z, c) => {
    const g = newThree.BoxBufferGeometry(w, h, d);
    const m = new THREE.MeshBasicMaterial({ color: c });
    const box = new THREE.Mesh(g, m);
    box.position.set(x, y, z);
    scene.add(box);
    return box;

}
const box1 = createBox(100, 100, 100, 500, 0, 500, 0xFF5A36);
const box1XZ = createBox(100, 0, 100, 500, -50, 500, 0x000000);
const box1XY = createBox(100, 100, 0, 500, 0, 550, 0x000000);
const box1YZ = createBox(0, 100, 100, 550, 0, 500, 0x000000);
const boxControl = new TransformControls(camera, renderer.domElement);
boxControl.addEventListener('change', render);
boxControl.addEventListener('dragging-changed', (e) => {
    orbit.enabled = !e.value;
});
boxControl.setTranslationSnap(100);
boxControl.setMode("translate");
boxControl.attach(box1);
scene.add(boxControl);




const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();
orbit.addEventListener('change', render);

render();