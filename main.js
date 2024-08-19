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
let tanXOld;
let tanZOld;
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

// Create a large plane geometry
const rockySize = 5000;
const rockySegments = 500; 
const rockyGeometry = new THREE.PlaneGeometry(rockySize, rockySize, rockySegments, rockySegments);

// Create the rocky material using vertex colors
const rockyMaterial = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });

// Generate the rocky pattern using vertex colors
const rockyColors = [];
const baseColor = new THREE.Color(0xd2b48c); 

for (let i = 0; i < rockyGeometry.attributes.position.count; i++) {
    
    const variation = (Math.random() - 0.5) * 0.2; 
    const rockyColor = baseColor.clone().offsetHSL(0, 0, variation); 
    rockyColors.push(rockyColor.r, rockyColor.g, rockyColor.b);
}

// Assign the colors to the geometry
rockyGeometry.setAttribute('color', new THREE.Float32BufferAttribute(rockyColors, 3));

// Create the rocky plane mesh
const rockyPlane = new THREE.Mesh(rockyGeometry, rockyMaterial);

// Position the plane so it appears behind the track
rockyPlane.rotation.x = -Math.PI / 2; 
rockyPlane.position.y = -0.1; 

// Add the rocky plane to the scene
scene.add(rockyPlane);

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
    pothole.rotation.x = -Math.PI / 2; 
    return pothole;
}

function createBadTerrain() {
    const geometry = new THREE.PlaneGeometry(15, 15);
    const material = new THREE.MeshBasicMaterial({ color: 0x884422 });
    const badTerrain = new THREE.Mesh(geometry, material);
    badTerrain.rotation.x = -Math.PI / 2; 
    return badTerrain;
}

function createSpeedBoostPad() {
    const geometry = new THREE.PlaneGeometry(20, 10); 
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.7 }); // Green for speed boost
    const boostPad = new THREE.Mesh(geometry, material);
    boostPad.rotation.x = -Math.PI / 2; 
    return boostPad;
}

// Generate control points for the track
const numPoints = 20;
const radiusX = 200;
const radiusZ = 100;
const kinkFactor = 50; 

const controlPoints = generateEllipseWithKinks(numPoints, radiusX, radiusZ, kinkFactor);

// Create a closed loop curve for the track
const curve = new THREE.CatmullRomCurve3(controlPoints, true);
curve.tension = 0.5; 

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
const borderMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 }); 
const middleLineMaterial = new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 3, gapSize: 1 }); 

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

middleLine.computeLineDistances(); 

scene.add(leftBorder);
scene.add(rightBorder);
scene.add(middleLine);

// Create the start/finish line geometry
const lineWidth = roadWidth;
const lineLength = 2; 
const lineGeometry = new THREE.PlaneGeometry(lineWidth, lineLength);

// Create a material for the line (white color)
const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

// Create the start/finish line mesh
const startFinishLine = new THREE.Mesh(lineGeometry, lineMaterial);

// Position the line at the starting point of the track
const startPoint = curve.getPointAt(0); 
const startTangent = curve.getTangentAt(0).normalize(); 

// Position the line at the start point
startFinishLine.position.set(startPoint.x, startPoint.y + 0.01, startPoint.z); 

// Rotate the line to align it with the road
const lineRotationAngle = Math.atan2(startTangent.z, startTangent.x);
startFinishLine.rotation.y = -lineRotationAngle; 
startFinishLine.rotation.x = -Math.PI / 2; 

// Add the start/finish line to the scene
scene.add(startFinishLine);

const potholes = [];
const badTerrains = [];
const numPotholes = 5;
const numBadTerrains = 3;

for (let i = 0; i < numPotholes; i++) {
    const t = Math.random(); 
    const point = curve.getPointAt(t);
    const pothole = createPothole();
    pothole.position.set(point.x, point.y + 0.1, point.z); 
    potholes.push(pothole);
    scene.add(pothole);
}

for (let i = 0; i < numBadTerrains; i++) {
    const t = Math.random(); 
    const point = curve.getPointAt(t);
    const badTerrain = createBadTerrain();
    badTerrain.position.set(point.x, point.y + 0.1, point.z); 
    badTerrains.push(badTerrain);
    scene.add(badTerrain);
}

function checkCollision(car, obstacle) {
    const distance = car.position.distanceTo(obstacle.position);
    return distance < 5; 
}

function handleCollisions() {
    potholes.forEach((pothole) => {
        if (checkCollision(carOne, pothole)) {
            uSpeed = Math.max(uSpeed - 0.1, 0); 
            playSound('hitBorder'); 
        }
    });

    badTerrains.forEach((badTerrain) => {
        if (checkCollision(carOne, badTerrain)) {
            uSpeed = Math.max(uSpeed - 0.05, 0); 
            playSound('hitBorder'); 
        }
    });
}

function checkBorderCollision(car, roadWidth) {
    const carPos = new THREE.Vector2(car.position.x, car.position.z);

    let closestDistance = Infinity;
    let closestNormal = null;

    for (let i = 0; i <= roadSegments; i++) {
        const t = i / roadSegments;
        const point = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t).normalize();
        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x);
        
        const leftBorderPoint = point.clone().add(normal.clone().multiplyScalar(roadWidth / 2));
        const rightBorderPoint = point.clone().add(normal.clone().multiplyScalar(-roadWidth / 2));

        const leftBorderPos = new THREE.Vector2(leftBorderPoint.x, leftBorderPoint.z);
        const rightBorderPos = new THREE.Vector2(rightBorderPoint.x, rightBorderPoint.z);

        const leftDistance = carPos.distanceTo(leftBorderPos);
        const rightDistance = carPos.distanceTo(rightBorderPos);

        if (leftDistance < closestDistance) {
            closestDistance = leftDistance;
            closestNormal = normal;
        }

        if (rightDistance < closestDistance) {
            closestDistance = rightDistance;
            closestNormal = normal.negate();
        }
    }

    if (closestDistance < roadWidth / 2) {
        return closestNormal;
    }

    return null;
}

const speedBoostPads = [];
const numBoostPads = 5; 

for (let i = 0; i < numBoostPads; i++) {
    const t = Math.random(); 
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    
    
    const offset = tangent.clone().multiplyScalar((Math.random() - 0.5) * roadWidth * 0.66); 
    const boostPad = createSpeedBoostPad();
    boostPad.position.set(point.x + offset.x, point.y + 0.01, point.z + offset.z); 
    speedBoostPads.push(boostPad);
    scene.add(boostPad);
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
    car.rotateX(-Math.PI * 0.5);
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
carOne.position.set(iniPos[0], iniPos[1], iniPos[2]);
carTwo.position.set(iniPos[0], iniPos[1], iniPos[2] + 1); 

// Car movement delta function
function moveUser(tanX, tanZ, timeS) {
    const deltaX = tanX * uSpeed * timeS;
    const deltaZ = tanZ * uSpeed * timeS;

    return [deltaX, deltaZ];
}

let boostActive = false;
let boostEndTime = 0;
const boostDuration = 3; 
const boostMultiplier = 2; 

function isOnSpeedBoostPad(car, boostPad) {
    const carPos = new THREE.Vector2(car.position.x, car.position.z);
    const padPos = new THREE.Vector2(boostPad.position.x, boostPad.position.z);
    const distance = carPos.distanceTo(padPos);
    const padWidth = 10; 
    return distance < padWidth; 
}

function handleBoostPads() {
    if (!boostActive) {
        speedBoostPads.forEach((boostPad) => {
            if (isOnSpeedBoostPad(carOne, boostPad)) {
                boostActive = true;
                originalSpeed = uSpeed; 
                uSpeed *= boostMultiplier; 
                boostEndTime = performance.now() + boostDuration * 1000; 
                playSound('speedUp');
            }
        });
    } else {
        if (performance.now() >= boostEndTime) {
            uSpeed = originalSpeed; 
            boostActive = false;
        }
    }
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
        tanXOld = tanX;
        tanZOld = tanZ;
        const iniRot = Math.acos(tanZ);
        if (tanX > 0) {
            carOne.rotateZ(iniRot);
        } else {
            carOne.rotateZ(-iniRot);
        }
 
        carOne.position.set(iniPos[0], 15.0 , iniPos[2]); // Slightly above the road

    } else {
        deltas = moveUser(tanX, tanZ, timeStep);
        const iniRot = Math.acos(tanX * tanXOld + tanZ * tanZOld);

        if (tanZ > tanZOld) {
            carOne.rotateZ(iniRot);
        } else {
            carOne.rotateZ(-iniRot);
        }
        tanXOld = tanX;
        tanZOld = tanZ;
        const carPoint = carOne.position;
        carOne.position.set(carPoint.x + deltas[0], carPoint.y, carPoint.z + deltas[1]); // Slightly above the road
    }

    handleCollisions();
    
    handleBoostPads();

    // Border collision check
    const collisionNormal = checkBorderCollision(carOne, roadWidth);
if (collisionNormal) {
    const velocity = new THREE.Vector2(tanX, tanZ);
    const normal2D = new THREE.Vector2(collisionNormal.x, collisionNormal.z);
    const reflectedVelocity = velocity.clone().sub(normal2D.clone().multiplyScalar(2 * velocity.dot(normal2D)));
    tanX = reflectedVelocity.x;
    tanZ = reflectedVelocity.y;

    uSpeed = Math.max(uSpeed - 0.5, 0); 
    playSound('hitBorder'); 
}

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
