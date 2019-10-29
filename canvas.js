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
/*
let dataFourByFour = [
    ["00BCD4", "FFEB3B", "FFEB3B", "00BCD4"],
    ["FFEB3B", "FFC107", "FFC107", "FFEB3B"],
    ["FFEB3B", "FFC107", "FFC107", "FFEB3B"],
    ["00BCD4", "FFEB3B", "FFEB3B", "00BCD4"]
];


function fourByFour() {

    let scale = 512 / 4;

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            ctx.fillStyle = "#" + dataFourByFour[i][j];
            ctx.fillRect(i * scale, j * scale, (i + 1) * scale, (j + 1) * scale);
        }
    }
}*/
function fourByFour(frame, ctx) {
    let scale1 = 512 / 4;
    frame.forEach((raw, i) => {
        raw.forEach((column, j) => {
            ctx.fillStyle = '#' + column;
            ctx.fillRect(j * scale1, i * scale1, (j + 1) * scale1, (i + 1) * scale1);
        });
    });
}

function draw32x32(frame, ctx) {
    let scale1 = 512 / 32;
    frame.forEach((raw, i) => {
        raw.forEach((column, j) => {
            ctx.fillStyle = 'rgba(' + column[0] + ',' + column[1] + ',' + column[2] + ')';
            ctx.fillRect(j * scale1, i * scale1, (j + 1) * scale1, (i + 1) * scale1);
        });
    });
}
let draw32 = document.querySelector('.draw32x32');
draw32.onclick = () => fetch('./data/32x32.json')
    .then(response => response.json().then(json => draw32x32(json, ctx)));

let draw4x4 = document.querySelector('.draw4x4');
draw4x4.onclick = () => fetch('./data/4x4.json')
    .then(response => response.json().then(json => fourByFour(json, ctx)));