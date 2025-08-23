const canvasSketch = require('canvas-sketch');
//const random = require('canvas-sketch-util/random');

const width = 800;
const height = 600;

const settings = {
    dimensions: [ width, height ],
    animate: true
};


const sketch = ({context, width, height}) => {
    const agents = [];
    for (let i = 0; i < 40; i++) {
        const x = Math.random() * (width - 40) + 20;
        const y = Math.random() * (height - 40) + 20;
        agents.push(new Agent(x, y));
    }


    return ({context, width, height}) => {
      context.fillStyle = '#FFF';
      context.fillRect(0, 0, width, height);
      agents.forEach(agent => {
        agent.update();
        agent.draw(context);
      });

      for (let i = 0; i < agents.length; i++) {
        const agent = agents[i];
        for (let j = i + 1; j < agents.length; j++) {
          const other = agents[j];
          const dx = agent.position.x - other.position.x;
          const dy = agent.position.y - other.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
              context.strokeStyle = 'black';
              context.beginPath();
              context.moveTo(agent.position.x, agent.position.y);
              context.lineTo(other.position.x, other.position.y);
              context.stroke();
          }
        }
      }
      
};

};

canvasSketch(sketch, settings);
class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Agent{
    constructor(x, y){
        this.position = new Vector(x, y);
        this.radius = Math.random() * 10 + 5;
        this.velocity = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
    }

    update(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.bounce(width, height);

    }

    bounce(width, height){
        if(this.position.x < 20)   this.velocity.x *= -1;
        if(this.position.x > width - 20)   this.velocity.x *= -1;
        if(this.position.y < 20)   this.velocity.y *= -1;
        if(this.position.y > height - 20)   this.velocity.y *= -1;
    }

    draw(context){
        context.fillStyle = 'black';

        context.save();
        context.translate(this.position.x, this.position.y);

        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2);
        context.fill();

        context.restore();
    }
}