int x=0;
int y=0;
void setup() {
    size(1600, 600);
}

void draw() {
    background(230);
    for(int i=0; i<=width; i+=width/10){
        fill(i/width * 255, i/width*255, 140);
        ellipse(i + x, height/2+y, 100, 100);

    }

    if(x==width/10){
        x=0;
    }else{
        x++;
    }
    if(y==0){
        y=height;
    }else{
        y--;
    }

}
