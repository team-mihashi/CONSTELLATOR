var canvas = document.getElementById('canvas');
// ブラウザがcanvasを表示しているサイズを調べる。
var displayWidth  = canvas.clientWidth;
var displayHeight = canvas.clientHeight;

// canvasの「描画バッファーのサイズ」と「表示サイズ」が異なるかどうか確認する。
if (canvas.width  != displayWidth ||
    canvas.height != displayHeight) {
    // サイズが違っていたら、描画バッファーのサイズを
    // 表示サイズと同じサイズに合わせる。
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
}

const context = canvas.getContext("2d");
canvas.width = $('.canvas-wrapper').width();
canvas.height = $('.canvas-wrapper').height();
context.fillStyle = "black";
context.fillRect(0, 0, canvas.width, canvas.height);

// Setup button
$('.visibility-button').on('click', () => {
    $('.visibility-button i').toggleClass('fa-eye');
    $('.visibility-button i').toggleClass('fa-eye-slash');
});

// Setup constellations colors
const colors = ['#58D3F7', '#F5BCA9', '#FF00BF', '#F5DA81', '#2EFE64', '#F7FE2E', '#FF0000', '#BF00FF', '#81F7F3', '#F781F3'];

// Get constellations function
const getConstellations = (num) => {
    return new Promise((resolve, reject) => {
        $.get(`https://nasa-backend.herokuapp.com/constellations/${num}`).then((data) => {
            resolve(data);
        }).catch((e) => {
            console.log(e);
            /*
            alert('Could not display constellations.');
            location.href='/';
            */
        });
    });
}

// Draw constellation to canvas function
let points = [];
const drawCanvas = (constellation, color, idx) => {
    console.log(constellation);
    constellation.lines.forEach((line) => {
        if (!points[idx]) {
            points[idx] = [];
        }
        points[idx].push([line.startX, line.startY]);
        points[idx].push([line.endX, line.endY]);
        context.beginPath();
        context.moveTo(line.startX, line.startY);
        context.lineTo(line.endX, line.endY);
        context.strokeStyle = color;
        context.closePath();
        context.stroke();
    });
}

// Get mouse position
const getMousePosition = (e) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

// Get points and draw canvas
let constellations;
getConstellations(10).then((data) => {
    constellations = data.constellations;
    data.constellations.forEach((constellation, idx) => {
        drawCanvas(constellation, colors[idx], idx);
    })
})