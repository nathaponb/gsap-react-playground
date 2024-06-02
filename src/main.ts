import './style.css';
import SmoothScroll from './SmoothScroll.ts';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import gsap, { Power2 } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/Addons.js';
// import GUI from 'lil-gui';

function timelineManager(isMobile: boolean) {
  console.log(isMobile)
  if (!isMobile) {
    return gsap.timeline({

      defaults: {
        duration: 1,
        ease: Power2.easeOut,
        immediateRender: false,
      },
      scrollTrigger: {
        start: 0,
        end: 'max',
        scrub: 0.5,
        markers: false,
      },
      paused: true
    }).fromTo(
      '.headx',
      {
        y: 0,
        delay: -1,
        duration: 3,
      },
      {
        y: (index, target) =>
          index % 2 ? window.innerWidth : -window.innerWidth,
        delay: -1,
        duration: 3,
      },
      0
    ).fromTo(
      '.brand',
      {
        y: 0,
        delay: -1,
        duration: 3,
      },
      {
        y: (index, target) =>
          index % 2 ? window.innerWidth : window.innerWidth,
        delay: -1,
        // duration: 3,
      },
      0,
    ).to(box.rotation, {
      x: 1,
      y: 0.3,
      // z: -2.3,
      delay: -3,
      duration: 3,
    }).to(camera.rotation, {
      z: 10,
      // delay: -3,
      // duration: 3,
    }).fromTo(
      '.hero',
      {
        x: (index, target) =>
          index % 2 ? window.innerWidth : -window.innerWidth,
        duration: 2,
      },
      {
        x: 0,
        opacity: 1,
        duration: 3,
      },
      2
    ).to(box.position, {
      x: 3,
      delay: -2,
      duration: 3,
    }).to('.hero', {
      x: (index, target) =>
        index % 2 ? window.innerWidth : -window.innerWidth,
      delay: 1,
      duration: 3,
    }).to(camera.position, {
      x: 3.5,
      delay: -3,
      duration: 3,
    }).to(camera.position, {
      y: -5.6,
      z: -8,
      delay: -2,
      duration: 3,
    }).to(box.rotation, {
      y: -0.2,
      delay: -2,
      duration: 3,
    }).fromTo(
      '.about',
      {
        x: (index, target) =>
          index % 2 ? -window.innerWidth : window.innerWidth,

      },
      {
        x: 0,
        opacity: 1,
        delay: 1,
      },
      8
    );
  }else {
    document.getElementById("hero")!.style.bottom = "-100px"
  document.getElementById("about")!.style.bottom = "-100px"

  return gsap.timeline({

    defaults: {
      duration: 1,
      ease: Power2.easeOut,
      immediateRender: false,
    },
    scrollTrigger: {
      start: 0,
      end: 'max',
      scrub: 0.5,
      markers: false,
    },
    paused: true
  })
    // .fromTo(
    //   '.headx',
    //   {
    //     y: 0,
    //     delay: -1,
    //     duration: 3,
    //   },
    //   {
    //     y: (index, target) =>
    //       index % 2 ? window.innerWidth : -window.innerWidth,
    //     delay: -1,
    //     duration: 3,
    //   },
    //   0
    // );
    .fromTo(
      '.brand',
      {
        y: 0,
        delay: -1,
        duration: 3,
      },
      {
        y: -700,
        delay: -1,
        duration: 3,
      },
      // {
      //   y: (index, target) =>
      //     index % 2 ? window.innerWidth : window.innerWidth,
      //   delay: -1,
      //   // duration: 3,
      // },
      0,
    )
    .to(box.rotation, {
      y: 1,
      // z: -2.3,
      delay: -3,
      duration: 3,
    })
    .fromTo(
      '.hero',
      {
        y: 0,
        opacity: 1,
        delay: -1,
      },
      {
        y: -500,
        opacity: 1,
        delay: -1,
      },
    )
    .to(box.rotation, {
      y: -2,
      // z: -2.3,
      duration: 3,
    })
    .fromTo(
      '.hero',
      {
        y: -500,
        opacity: 1,
        delay: -1,
      },
      {
        y: -1000,
        opacity: 1,
        delay: -1,
      },
    )
    .fromTo(
      '.about',
      {
        y: 0,
        opacity: 1,
        delay: -1,
      },
      {
        y: -500,
        opacity: 1,
        delay: -1,
      },
    )
  }

  

}

gsap.registerPlugin(ScrollTrigger);
SmoothScroll(); // Lenis

// Scene & Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
camera.position.set(0, 0, 7);

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
let contenedorObj = document.getElementById('obj')
contenedorObj!.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Environment
// const environment = new RoomEnvironment();
const pmremGenerator = new THREE.PMREMGenerator(renderer);
scene.background = new THREE.Color(0xbbbbbb); // canvas background color
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(renderer), 0.04).texture;
// scene.environment = pmremGenerator.fromScene(environment).texture;

// Orbit control
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', renderFn); // use if there is no animation loop
controls.minDistance = 2;
controls.maxDistance = 10;
controls.enableZoom = false;
// controls.enablePan = true;
controls.update();

// Main 3D object
var box!: THREE.Group<THREE.Object3DEventMap>

// 3D animation player
// let mixer: THREE.AnimationMixer;
// let action!: THREE.AnimationAction
// let clock = new THREE.Clock();

const loader = new GLTFLoader();

async function LoadModel() {
  const result = await loader.loadAsync('/drone.glb');
  box = result.scene;
  box.scale.set(1, 1, 1);
  box.position.set(0, 1, -4);
  // box.rotation.y += Math.PI/2; // rotate mesh face to camera


  // animation
  // mixer = new THREE.AnimationMixer(box);
  // let animations = result.animations;
  // let action = mixer.clipAction(animations[0], box);
  // action.play();

  // --> Get access to nested mesh by its name and set its property as want.
  // const creamCover = (<THREE.Mesh>result.scene.getObjectByName('cream_cream_Material_0'));

  scene.add(box);
  renderFn();
  return result;
}
await LoadModel()

if (window.innerWidth < 600) {
  box.position.set(0, 1, -4);
  document.getElementById("mobile50")!.style.height = "50vh"
} else {
  box.position.set(0, 0, 0);
  document.getElementById("mobile50")!.style.height = "100vh"
}


// GUI for dev
// const gui = new GUI();
// // 3d object
// gui.add(box.position, 'x', -10, 10, 0.1).name("positionX");
// gui.add(box.position, 'y', -10, 10, 0.1).name("positionY");;
// gui.add(box.position, 'z', -20, 10, 0.1).name("positionZ");;

// gui.add(box.rotation, 'x', -10, 10, 0.1).name("rotationX");
// gui.add(box.rotation, 'y', -10, 10, 0.1).name("rotationY");;
// gui.add(box.rotation, 'z', -20, 10, 0.1).name("rotationZ");;

// // scene
// // console.log(camera)
// gui.add(camera.position, 'x', -10, 10, 0.1).name("cameraPositionX");
// gui.add(camera.position, 'y', -10, 10, 0.1).name("cameraPositionY");;
// gui.add(camera.position, 'z', -20, 10, 0.1).name("cameraPositionZ");;

// gui.add(camera.rotation, 'x', -10, 10, 0.1).name("cameraRotationX");
// gui.add(camera.rotation, 'y', -10, 10, 0.1).name("cameraRotationY");;
// gui.add(camera.rotation, 'z', -20, 10, 0.1).name("cameraRotationZ");;


function animate() {
  requestAnimationFrame(animate);

  // if (mixer !== undefined) mixer.update(clock.getDelta());

  controls.update();

  renderer.render(scene, camera);
}
animate();


// GSAP timeline
timelineManager(window.innerWidth < 600 ? true : false)




let contenedor = document.getElementById('obj');

window.addEventListener('resize', onWindowResize, false);

function onWindowResize(e: any) {

  console.log("resizing...")

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
  renderer.render(scene, camera); // -> Also needed

  timelineManager(window.innerWidth < 600 ? true : false)

  //TODO: if windows at (n) width mobile, set gsap timeline specifically for mobile

  // if (window.innerWidth < 600) {
  //   box.scale.set(1, 1, 1)
  // } else {
  //   box.scale.set(, 2, 2)
  // }

  if (window.innerWidth < 600) {
    box.position.set(0, 1, -4);
    document.getElementById("mobile50")!.style.height = "50vh"
  } else {
    box.position.set(0, 0, 0);
    document.getElementById("mobile50")!.style.height = "100vh"
  }

  timelineManager(window.innerWidth < 500 ? true : false)
  

  // console.log(e)

  camera.aspect = contenedor!.clientWidth / contenedor!.clientHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(contenedor!.clientWidth, contenedor!.clientHeight);

}

//TODO: when user click target btn, give orbit control to object
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function renderFn() {

  renderer.render(scene, camera);

}


const tlx = gsap.timeline({
  defaults: {
    duration: 3,
    ease: "Power2.easeOut",
    immediateRender: false,
  },
  onStart: () => console.log("tlx get called"),
  paused: true
});
tlx.fromTo(
  '.headx',
  {
    y: 0,
    delay: -1,
  },
  {
    y: (index, target) =>
      index % 2 ? window.innerWidth : -window.innerWidth,
    delay: -1,
  },
  1
);

// transition Out brand
tlx.fromTo(
  '.brand',
  {
    y: 0,
    delay: -1,
  },
  {
    y: (index, target) =>
      index % 2 ? window.innerWidth : window.innerWidth,
    delay: -1,
    duration: 3,
  },
  1,
);
tlx.fromTo(
  box.position,
  {
    y: 0,
    delay: -1,
  },
  {
    y: -0.9,
    delay: -2,

  },
  2
);



document.getElementById('btn-click_me')!.addEventListener('click', () => {


  document.getElementById("close-btn-wrap")!.style.display = "block";

  tlx.play()

  const appEl = document.getElementById("app")
  appEl!.style.height = "100vh";

  setTimeout(function () {
    const a = document.getElementById("section-wrap")
    a!.style.display = "none";
  }, 2000);

  // add orbit control to view

  // hide content text section

});

document.getElementById("close-btn")?.addEventListener("click", () => {
  document.getElementById("close-btn-wrap")!.style.display = "none";
  const a = document.getElementById("section-wrap")
  a!.style.display = "block";

  const appEl = document.getElementById("app")
  appEl!.style.height = "600vh";

  tlx.reverse(1)
})


