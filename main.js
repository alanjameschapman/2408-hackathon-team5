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
function loadSound(fileName){
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(`assets/sound/${fileName}`, function(buffer) {
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
    mainMenu3: loadSound('highscore.mp3'),
    readySteadyGo: loadSound('ready-steady-go.mp3'),
    speedUp: loadSound('speed-up.mp3'),
    speed: loadSound('speed.mp3'),
    tension: loadSound('tension.mp3'),
    winner: loadSound('winner.mp3')
};

function playSound(soundName) {
    if (sounds[soundName]) {
        sounds[soundName].play();
    } else {
        console.error(`Sound ${soundName} not found!`);
    }
};

// Potential sound activations "Choose correct section of code to activate sound
// and refer to sounds object in main.js"
// playSound('readySteadyGo');, playSound('hitBorder');, e.t.c.

// Function to generate control pointsfffffffffff
function generateControlPoints(numPoints, range) {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * range - range / 2;
        const z = Math.random() * range - range / 2;
        points.push(new THREE.Vector3(x, 0, z));
    }
    return points;
}

// Function to ensure bends are within a range of 60 to 160 degrees
function adjustControlPoints(points, minTurnAngle, maxTurnAngle) {
    const adjustedPoints = [points[0]];

    for (let i = 1; i < points.length - 1; i++) {
        const prevPoint = points[i - 1];
        const currPoint = points[i];
        const nextPoint = points[i + 1];

        const prevDir = new THREE.Vector3().subVectors(currPoint, prevPoint).normalize();
        const nextDir = new THREE.Vector3().subVectors(nextPoint, currPoint).normalize();

        const angle = prevDir.angleTo(nextDir);

        if (angle < minTurnAngle || angle > maxTurnAngle) {
            // Insert a midpoint if the angle is too sharp or too wide
            const midPoint = new THREE.Vector3().addVectors(prevPoint, nextPoint).multiplyScalar(0.5);
            adjustedPoints.push(midPoint);
        } else {
            adjustedPoints.push(currPoint);
        }
    }

    adjustedPoints.push(points[points.length - 1]);
    return adjustedPoints;
}

// Generate control points
const numPoints = 10;
const controlPoints = generateControlPoints(numPoints, 200);

// Convert degrees to radians
const minTurnAngle = 60 * (Math.PI / 180); // 60 degrees in radians
const maxTurnAngle = 160 * (Math.PI / 180); // 160 degrees in radians

// Adjust control points to ensure bends are within the specified range
const adjustedControlPoints = adjustControlPoints(controlPoints, minTurnAngle, maxTurnAngle);

// Create a closed loop curve for the track
const curve = new THREE.CatmullRomCurve3(adjustedControlPoints, true);
curve.tension = 0.5; // Smoothing factor for curves

// Create road geometry along the curve with smooth transitions
const roadWidth = 20;
const roadSegments = 100;
const roadGeometry = new THREE.BufferGeometry();
const roadVertices = [];
const roadIndices = [];

// Increased amplitude for the hills
const hillAmplitude = 20;
const hillFrequency = 1; // Frequency of the hills

for (let i = 0; i <= roadSegments; i++) {
    const t = i / roadSegments;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x);

    // Calculate yOffset for smooth hills and valleys
    const yOffset = Math.sin(t * Math.PI * hillFrequency) * hillAmplitude;

    const leftPoint = point.clone().add(normal.clone().multiplyScalar(roadWidth / 2));
    const rightPoint = point.clone().add(normal.clone().multiplyScalar(-roadWidth / 2));
    leftPoint.y += yOffset;
    rightPoint.y += yOffset;

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

    // Apply the same increased amplitude to the borders and middle line
    const yOffset = Math.sin(t * Math.PI * hillFrequency) * hillAmplitude;

    const leftBorderPoint = point.clone().add(normal.clone().multiplyScalar(roadWidth / 2));
    const rightBorderPoint = point.clone().add(normal.clone().multiplyScalar(-roadWidth / 2));
    const middlePoint = point.clone();
    leftBorderPoint.y += yOffset;
    rightBorderPoint.y += yOffset;
    middlePoint.y += yOffset;

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

// Create a car object
// const carGeometry = new THREE.BoxGeometry(2, 2, 4);
// const carMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const car = new THREE.Mesh(carGeometry, carMaterial);
// scene.add(car);

// let carPosition = 0;

// Create border and middle lines
/* const borderMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 }); // Yellow for borders
const middleLineMaterial = new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 3, gapSize: 1 }); // White dashed line

const leftBorderPoints = [];
const rightBorderPoints = [];
const middleLinePoints = [];

for (let i = 0; i <= roadSegments; i++) {
    const t = i / roadSegments;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x);

    // Apply the same increased amplitude to the borders and middle line
    const yOffset = Math.sin(t * Math.PI * hillFrequency) * hillAmplitude;

    const leftBorderPoint = point.clone().add(normal.clone().multiplyScalar(roadWidth / 2));
    const rightBorderPoint = point.clone().add(normal.clone().multiplyScalar(-roadWidth / 2));
    const middlePoint = point.clone();
    leftBorderPoint.y += yOffset;
    rightBorderPoint.y += yOffset;
    middlePoint.y += yOffset;

    leftBorderPoints.push(leftBorderPoint);
    rightBorderPoints.push(rightBorderPoint);
    middleLinePoints.push(middlePoint);
}

const leftBorderGeometry = new THREE.BufferGeometry().setFromPoints(leftBorderPoints);
const rightBorderGeometry = new THREE.BufferGeometry().setFromPoints(rightBorderPoints);
const middleLineGeometry = new THREE.BufferGeometry().setFromPoints(middleLinePoints);

const leftBorder = new THREE.Line(leftBorderGeometry, borderMaterial);
const rightBorder = new THREE.Line(rightBorderGeometry, borderMaterial);
const middleLine = new THREE.Line(middleLineGeometry, middleLineMaterial); */

middleLine.computeLineDistances(); // Required for dashed lines to appear correctly

scene.add(leftBorder);
scene.add(rightBorder);
scene.add(middleLine);

// Create a car object
// const carGeometry = new THREE.BoxGeometry(2, 2, 4);
// const carMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const car = new THREE.Mesh(carGeometry, carMaterial);
// scene.add(car);

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

function createCar(opponent){
    /*
    Function creates a car shape and returns mesh
    */
    const carShape = new THREE.Shape();
    carShape.moveTo( x , y * factor );
    for (let i in carShapePoints){
        // console.log(carShapePoints[i]);
        carShape.lineTo( carShapePoints[i][0] * factor, carShapePoints[i][1] * factor);
    }
    const geometry = new THREE.ShapeGeometry( carShape );
    let material;
    if (opponent === true) {
        material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    } else{
        material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    }
    const car = new THREE.Mesh( geometry, material ) ;
    return car;
}

// const carShape = new THREE.Shape();

// carShape.moveTo( x , y * factor );
// for (let i in carShapePoints){
//     // console.log(carShapePoints[carPoint][0]);
//     carShape.lineTo( carShapePoints[i][0] * factor, carShapePoints[i][1] * factor);
// }


// const geometry = new THREE.ShapeGeometry( carShape );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const car = new THREE.Mesh( geometry, material ) ;
// scene.add( car );

// User car is carOne
carOne = createCar(true);

let timeUser = 0.0;

scene.add( carOne );

// Computer cars
carTwo = createCar(false);
scene.add( carTwo );
let carPositionTwo = 0.02;
// Set camera position
camera.position.set(0, 100, 200);
camera.lookAt(0, 0, 0);


// Initialise user car function

function iniUserPos(curve, timeC, timeS){
    const carPoint = curve.getPointAt(timeC);
    const carPointTwo = curve.getPointAt(timeC + timeS);
    const carYOffset = Math.sin(timeUser * Math.PI * hillFrequency) * hillAmplitude; // Match the yOffset
    const iniTanX = (carPointTwo.x - carPoint.x) / timeS;
    const iniTanZ = (carPointTwo.z - carPoint.z) / timeS;
    const normTan = Math.sqrt(Math.pow(iniTanX, 2) + Math.pow(iniTanZ, 2));
    const iniTanXN = iniTanX / normTan;
    const iniTanZN = iniTanZ / normTan;
    return [carPoint.x, carPoint.y + carYOffset + 1, carPoint.z, iniTanXN, iniTanZN];
}

function moveUser(tanX, tanZ, timeS){
    const deltaX = tanX * uSpeed * timeS;
    const deltaZ = tanZ * uSpeed * timeS;
    // console.log(tanX, tanZ);
    return [deltaX, deltaZ];

}
// Render the scene
function animate() {
    // Play the start sound once when the game begins
    if (carPosition === 0) {
        playSound('readySteadyGo');
    }

    requestAnimationFrame(animate);

    // Move the car along the curve
    const timeStep = 0.01;

    timeUser += timeStep;
    // Handle car move
    if (timeUser < 2 * timeStep){ // Initial position
        iniPos = iniUserPos(curve, timeUser, timeStep);
        tanX = iniPos[3];
        tanZ = iniPos[4];

        carOne.position.set(iniPos[0], iniPos[1] , iniPos[2]); // Slightly above the road
    } else {
        deltas = moveUser(tanX, tanZ, timeStep);
        const carPoint = carOne.position;
        // console.log(userCurrent.x, userCurrent.y, userCurrent.z);
        // const carYOffset = Math.sin(timeOne * uSpeed * Math.PI * hillFrequency) * hillAmplitude; // Match the yOffset
        carOne.position.set(carPoint.x + deltas[0], carPoint.y, carPoint.z + deltas[1]); // Slightly above the road    

    }

    // if (timeOne * uSpeed > 1) timeOne = 0;
    // const carPoint = curve.getPointAt(timeOne * uSpeed);
    // const carYOffset = Math.sin(timeOne * uSpeed * Math.PI * hillFrequency) * hillAmplitude; // Match the yOffset
    // carOne.position.set(carPoint.x, carPoint.y + carYOffset + 1, carPoint.z); // Slightly above the road     


 

    // Move the car two along the curve
    carPositionTwo += 0.001;
    if (carPositionTwo> 1) carPositionTwo = 0;
    const carPointTwo = curve.getPointAt(carPositionTwo);
    const carYOffsetTwo = Math.sin(carPositionTwo * Math.PI * hillFrequency) * hillAmplitude; // Match the yOffset
    carTwo.position.set(carPointTwo.x, carPointTwo.y + carYOffsetTwo + 1, carPointTwo.z); // Slightly above the road

    // // Dynamically adjust the camera's height to ensure the car is always visible
    // let cameraHeight = car.position.y + 50;
    // if (cameraHeight < 50) cameraHeight = 50; // Minimum height to avoid the camera going too low
    // camera.position.set(carPoint.x, cameraHeight, carPoint.z + 100);
    // camera.lookAt(car.position);

    /*
    // Check if the car is hitting the border
    const roadWidthHalf = roadWidth / 2;
    if (car.position.x > roadWidthHalf || car.position.x < -roadWidthHalf) {
        playSound('hitBorder'); // Play border collision sound
    };

    // Increase car speed at a specific point
    if (carPosition > 0.5 && carPosition < 0.51) {
        playSound('speedUp'); // Play speed-up sound
        carPosition += 0.005; // Speed up for demonstration
    } else {
        carPosition += 0.001;
    }
    */

    // Render scene normally
    renderer.render(scene, camera);
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
