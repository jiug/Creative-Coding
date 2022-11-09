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
    const w = width * 0.0005;
    const h = width * 0.40;
    // let x,y;

    let x = 120;
    let y = 140;

    const num = 200;
    const radius = width * 0.25;

    for (let i = 0; i < num; i++) {
        const slice = math.degToRad(360/num);
        const angle = slice * i;

        // x = cx + radius * Math.sin(angle);
        // y = cy + radius * Math.cos(angle);

        x += 4;
        y += 2;

        context.save();
        context.translate(x,y);
        context.rotate(0.5*random.noise1D(0.02*i));

        context.beginPath();
        context.rect(0,0,w,h);
        context.fill();
        context.restore();


        // context.save();
        // context.translate(cx,cy);
        // context.rotate(-angle);
        //
        // context.lineWidth = random.range(5,20);
        // context.beginPath();
        // context.arc(0,0,radius, slice*-.3, slice* 0.3);
        // context.stroke();
        //
        // context.restore();

    };
  };
};

canvasSketch(sketch, settings);