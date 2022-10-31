const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 600, 600]
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);
        context.strokeStyle= "yellow";
        context.lineWidth = 3;

        // draw
        let w = 60;
        let h = 60;
        let x, y;
        let chance = 0.46;
        const gap = 25;

        // rotate
        const rotate = (hc, vc) => {
            if (Math.random() > 0.2) return;
            context.translate(hc, vc);
            context.rotate((45 * Math.PI) / 180);
            context.translate(-hc, -vc);
        };


        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                for (let n = 0; n <12; n++) {
                    x = 100 + (60 + gap) * i;
                    y = 100 + (60 + gap) * j;

                    // Takes squares out in a random gradient
                    if (Math.random() > chance) {
                        context.beginPath();
                        context.rect(x,y,w,h);
                        context.stroke();
                    };

                    // Stops making inner squares in a random gradient
                    // if (Math.random() < chance) {
                    //     continue
                    // }
                    // context.beginPath();
                    // context.rect(x,y,w,h);
                    // context.stroke();

                    w -= 5;
                    h -= 5;
                };
                w = 60;
                h = 60;
                //chance += 0.02;
            };
            //chance += 0.05
        };
    };
};

canvasSketch(sketch, settings);
