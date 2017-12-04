var STAR_COLOURS = ["#ffffff", "#ffe9c4", "#d4fbff"], // because not all stars are white


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


function add_star (context, x, y) {
  var
      brightness, // brightness of the star
      radius; // radius of the star



  // save the previous canvas context state
  context.save();

  radius = Math.random() * 1.1; // random radius
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
  }

  // restore the previous context state
  context.restore();
}

/**
 * Kick everything off
 */
function init () {
  // find the canvas and create its context
  var canvas = document.getElementsById('star')[0],
      context = canvas.getContext('2d');


  // create a new star  when you click on the canvas
  canvas.addEventListener("click",function(){
    add_star(context,event.clientX, event.clientY);
  }, false);

}

// GO, GO, GO!
init();
