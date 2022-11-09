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
    let y = 990;

    const num = 200;

    let noise = [];

    const drift = 0.05;

    for (let i = 0; i < num; i++) {
        const slice = math.degToRad(360/num);

        x += 0;
        y -= (4 -drift);

        

        context.save();
        context.translate(x,y);

        context.beginPath();
        context.moveTo(0,0);

        for (l = 0; l < num; l++){
            noise[l] = random.noise2D(0.015*l,0.02*i);
        }

        let count = 0;

        for (j = 0; j < noise.length; j++) {

            let a = i
            context.lineTo(4*count+1,0.5*a*noise[j]);
            count++;
        };

        context.stroke();
        context.restore();

    };
  };
};

canvasSketch(sketch, settings);
