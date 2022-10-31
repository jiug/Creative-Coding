const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080]
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        context.strokeStyle= "black";
        context.lineWidth = 1;

        // draw
        let w = 800;
        let h = 800;
        let x, y;
        const gap = 3.5;
        const rep = 229;

        for (let n = 0; n < rep; n++) {
            x = 800 + gap/3*n;
            y = 150 + gap/3*n;

            context.translate(540,540);
            context.rotate(Math.PI/200);
            context.beginPath();
            context.rect(-w/2,-h/2,w,h);
            context.translate(-540,-540);
            context.stroke();

            w -= gap;
            h -= gap;
        };


    };
};


canvasSketch(sketch, settings);
