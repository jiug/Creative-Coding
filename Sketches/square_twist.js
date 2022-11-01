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
        // context.lineWidth = 0.24;

        // draws
        let w = 1080;
        let h = 1080;
        let x, y;
        const gap = 5;
        const rep =32

        // const gap = 2.4;
        // const rep =10000;

        for (let n = 0; n < rep; n++) {

            context.translate(540,540);
            context.rotate(Math.PI/200);
            context.beginPath();
            context.rect(-w/2,-h/2,w,h);
            context.translate(-540,-540);
            context.stroke();

            w -= 7*gap;
            h -= 7*gap;
        };


    };
};


canvasSketch(sketch, settings);
