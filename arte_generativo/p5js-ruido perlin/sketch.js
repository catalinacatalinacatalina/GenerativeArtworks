let nb=100;
let p= Array(nb);
let dMin=50;
let velocidad=1;
let noiseScale=0.003;
let noiseAngle=370;

let greenMin, greenMax, blueMin, blueMax, redMin, redMax;

function setup() {
  createCanvas(700,700);
  angleMode(DEGREES);
  init();
}

function draw() {
  fill(255);
  noStroke();
  
  for(let i=0; i<nb;i++)
    p[i].draw();
}

class Particula{
  constructor(x,y, c){
    this.x=x;
    this.y=y;
    this.vx=random(-velocidad,velocidad);
    this.vy=random(-velocidad,velocidad);
    this.c = c;
  }
  
  draw(){
    let n = noiseAngle*noise(noiseScale*this.x, this.y*noiseScale);
    
    this.vx=cos(n)*velocidad;
    this.vy=sin(n)*velocidad;
    
    this.x+=this.vx;
    this.y+=this.vy;
    if(this.x>width || this.x<0){
      //this.vx=-this.vx;
      this.x = random(0, width);
    } else if(this.y>height|| this.y<0){
      //this.vy=-this.vy;
      this.y = random(0, height);
      
    }
    fill(this.c);
    circle(this.x,this.y, 2);
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

function init(){
  colors();
  
  for(let i=0; i<nb;i++){
    let c1 = color(random(redMin,redMax), random(greenMin,greenMax),
                   random(blueMin,blueMax));
    p[i]=new Particula(random(0,width), random(0,height), c1);
  }
}


function mousePressed(){
  init();
  redraw();
  background(0);
}