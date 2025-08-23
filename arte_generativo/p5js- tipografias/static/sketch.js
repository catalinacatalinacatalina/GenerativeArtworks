let font;
let points;
let xText=0, yText=250;
let fontSize=500;
let txt = "W";
let freq=0.005;
let vel=2;
let greenMin, greenMax, blueMin, blueMax, redMin, redMax;
let col;

let drawMode=2;
function preload(){
  font = loadFont("RobotoBold.ttf");
}

function setup() {
    init();

}

function draw() {
  computePoints(0.1);
  background( col);
  
  noFill();
  stroke(255);
  
  beginShape();
      for (let i =0; i<points.length;i++){
        vertex(points[i].x, points[i].y);
      }
    
  endShape(CLOSE);
  
  
  fill(0);
  strokeWeight(2);
  
  let d=0;
  let fase=0;
  for (let i =0; i<points.length;i++){
    fase=dist(mouseX, mouseY, points[i].x, points[i].y);
    d= 50*sin(vel*frameCount+ fase);
    fill(random(redMin, redMax), random(greenMin, greenMax), random(blueMin, blueMax));
    noFill();
    circle(points[i].x, points[i].y, d);
  }
  
}


function computePoints(factor){
  points = font.textToPoints(txt,xText, yText, fontSize, {
    sampleFactor:factor
  });
  let bounds= font.textBounds(txt, xText, yText, fontSize);
  
  for(let i =0; i<points.length;i++){
    let p = points[i];
    p.x = p.x - (bounds.x-xText+bounds.w/2);
    p.y = p.y + (bounds.h/2);
  }
  
}


function colors(){
  greenMin = int(random(0,255));
  greenMax = int(random(greenMin, 255));
  blueMin = int(random(0,255));
  blueMax = int(random(blueMin, 255));
  redMin = int(random(0,255));
  redMax = int(random(redMin, 255));
  print("tones------------------");
  print("green:\t",greenMin, ",", greenMax);
  print("red:\t",redMin, ",", redMax);
  print("blue:\t",blueMin, ",", blueMax);

}

function mousePressed(){
  init();
  redraw();
}

function init(){
  
  angleMode(DEGREES);
  createCanvas(700, 700);
  xText=width/2;
  yText=height/2;
  colors();
  col= color(random(redMin, redMax), random(greenMin, greenMax), random(blueMin, blueMax));
}