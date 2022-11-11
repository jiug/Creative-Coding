const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    let x = 140;
    let y = 100;

    const num = 200;

    let noise = [];

    const drift = 0.015;

    for (let i = 0; i < num; i++) {
        let count = 0;

        x += 1.8;
        y += (5-0.01*i);

        // Populate a different perlin noise array for every line
        for (l = 0; l < 200; l++){
            noise[l] = random.noise2D(drift*l,drift*i);
        }

        context.save();
        context.translate(x,y);

        context.beginPath();

        // Draw every line point by point
        for (j = 0; j < noise.length - i; j++) {
            let a = i;

            context.lineTo(4*count,0.5*a*noise[j]);
            count++;
        };

        context.stroke();
        context.restore();



    };
  };
};

canvasSketch(sketch, settings);
