// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add eventListener for keyboard manipulation of car
// define a delta angle for user rotation
const deltaAngle = Math.PI / 30.0 ;
let keyName = "";
let uSpeed = 0;
// user car unitary direction vector
let tanX;
let tanZ;
document.addEventListener("keydown", (event) => {
    keyName = event.key;
    if (keyName === 'ArrowUp' && uSpeed < 11){
        uSpeed += 1;
    }
    if (keyName === 'ArrowDown' && uSpeed > 0){
        uSpeed -= 1;
    }
    if (keyName === 'ArrowRight' && uSpeed > 0){
        const newTanX = tanX * Math.cos(deltaAngle) - tanZ * Math.sin(deltaAngle);
        const newTanZ = tanX * Math.sin(deltaAngle) + tanZ * Math.cos(deltaAngle);
        tanX = newTanX;
        tanZ = newTanZ;
        console.log(tanX, tanZ);
    }
    if (keyName === 'ArrowLeft' && uSpeed > 0){
        const newTanX = tanX * Math.cos(-deltaAngle) - tanZ * Math.sin(-deltaAngle);
        const newTanZ = tanX * Math.sin(-deltaAngle) + tanZ * Math.cos(-deltaAngle);
        tanX = newTanX;
        tanZ = newTanZ;
        console.log(tanX, tanZ);
    }
});

// Added AudioListener to the camera after scene is created
const listener = new THREE.AudioListener();
camera.add(listener);

// Function to load sound
function loadSound(fileName) {
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(`assets/sound/${fileName}`, function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(false); // Adjust based on whether you want the sound to loop
        sound.setVolume(0.5); // Adjust the volume
    });
    return sound;
};

// Load all your sounds
const sounds = {
    finalLap: loadSound('final-lap.mp3'),
    hitBorder: loadSound('hit-border.mp3'),
    itemEffect: loadSound('item-effect.mp3'),
    lost: loadSound('lost.mp3'),
    mainMenu1: loadSound('main-menu.mp3'),
    mainMenu2: loadSound('main-menu2.mp3'),

    highScore: loadSound('highscore.mp3'),

    readySteadyGo: loadSound('ready-steady-go.mp3'),
    speedUp: loadSound('speed-up.mp3'),
    speed: loadSound('speed.mp3'),
    slowDown: loadSound('slow-down.mp3'),
    tension: loadSound('tension.mp3'),
    winner: loadSound('winner.mp3'),
    soundtrack: loadSound('soundtrack.mp3')
};

function playSound(soundName) {
    if (sounds[soundName]) {
        sounds[soundName].play();
    } else {
        console.error(`Sound ${soundName} not found!`);
    }
};

// Generate elliptical control points with random kinks
function generateEllipseWithKinks(numPoints, radiusX, radiusZ, kinkFactor) {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        let x = radiusX * Math.cos(angle);
        let z = radiusZ * Math.sin(angle);

        // Introduce random kinks and bends
        x += (Math.random() - 0.5) * kinkFactor;
        z += (Math.random() - 0.5) * kinkFactor;

        points.push(new THREE.Vector3(x, 0, z));
    }
    return points;
}

function createPothole() {
    const geometry = new THREE.CylinderGeometry(5, 5, 2, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x333333 });
    const pothole = new THREE.Mesh(geometry, material);
    pothole.rotation.x = -Math.PI / 2; // Flatten it on the road
    return pothole;
}

function createBadTerrain() {
    const geometry = new THREE.PlaneGeometry(15, 15);
    const material = new THREE.MeshBasicMaterial({ color: 0x884422 });
    const badTerrain = new THREE.Mesh(geometry, material);
    badTerrain.rotation.x = -Math.PI / 2; // Align with the road
    return badTerrain;
}

// Generate control points for the track
const numPoints = 20;
const radiusX = 200;
const radiusZ = 100;
const kinkFactor = 50; // Adjust this to control how sharp the bends and kinks are

const controlPoints = generateEllipseWithKinks(numPoints, radiusX, radiusZ, kinkFactor);

// Create a closed loop curve for the track
const curve = new THREE.CatmullRomCurve3(controlPoints, true);
curve.tension = 0.5; // Smoothing factor for curves

// Create road geometry along the curve
const roadWidth = 20;
const roadSegments = 100;
const roadGeometry = new THREE.BufferGeometry();
const roadVertices = [];
const roadIndices = [];

for (let i = 0; i <= roadSegments; i++) {
    const t = i / roadSegments;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x);

    const leftPoint = point.clone().add(normal.clone().multiplyScalar(roadWidth / 2));
    const rightPoint = point.clone().add(normal.clone().multiplyScalar(-roadWidth / 2));

    roadVertices.push(leftPoint.x, leftPoint.y, leftPoint.z);
    roadVertices.push(rightPoint.x, rightPoint.y, rightPoint.z);

    if (i < roadSegments) {
        const baseIndex = i * 2;
        roadIndices.push(baseIndex, baseIndex + 1, baseIndex + 2);
        roadIndices.push(baseIndex + 1, baseIndex + 3, baseIndex + 2);
    }
}

roadGeometry.setAttribute('position', new THREE.Float32BufferAttribute(roadVertices, 3));
roadGeometry.setIndex(roadIndices);

// Create a basic road material
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide });

// Create the road mesh
const road = new THREE.Mesh(roadGeometry, roadMaterial);
scene.add(road);

// Create border and middle lines
const borderMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 }); // Yellow for borders
const middleLineMaterial = new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 3, gapSize: 1 }); // White dashed line

const leftBorderPoints = [];
const rightBorderPoints = [];
const middleLinePoints = [];

for (let i = 0; i <= roadSegments; i++) {
    const t = i / roadSegments;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x);

    const leftBorderPoint = point.clone().add(normal.clone().multiplyScalar(roadWidth / 2));
    const rightBorderPoint = point.clone().add(normal.clone().multiplyScalar(-roadWidth / 2));
    const middlePoint = point.clone();

    leftBorderPoints.push(leftBorderPoint);
    rightBorderPoints.push(rightBorderPoint);
    middleLinePoints.push(middlePoint);
}

const leftBorderGeometry = new THREE.BufferGeometry().setFromPoints(leftBorderPoints);
const rightBorderGeometry = new THREE.BufferGeometry().setFromPoints(rightBorderPoints);
const middleLineGeometry = new THREE.BufferGeometry().setFromPoints(middleLinePoints);

const leftBorder = new THREE.Line(leftBorderGeometry, borderMaterial);
const rightBorder = new THREE.Line(rightBorderGeometry, borderMaterial);
const middleLine = new THREE.Line(middleLineGeometry, middleLineMaterial);

middleLine.computeLineDistances(); // Required for dashed lines to appear correctly

scene.add(leftBorder);
scene.add(rightBorder);
scene.add(middleLine);

const potholes = [];
const badTerrains = [];
const numPotholes = 5;
const numBadTerrains = 3;

for (let i = 0; i < numPotholes; i++) {
    const t = Math.random(); // Random position on the track
    const point = curve.getPointAt(t);
    const pothole = createPothole();
    pothole.position.set(point.x, point.y + 0.1, point.z); // Slightly above the road
    potholes.push(pothole);
    scene.add(pothole);
}

for (let i = 0; i < numBadTerrains; i++) {
    const t = Math.random(); // Random position on the track
    const point = curve.getPointAt(t);
    const badTerrain = createBadTerrain();
    badTerrain.position.set(point.x, point.y + 0.1, point.z); // Slightly above the road
    badTerrains.push(badTerrain);
    scene.add(badTerrain);
}

function checkCollision(car, obstacle) {
    const distance = car.position.distanceTo(obstacle.position);
    return distance < 5; // Adjust the threshold based on car and obstacle sizes
}

function handleCollisions() {
    potholes.forEach((pothole) => {
        if (checkCollision(carOne, pothole)) {
            uSpeed = Math.max(uSpeed - 0.1, 0); // Reduce speed when hitting a pothole
            playSound('hitBorder'); // Play a sound if desired
        }
    });

    badTerrains.forEach((badTerrain) => {
        if (checkCollision(carOne, badTerrain)) {
            uSpeed = Math.max(uSpeed - 0.05, 0); // Smaller speed reduction for bad terrain
            playSound('hitBorder'); // Or a different sound effect
        }
    });
}

let carPosition = 0;

const x = 0, y = -9;
const factor = 0.5;
const carShapePoints = {
    2: [3, -6],
    3: [3, -4],
    4: [5, -4],
    5: [5, -2],
    6: [3, -2],
    7: [3, 1],
    8: [5, 1],
    9: [5, 3],
    10: [3, 3],
    11: [3, 6],
    12: [1, 6],
    13: [1, 8],
    14: [4, 8],
    15: [4, 9],
    16: [-4, 9],
    17: [-4, 8],
    18: [-1, 8],
    19: [-1, 6],
    20: [-3, 6],
    21: [-3, 3],
    22: [-5, 3],
    23: [-5, 1],
    24: [-3, 1],
    25: [-3, -2],
    26: [-5, -2],
    27: [-5, -4],
    28: [-3, -4],
    29: [-3, -6]
}

function createCar(opponent) {
    /*
    Function creates a car shape and returns mesh
    */
    const carShape = new THREE.Shape();
    carShape.moveTo(x, y * factor);
    for (let i in carShapePoints) {
        // console.log(carShapePoints[i]);
        carShape.lineTo(carShapePoints[i][0] * factor, carShapePoints[i][1] * factor);
    }
    const geometry = new THREE.ShapeGeometry(carShape);
    let material;
    if (opponent === true) {
        material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    } else {
        material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    }
    const car = new THREE.Mesh(geometry, material);
    return car;
}


// User car is carOne
carOne = createCar(true);

let timeUser = 0.0;

scene.add( carOne );

// Computer cars

carTwo = createCar(false);
scene.add(carTwo);
let carPositionTwo = 0.02;
// Set camera position
camera.position.set(0, 200, 0);
camera.lookAt(0, 0, 0);


// Initialise user car function

function iniUserPos(curve, timeC, timeS) {
    const carPoint = curve.getPointAt(timeC);
    const carPointTwo = curve.getPointAt(timeC + timeS);
    tanX = (carPointTwo.x - carPoint.x) / timeS;
    tanZ = (carPointTwo.z - carPoint.z) / timeS;
    return [carPoint.x, carPoint.y, carPoint.z, tanX, tanZ];
}

iniPos = iniUserPos(curve, 0, 0.001);
tanX = iniPos[3];
tanZ = iniPos[4];
carOne.position.set(iniPos[0], iniPos[1], iniPos[2]); // Initial position of user car
carTwo.position.set(iniPos[0], iniPos[1], iniPos[2] + 1); // Initial position of computer car

// Car movement delta function
function moveUser(tanX, tanZ, timeS) {
    const deltaX = tanX * uSpeed * timeS;
    const deltaZ = tanZ * uSpeed * timeS;
    return [deltaX, deltaZ];
}

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    const timeStep = 0.0001;
    timeUser += timeStep;
    carPositionTwo += timeStep;

    // Handle car move
    if (timeUser < 2 * timeStep) { // Initial position
        iniPos = iniUserPos(curve, timeUser, timeStep);
        tanX = iniPos[3];
        tanZ = iniPos[4];

        carOne.position.set(iniPos[0], iniPos[1], iniPos[2]); // Slightly above the road
    } else {
        deltas = moveUser(tanX, tanZ, timeStep);
        const carPoint = carOne.position;
        carOne.position.set(carPoint.x + deltas[0], carPoint.y, carPoint.z + deltas[1]); // Slightly above the road
    }

    handleCollisions();

    // Keep the car within the bounds of the curve
    if (carPositionTwo > 1) {
        carPositionTwo = 0;
    }
    if (timeUser > 1) {
        timeUser = 0;
    }

    const carPointTwo = curve.getPointAt(carPositionTwo);
    carTwo.position.set(carPointTwo.x, carPointTwo.y, carPointTwo.z);

    //camera.lookAt(carOne.position);
}

animate();

/* 
if (car.position.x > roadWidth / 2 || car.position.x < -roadWidth / 2) {
    playSound('hitBorder'); // Play the border hit sound
}

// Assuming there's a section where the car speed increases
if (carIsSpeedingUp) {
    playSound('speedUp'); // Play the speed-up sound
}

if (carIsSlowingDown) {
    playSound('slowDown'); // Play the slow-down sound
}

if (carPosition >= 0.9 && !finalLapPlayed) { // Assuming final lap is at 90% of the track
    playSound('finalLap'); // Play the final lap sound
    finalLapPlayed = true; // To ensure it's only played once
}

if (carPosition >= 1) { // Assuming the finish line is at position 1 on the curve
    playSound('winner'); // Play the winner sound
}

if (playerLost) {
    playSound('lost'); // Play the lost sound
}
*/
