const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

// Created funcitons
// const degToRad = (degrees) => {
//     return degrees / 180 * Math.PI;
// };
//
// const randomRange = (min, max) => {
//     return Math.random() * (max - min) + min;
// };


const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const cx = width * 0.5;
    const cy = width * 0.5;
    const w = width * 0.001;
    const h = width * 0.1;
    let x,y;

    const num = 500;
    const radius = width * 0.5;

    for (let i = 0; i < num; i++) {
        const slice = math.degToRad(360/num);
        const angle = slice * i;

        x = cx + radius * Math.sin(angle) ;
        y = cy + radius * Math.cos(angle) ;

        // Radial elements
        context.save();

        context.translate(2*x,2*y);
        context.rotate(-angle);
        context.scale(random.range(0.3,3), random.range(0.3,16));

        context.beginPath();
        context.rect(random.range(-5,5),-h*random.range(.1,.5),w*random.range(.5,1),random.range(5,2));
        context.fill();

        context.restore();

        // Arc Elements
        context.save();
        context.translate(2*cx,2*cy);
        context.rotate(-angle);

        context.lineWidth = random.range(1,5);
        context.beginPath();
        context.arc(0,0,radius*random.range(.1,3), slice*-random.range(.3,50), slice*random.range(.3,2));
        context.stroke();

        context.restore();

    };
  };
};

canvasSketch(sketch, settings);
