var canvas = null;
var img = null;
var ctx = null;
var imageReady = false;

function onload() { 
  canvas = document.getElementById('flameCanvas'); 
  ctx = canvas.getContext("2d"); 
  img = new Image(); 
  img.src = 'img/flame.png';
  img.width = '80';
  img.height = '160';
  img.onload = loaded();
  resize();
}

function resize() {
  canvas.width = canvas.parentNode.clientWidth;
  canvas.height = canvas.parentNode.clientHeight;
  redraw();
}

function loaded() {
  imageReady = true;
  setTimeout( update, 1000 / 60 );
}

var frame = 0;
var lastUpdateTime = 0;
var acDelta = 0;
var msPerFrame = 100;

function update() { 
  requestAnimFrame(update);
  var delta = Date.now() - lastUpdateTime;
  if (acDelta > msPerFrame) { 
    acDelta = 0;
    redraw(); 
    frame++; 
    if (frame >= 3) frame = 0;
  } else { 
    acDelta += delta; 
  }
  lastUpdateTime = Date.now();
}


function redraw() {
  ctx.fillStyle = 'rgba(255,255,255,1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (imageReady) {
    ctx.drawImage(img, frame*80, 0, 80, 160, canvas.width/2 - 48, canvas.height/2 - 48, 80, 160);
  }
}

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    window.oRequestAnimationFrame || 
    window.msRequestAnimationFrame || 
    function( callback ) { 
      window.setTimeout(callback, 1000 / 60); 
    }; 
})();

gyro.startTracking(function(o) {
    console.log(o);
});