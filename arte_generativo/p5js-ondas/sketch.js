let nb=25;
let dim=0;
let margin=20;
//scaling factor de los circulos
let f = 2;
let freq =4;
let x, y;

function setup() {
  createCanvas(700, 700);
  dim = (width-2*margin)/nb;
  angleMode(DEGREES);
  createLoop({duration:8, gif:true});
}

function draw() {
  background(0);
  //stroke(255);
  //noFill();
  noStroke();
  rectMode(CENTER);
  
  for(let j=0; j<nb; j++){
    for(let i = 0; i<nb; i++){
      x=margin+dim/2+i*dim;
      y=margin+dim/2+j*dim;
      
      let distance=dist(x,y, width/2, height/2);
      let mapped_dist=255-map(distance, 0, 2*width/3, 90, 255);
      
      let azul=color(mapped_dist,mapped_dist,mapped_dist+40);
      let naranja = color(mapped_dist+120,mapped_dist+50,mapped_dist);
      
      if((i+j)%2==0) fill(naranja);
      else fill(azul);
      
      f=sin(animLoop.theta*freq + 2*dist(x,y, width/2, height/2));
      circle(x, y, f*dim);
    }
  }
}