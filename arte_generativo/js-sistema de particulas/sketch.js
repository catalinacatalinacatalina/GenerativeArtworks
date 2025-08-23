const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
    dimensions: [ 800, 600 ]
};
const sketch = ({context, width, height}) => {
    const agents = [];
    for (let i = 0; i < 40; i++) {
        const x = random.range(0, width);
        const y = random.range(0, height);
        agents.push(new Agent(x, y));
    }
    return ({context, width, height}) => {
        context.fillStyle = '#FFF';
        context.fillRect(0, 0, width, height);
        agents.forEach(agent => agent.draw(context));
    };
};

canvasSketch(sketch, settings);
class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Agent{
    constructor(x, y){
        this.position = new Point(x, y);
    }
    draw(context){
        context.fillStyle = '#000';

        context.beginPath();
        context.arc(this.position.x + 5, this.position.y + 5, 5, 0, Math.PI * 2);
        context.fill();
    }
}