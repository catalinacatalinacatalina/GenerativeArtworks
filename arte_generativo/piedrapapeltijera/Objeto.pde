class Objeto {
    //propiedadest
    float x; float y; float s;
    String type;
    PImage p, r, scis;


    Objeto(float x, float y, float s, String type){
        this.s=s;
        this.x=x;
        this.y=y;
        this.type = type;

        p=loadImage("paper.png");
        r=loadImage("roca.png");
        scis=loadImage("sciss.png");
    }

    float getX(){
        return x;
    }
    
    float getY(){
        return y;
    }
    
    void setX(float x){
        this.x=x;
    }

    void setY(float y){
        this.y=y;
    }

    void setS(float s){
        this.s=s;
    }

    float getS(){
        return s;
    }

    void setType(String type){
        this.type=type;
    }

    String getType(){
        return type;
    }


    void display(){
        imageMode(CENTER);
        if(type=="SCI"){
            image(scis, x, y, s, s);
        } else if(type=="RCK"){
            image(r, x, y, s,s);
        } else if(type=="PAP"){
            image(p, x, y, s, s);
        }
    }

    void mover(){
        setX(getX()+random(-20,20));
        setY(getY()+random(-20,20));
        if(getX()<0){
            setX(2);
        } else if(getX()>width){
            setX(width-2);
        }

        if(getY()<0){
            setY(2);
        } else if(getY()>height){
            setY(height-2);
        }
    }
}