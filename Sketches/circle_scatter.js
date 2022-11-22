const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};


const sketch = () => {
    let velx = 0;
    let vely = 0;

    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        context.fillStyle = "black";

        let x = 140;
        let y = 150;


        const step = 0.0001;
        const num = 110;

        let noise = [];

        const drift = 0.025;

        for (let i = 0; i < num; i++) {
            let count = 0;

            //x += 1.8;
            y += (7+0.001*i);

            // Populate a different perlin noise array for every line
            for (l = 0; l < 200; l++){
                noise[l] = random.noise2D(drift*l+velx,drift*i-vely);
            }

            context.save();
            context.translate(x,y);
            context.beginPath();

            // Draw every line point by point
            for (j = 0; j < noise.length; j++) {
                context.lineTo(4*count,0.6*i*noise[j]);
                count++;
            };

            context.stroke();
            context.restore();

            velx += step;
            vely += step;
        };
    };
};

canvasSketch(sketch, settings);
