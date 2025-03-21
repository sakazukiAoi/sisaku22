/* style.css */
body {
    margin: 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: black;
}
#canvas-container {
    position: relative;
    width: 100%;
    height: 100%;
}
button#enableGyro {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    font-size: 16px;
    background-color: white;
    border: none;
    cursor: pointer;
}

/* script.js */
let imgA;
function preload() {
    imgA = loadImage('mask.png'); // Aの画像 (穴あき絵)
}
function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    window.addEventListener('deviceorientation', handleGyro);
}
function handleGyro(event) {
    let hueVal = map(event.gamma, -90, 90, 0, 360); // 角度で色変化
    background(color(`hsl(${hueVal}, 100%, 50%)`));
    image(imgA, 0, 0, width, height); // 穴あき絵を前面に描画
}
document.getElementById('enableGyro').addEventListener('click', function() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleGyro);
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener('deviceorientation', handleGyro);
    }
});
