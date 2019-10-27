const canvas = document.getElementById('#draw');
const ctx = canvas.getContext('2d');

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = '30';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;

function draw(e) {
    if (!isDrawing) return;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    // lastX = e.offsetX;
    //lastY = e.offsetY;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

let img = document.getElementById('#img');

function drawPic() {
    img.onload;
    ctx.drawImage(img, 0, 0, 512, 512);

}