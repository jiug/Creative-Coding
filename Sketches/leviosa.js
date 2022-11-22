const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');


const settings = {
  dimensions: [ 1080, 1080 ],
  animate : true
};

const sketch = () => {
    return ({ context, width, height, frame}) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);


        const cols = 100;
        const rows = 3;
        const numCells = cols * rows;

        const gridw = width * 0.8;
        const gridh = height * 0.8;
        const cellw = gridw / cols;
        const cellh = gridh / rows;
        const margx = (width - gridw) * 0.5;
        const margy = (height - gridh)* 0.5;

        for (let i = 0; i < numCells; i++) {
            const col = i % cols ;
            const row = Math.floor(i / cols);

            const x = col * cellw;
            const y = row * cellh;
            const w = cellw * 0.8;
            const h = cellh * 10;

            const n = random.noise2D(x + frame * 5,y , 0.005);
            const angle = n * Math.PI * 0.085 * (row+7);

            //const scale = (n + 1) / 2* 30;
            const scale = math.mapRange(n, -1, 1, 1, 5);

            context.save();
            context.translate(x,y);
            context.translate(margx,margy);
            context.translate(cellw *0.5, cellh *0.5);
            context.rotate(angle);

            context.lineWidth = 10;
            if (col < cols-1) context.lineWidth = 0.5;

            context.beginPath();
            context.moveTo(w * -15, 0);
            context.lineTo(w * 15, 0);
            context.stroke();

            context.restore();
        }

    };
};

canvasSketch(sketch, settings);
