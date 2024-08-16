// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Function to generate control points
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

// Set camera position
camera.position.set(0, 100, 200);
camera.lookAt(0, 0, 0);

function createCar(x, y, factor){
    /*
    Function takes position (x, y)
    and factor (car size) are used to
    create a 2D shape mesh
    */
    carShape.moveTo( x , y );
    carShape.lineTo( x + 3 * factor, y + 3 * factor);
    carShape.lineTo( x + 3 * factor , y + 5 * factor);
    carShape.lineTo( x + 5 * factor , y + 5 * factor);
    carShape.lineTo( x + 5 * factor , y + 7 * factor);
    carShape.lineTo( x + 3 * factor , y + 7 * factor);
    carShape.lineTo( x + 3 * factor , y + 10 * factor);
    carShape.lineTo( x + 5 * factor , y + 10 * factor);
    carShape.lineTo( x + 5 * factor , y + 12 * factor);
    carShape.lineTo( x + 3 * factor , y + 12 * factor);
    carShape.lineTo( x + 3 * factor , y + 15 * factor);
    carShape.lineTo( x + 1 * factor , y + 15 * factor);
    carShape.lineTo( x + 1 * factor , y + 17 * factor);
    carShape.lineTo( x + 4 * factor , y + 17 * factor);
    carShape.lineTo( x + 4 * factor , y + 18 * factor);
    carShape.lineTo( x - 4 * factor , y + 18 * factor);
    carShape.lineTo( x - 4 * factor , y + 17 * factor);
    carShape.lineTo( x - 1 * factor , y + 17 * factor);
    carShape.lineTo( x - 1 * factor , y + 15 * factor);
    carShape.lineTo( x - 3 * factor , y + 15 * factor);
    carShape.lineTo( x - 3 * factor , y + 12 * factor);
    carShape.lineTo( x - 5 * factor , y + 12 * factor);
    carShape.lineTo( x - 5 * factor , y + 10 * factor);
    carShape.lineTo( x - 3 * factor , y + 10 * factor);
    carShape.lineTo( x - 3 * factor , y + 7 * factor);
    carShape.lineTo( x - 5 * factor , y + 7 * factor);
    carShape.lineTo( x - 5 * factor , y + 5 * factor);
    carShape.lineTo( x - 3 * factor , y + 5 * factor);
    carShape.lineTo( x - 3 * factor , y + 3 * factor);
    
    const geometry = new THREE.ShapeGeometry( carShape );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const mesh = new THREE.Mesh( geometry, material ) ;
    scene.add( mesh );

}


// Render the scene
function animate() {
    requestAnimationFrame(animate);

    // Move the car along the curve
    //carPosition += 0.001;
    // if (carPosition > 1) carPosition = 0;
    // const carPoint = curve.getPointAt(carPosition);
    // const carYOffset = Math.sin(carPosition * Math.PI * hillFrequency) * hillAmplitude; // Match the yOffset
    // car.position.set(carPoint.x, carPoint.y + carYOffset + 1, carPoint.z); // Slightly above the road

    // // Dynamically adjust the camera's height to ensure the car is always visible
    // let cameraHeight = car.position.y + 50;
    // if (cameraHeight < 50) cameraHeight = 50; // Minimum height to avoid the camera going too low
    // camera.position.set(carPoint.x, cameraHeight, carPoint.z + 100);
    // camera.lookAt(car.position);

    // Render scene normally
    renderer.render(scene, camera);
}
animate();