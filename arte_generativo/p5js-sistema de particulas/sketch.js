let nb=100;
let p= Array(nb);
let dMin=150;
let velocidad=2;
let margin=100;
function setup() {
  createCanvas(700,700);
  
  for(let i=0; i<nb;i++)
    p[i]=new Particula(random(0,width), random(0,height));
}

function draw() {
  background(0);
  fill(255);
  noStroke();
  
  for(let i=0; i<nb;i++)
    p[i].draw();
  
  
  stroke(255);
  for(let i=0; i<nb;i++){
    let pi=p[i];
    for(let j=i+1; j<nb;j++){
      let pj=p[j];
      
      let d=dist(pi.x, pi.y, pj.x, pj.y);
      //print("pi"+pi);
      if(d<dMin){
        stroke(120, 20,map(d, 0, dMin, 0, 255));
        strokeWeight(3);
        line(pi.x, pi.y, pj.x, pj.y);        
      }
    }
  }
}

class Particula{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.vx=random(-velocidad,velocidad);
    this.vy=random(-velocidad,velocidad);
    
  }
  
  draw(){
    this.x+=this.vx;
    this.y+=this.vy;
    circle(this.x,this.y,10);
    if(this.x>width || this.x<0){
      this.vx=-this.vx;
    } else if(this.y>height|| this.y<0){
      this.vy=-this.vy;
    }
    
  }
}