const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080],
  animate: false
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        context.strokeStyle= "black";
        context.lineWidth = 0.5;
        // context.lineWidth = 0.24;

        // draws
        let w = 1080;
        let h = 1080;
        let x, y;
        const gap = 0.5;
        let rep = 1;


        // const gap = 2.4 , 1.035, 0.1815;
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

        rep += 1 ;
    };
};


canvasSketch(sketch, settings);
