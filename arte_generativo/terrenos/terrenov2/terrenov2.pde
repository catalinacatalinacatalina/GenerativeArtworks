/*
*****************************************************************************************************
*****************************************************************************************************
CATALINA FULLANA MORA

28/09/2022

Github: https://github.com/catalinafullana/Progra/tree/main/arte_generativo/mad
*****************************************************************************************************


A lo largo de este codigo se llevan a cabo las instrucciones propias para la creación de un
terreno descrito mediante un array bidimensional, en el cual cada casilla representa una porción
de una fila o columna, y su valor, la altura de tal casilla.

De esta manera, mediante el uso de la función ruido - haciendo referencia al ruido perlin- ,
se simulan unas ciertas montañas las cuales su valor oscila entre -100 y 100.

Destaca también el uso de colores en rgb, los cuales dependen unicamente de la posición de la
linea a dibujar, RGB:(eje x, eje y, altura)

Finalmente, destacar la extensibilidad que tiene el programa, puesto que dispone de un método
propio para crear ciertos replanos

********************************************** PARA MI **********************************************

Podría ser una buena idea mezclar el programa "raster" con este puesto que se podrian mostrar imagenes
en 3D mostradas por el terreno. Leeria el color del pixel de la imagen primitiva y en función de sus
componentes RGB ubicaria el pixel más o menos lejos del terreno (usar método setHeight). Así pixel a
píxel se iria creando esta mezcla entre raster y terreno.

*****************************************************************************************************

*/

int cols, rows;
int scl = 20;
int w = 3000;
int h = 1600;

float rot = 0;
float rot2 =PI/3;
float rot3 = PI/3;
float c;
float flying = 0;

float[][] terrain;

void setup() {
  size(800, 800, P3D);
  fullScreen(P3D);
  cols = w / scl;
  rows = h/ scl;
  terrain = new float[cols][rows];
}


void draw() {

  flying -= 0.1;

  float yoff = flying;
  for (int y = 0; y < rows; y++) {
    float xoff = 0;
    for (int x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += map(mouseX, 0, width, 0, 0.5);
    }
    //yoff += map(mouseY, 0, height, 0.0001, 0.5);
    yoff +=0.2;
  }

  background(2);
  
  noFill();

  translate(width/2, height/2+50);
  rotateX(rot2);
  rotateY(rot);
  rotateZ(rot3);
  translate(-w/2, -h/2);
  

  //println("cols: "+ cols);
  //println("rows: "+ rows);
  //setIntervalHeight(40, 70, 20, 45, 300);

  for (int y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (int x = 0; x < cols; x++) {
      c = random(100,170);
      stroke(map(x, 0, cols, 0, 255), map(y, 0, rows, 0, 255), terrain[x][y]*5 /* , frameCount */);
      vertex(x*scl, (y)*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }

  // funciones de rotación que pueden ser comentadas/descomentadas en funcion del momento

  //rot+=PI/1000;
  rot2+=map(mouseY, 0, height, PI/1400, PI/100);
  //rot3+=PI/1300;
}

void keyPressed() {
   if(key=='1'){
     noLoop();
   } 
}

void setHeight(int x, int y, float newH){
  terrain[x][y] = newH;
}

float getHeight(int x, int y){
  return terrain[x][y];
}

void setIntervalHeight(int inicioCol, int finalCol, int inicioRow, int finalRow, float newH){
  for(int i=inicioCol; i<finalCol-1; i++){
    for(int j=inicioRow; j<finalRow-1; j++){
      setHeight(i, j, newH);
    }
  }
}