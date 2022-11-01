const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
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
        const gap = 4;
        const rep = 39;
        const mult = 10;

        // const gap = 2.4;
        // const rep =10000;

        for (let n = 0; n < rep; n++) {

            x = gap * n ;
            y = gap * n ;

            // draw the morphed square
            context.beginPath();
            // context.moveTo(x,y);
            context.lineTo(width/3, y);
            context.lineTo(width/2, y + mult*n);
            context.lineTo(2*width/3, y);
            // context.lineTo(w, y);
            context.lineTo(w, height/3)
            context.lineTo(w - mult*n, height/2);
            context.lineTo(w, 2*height/3);
            // context.lineTo(w, h);
            context.lineTo(2*width/3, h);
            context.lineTo(width/2, h-mult*n);
            context.lineTo(width/3, h);
            // context.lineTo(x, w);
            context.lineTo(x, 2*width/3);
            context.lineTo(x + mult*n, height/2);
            context.lineTo(x, width/3);
            // context.lineTo(x,y);

            // fill with alternative colors
            if (n % 2 == 0){
                context.fillStyle = "black";
                context.fill();
            } else {
                context.fillStyle = "white";
                context.fill();
            };

            context.stroke();

            w -= gap;
            h -= gap;
        };
    };
};

canvasSketch(sketch, settings);
