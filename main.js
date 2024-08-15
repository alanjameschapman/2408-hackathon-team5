// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a closed loop curve for the track
const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-50, 0, -50),
    new THREE.Vector3(-30, 0, -20),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(30, 0, 20),
    new THREE.Vector3(50, 0, 50),
    new THREE.Vector3(30, 0, 70),
    new THREE.Vector3(0, 0, 50),
    new THREE.Vector3(-30, 0, 70),
    new THREE.Vector3(-50, 0, 50)
], true); // true to close the loop

// Create a tube geometry along the curve
const tubeGeometry = new THREE.TubeGeometry(curve, 110, 5, 25, true);

// Create a material for the road
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });

// Create a mesh from the geometry and material
const road = new THREE.Mesh(tubeGeometry, roadMaterial);
scene.add(road);

// Set camera position
camera.position.set(0, 100, 200);
camera.lookAt(0, 0, 0);

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();