// // function getColorInfo (){}
// var img = new Image();
// img.src = 'img/starmap_8k.jpg';
// var canvas = document.getElementById('canvas');
// var w = $('.canvas-wrapper').width();
// var h = $('.canvas-wrapper').height();
// $('#canvas').attr('width', w);
// $('#canvas').attr('height', h);
// var ctx = canvas.getContext('2d');
// img.onload = function() {
//   ctx.drawImage(img, 0, 0);
//   img.style.display = 'none';
// };


var color = document.getElementById('color');
function pick(event) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = ctx.getImageData(x, y, 1, 1);
  var data = pixel.data;
  var hsl = 'hsl(' + data[0] + ', ' + data[1] +
  ', ' + data[2] + ')';
  var rgba = 'rgba(' + data[0] + ', ' + data[1] +
             ', ' + data[2] + ', ' + (data[3] / 255) + ')';
  color.style.background =  rgba;
  color.textContent = hsl;
}
canvas.addEventListener('move', pick);


