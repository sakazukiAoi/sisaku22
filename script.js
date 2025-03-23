/* script.js */
let imgA, imgB;
function preload() {
    imgA = loadImage('mask.png'); // Aの画像 (穴あき絵)
    imgB = loadImage('background.png'); // Bの画像 (背景用)
}
function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    document.getElementById('canvas-container').style.display = 'none'; // 初期状態で非表示
    imageMode(CORNER); // 画像描画モードを左上基準に
}
function handleGyro(event) {
    let hueVal = map(event.gamma, -45, 45, 180, 300, true); // 色相変化を抑える
    push();
    colorMode(HSB, 360, 100, 100);
    tint(hueVal, 100, 100); // HSBで色相変更
    image(imgB, 0, 0, width, height); // 背景にBの画像を描画
    pop();
    image(imgA, 0, 0, width, height); // 穴あき絵を前面に描画
}
document.getElementById('enableGyro').addEventListener('click', function() {
    document.getElementById('canvas-container').style.display = 'block'; // ボタン押下で表示
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
