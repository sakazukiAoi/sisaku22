/* script.js */
let imgA;
function preload() {
    imgA = loadImage('mask.png'); // Aの画像 (穴あき絵)
}
function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    noStroke();
    window.addEventListener('deviceorientation', handleGyro);
}
function handleGyro(event) {
    let hueVal = map(event.gamma, -90, 90, 160, 240); // 色相範囲を限定
    let satVal = 50; // 彩度を抑える
    let lightVal = 40; // 明度を一定にする
    background(color(`hsl(${hueVal}, ${satVal}%, ${lightVal}%)`));
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
