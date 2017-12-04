var STAR_COLOURS = ["#ffffff", "#ffe9c4", "#d4fbff"], // because not all stars are white
    HEIGHT = 400, // height of the canvas
    WIDTH = 800; // width of the canvas

/**
 * Generate a random integer between min and max
 */
function random (min, max) {
  return Math.round((Math.random() * max - min) + min);
}

/**
 * Generate a new star field with star_number stars and draw
 * it onto the provided canvas context
 */
function star_field (context, e) {
  var x, // x position of the star
      y, // y position of the star
      brightness, // brightness of the star
      radius; // radius of the star

  // draw the blank night sky



  // save the previous canvas context state
  context.save();
  x = e.pageX; // random x position
  y = e.pageY; // random y position
  radius = Math.random() * 2.1; // random radius
  brightness = random(80, 100) / 100;

  // start drawing the star
  context.beginPath();
  // set the brightness of the star
  context.globalAlpha = brightness;
    // choose a random star colour
  context.fillStyle = STAR_COLOURS[random(0, STAR_COLOURS.length)];
  // draw the star (an arc of radius 2 * pi)
  context.arc(x, y, radius, 0, Math.PI * 2, true);
  // fill the star and stop drawing it
  context.fill();
  context.closePath();


  // restore the previous context state

}

/**
 * Kick everything off
 */
function init () {
  // find the canvas and create its context
  var canvas = document.getElementsByTagName('canvas')[0],
      context = canvas.getContext('2d');

  // set up the width and height
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  // create a star field


  // create a new star field when you click on the canvas
  canvas.addEventListener ("click", function () {
    star_field(context, event);
  }, false);

  context.restore();
}

// GO, GO, GO!
init();
