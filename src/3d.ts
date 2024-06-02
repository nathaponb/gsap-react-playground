import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

async function view() {

    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    document.getElementById('obj')!.appendChild(renderer.domElement); // inject canvas to dom

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Environment
    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.background = new THREE.Color(0xbbbbbb); //!--> set canvas background
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(renderer), 0.04).texture;

    // Orbit control
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.enableZoom = false;
    // controls.enablePan = true;
    controls.update();

    // Load main rendering 3D Mesh
    var box!: THREE.Group<THREE.Object3DEventMap>
    const loader = new GLTFLoader();
    async function LoadModel() {
        const result = await loader.loadAsync('/drone.glb');
        box = result.scene;
        box.scale.set(1, 1, 1);

        // box.rotation.y += Math.PI/2; // rotate mesh face to camera

        // animation

        // mixer = new THREE.AnimationMixer(box);
        // let animations = result.animations;
        // let action = mixer.clipAction(animations[0], box);
        // action.play();

        // --> Get access to nested mesh by its name and set its property as want.

        // const creamCover = (<THREE.Mesh>result.scene.getObjectByName('cream_cream_Material_0'));

        console.log(result)
        // creamCover.material.map = textureFloor;

        // creamCover.material.metalness! = 0;




        scene.add(box);
        render();
        return result;
    }
    await LoadModel()



    function render() {
        renderer.render(scene, camera);
    }
}

