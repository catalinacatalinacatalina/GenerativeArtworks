
PImage p, r, s;
Objeto obj1, obj2;
Objeto[] listaOb= new Objeto[120];
boolean finished = false;

void setup(){
    fullScreen();
    loadImages();
    obj1 = new Objeto(width/2, height/2,50, "SCI");
    String a ="";
    
    for(int i=0;i<listaOb.length-3; i++){
        if(i%3==0){ a="SCI"; }
        else if(i%3==1){ a="RCK";} 
        else{ a="PAP";}
        
        listaOb[i]= new Objeto(random(0, width), random(0, height),40, a);
        
    }
    println("RECUENTO INICIAL");
    recuento(listaOb);
    setRandomPlace(listaOb);
}

void draw (){
    rectMode(CENTER);
    background(250,200, 200);
    //obj1.display();
    
    for(int i=0;i<listaOb.length-3;i++){
        listaOb[i].display();
        listaOb[i].mover();
    }

    for(int i=0;i<listaOb.length-3;i++){
        for(int j=i+1;j<listaOb.length-3;j++){
            if(distancia(listaOb[i].getX(), listaOb[i].getY(), listaOb[j].getX(), listaOb[j].getY())<30){
                cambio(listaOb[i], listaOb[j]);
                //println("choque");
                
            }
        }
    } 
    recuento(listaOb);
        //checkChoques();
    //noLoop();
}

void loadImages(){
    p=loadImage("paper.png");
    r=loadImage("roca.png");
    s=loadImage("sciss.png");
}

void setRandomPlace(Objeto obj[]){
    for(int i=0;i<obj.length-3;i++){
        obj[i].setY(random(0, height));
        obj[i].setX(random(0, width));
    }
}

void keyPressed(){
    if(key=='s'){
        finished=true;
    }
}

void checkChoques(Objeto obj[]){
    
}

float distancia(float obj1x, float obj1y, float obj2x, float obj2y){
    return sqrt(pow((obj1x-obj2x),2) + pow((obj1y-obj2y), 2));
}

void cambio(Objeto a, Objeto b){
    if(a.getType()!= b.getType()){
        recuento(listaOb);
        if(a.getType()=="PAP"){
            if(b.getType()=="RCK"){
                b.setType("PAP");
            } else if(b.getType()=="SCI"){
                a.setType("SCI");
            }
        } else if(a.getType()=="RCK"){
            if(b.getType()=="PAP"){
                a.setType("PAP");
            } else if(b.getType()=="SCI"){
                b.setType("RCK");
            }
        } else if(a.getType()=="SCI"){
            if(b.getType()=="RCK"){
                a.setType("RCK");
            } else if(b.getType()=="PAP"){
                b.setType("SCI");
            }
        }
    }

}

void recuento(Objeto obj[]){
    int sci=0;
    int rock=0;
    int pap=0;
    for(int i=0; i< obj.length-3;i++){
        if(obj[i].getType()=="SCI"){ sci++;}
        else if(obj[i].getType()=="RCK"){ rock++;}
        else if(obj[i].getType()=="PAP"){ pap++;}
    }


    
    println("");
    println("----RECUENTO----");
    println("Total sciss: "+ sci);
    println("Total rock: "+ rock);
    println("Total paper: "+ pap);
    int total= pap+sci+rock;
    println("Total total: "+ total);

    text("Total sciss: "+ sci, 20, 20);
    text("Total rock: "+ rock, 20, 40);
    text("Total paper: "+ pap, 20, 60);

    if(sci==0||rock==0||pap==0){
        noLoop();
        textSize(100);
        text("WINNER", width/2, height/2);
    }
    
}