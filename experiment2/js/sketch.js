// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
var NORTH = 0;
var NORTHEAST = 1;
var EAST = 2;
var SOUTHEAST = 3;
var SOUTH = 4;
var SOUTHWEST = 5;
var WEST = 6;
var NORTHWEST = 7;

var direction;

var stepSize = 2;
var diameter = 2;

var posX;
var posY;
var peaks;
var inPeak;
var checker;

var drawMode = 1;

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
  colorMode(RGB, 100)
  noStroke();

  posX = width / 2;
  posY = height / 2;
  peaks = [width/4, width/2, width/1.25];
  inPeak = false;
}

function draw() {
  
  for (var i = 0; i <= 10000; i++) {

      direction = int(random(7));

    if (direction == NORTH) {
      posY -= stepSize;
    } else if (direction == NORTHEAST) {
      posX += stepSize;
      posY -= stepSize;
    } else if (direction == EAST) {
      posX += stepSize;
    } else if (direction == SOUTHEAST) {
      posX += stepSize;
      posY += stepSize;
    } else if (direction == SOUTH) {
      posY += stepSize;
    } else if (direction == SOUTHWEST) {
      posX -= stepSize;
      posY += stepSize;
    } else if (direction == WEST) {
      posX -= stepSize;
    } else if (direction == NORTHWEST) {
      posX -= stepSize;
      posY -= stepSize;
    }

    if (posX > width){
      posX = 0;
    }
    if (posX < 0){
      posX = width;
    }
    if (posY < 0){
      posY = height;
      inPeak = false;
      for( var peak in peaks){
        if(posX >= (peaks[peak] - width/40) && (posX <= peaks[peak] +width/40)){
          inPeak = true;
        }
      }
    }
    if (posY > height){
      posY = 0;
      inPeak = false;
      for( var peak in peaks){
        if(posX >= (peaks[peak] - width/40) && (posX <= peaks[peak] +width/40)){
          inPeak = true;
        }
      }
    }
    if( inPeak){
      fill(80, 90, 100);
    } else{
      fill(0, 0, 100);
    }
    ellipse(posX + stepSize / 2, posY + stepSize / 2, diameter, diameter);
  }
  for( var peak in peaks){
    //print( peak);
    peaks[peak]+= width/20
    if(peaks[peak] >= width){
      peaks[peak] = 0;
    }
    //print(peak);
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) clear();

}