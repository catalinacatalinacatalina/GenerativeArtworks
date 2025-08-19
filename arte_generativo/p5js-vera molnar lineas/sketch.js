let nb =20;
let dim=0;
let x,y;
let margin=40;
function setup() {
  createCanvas(700, 700);
  dim=(width-2*margin)/nb;
  noLoop();
}

function draw() {
  background(225);
  for(let j=0; j<nb; j++){
    for(let i=0; i<nb; i++){
      x=margin+i*dim;
      y=margin+j*dim;
      
      noFill();
      stroke(200);
      //rect(x,y, dim, dim);
      
      let rnd = int(random(0,4));
      stroke(0);
      strokeWeight(4);

      if(rnd == 0)
        line(x,y,x+dim,y+dim);
      else if(rnd ==1)
        line(x,y+dim,x+dim,y);
      else if(rnd ==2)
        line(x+dim/2,y,x+dim/2,y+dim);
      else
        line(x,y+dim/2,x+dim,y+dim/2);
    }
  }
}

function keyPressed(){
  redraw();
}