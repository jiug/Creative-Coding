const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ]
};

let manager;

const params = {
  text: random.pick(['海', '雨', '夢']),
  fontSize: 1200,
  fontFamily: 'sans',
  glyphSize: 6,
  cell: 20,
  animate: true
}

const img = new Image();
img.src = "images/olmo.jpg"

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  const cols = Math.floor(width / params.cell);
  const rows = Math.floor(height / params.cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'white';
    typeContext.fillRect(0, 0, cols, rows);

    params.fontSize = cols * 0.7 ;

    typeContext.fillStyle = 'black';
    typeContext.font = `${params.fontSize}px ${params.fontFamily}`;
    typeContext.textBaseline = 'top';

    const metrics = typeContext.measureText(params.text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight ;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(tx,ty);

    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.stroke();

    typeContext.fillText(params.text,0,0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0,0,cols,rows).data;

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.textBaseline = 'middle';
    context.texAlign = 'center';

    // context.drawImage(typeCanvas, 0, 0);


    for (let i = 0; i < numCells; i++){
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * params.cell;
      const y = row * params.cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph(r);

      context.font = `${params.cell * 2}px ${params.fontFamily}`;
      if (Math.random() < 0) context.font = `${params.cell * params.glyphSize}px ${params.fontFamily}`;


      // context.fillStyle = `rgb(${r},${g},${b})`;
      context.fillStyle = "white";

      context.save();
      context.translate(x,y);
      context.translate(params.cell * 0.5, params.cell * 0.5);

      // context.fillRect(0,0,params.cell,params.cell);

      context.fillText(glyph, 0, 0);

      context.restore();
    }
  };
};

const createPane = () => {
	const pane = new Tweakpane.Pane();
	let folder;

	folder = pane.addFolder({ title: 'Grid '});
  folder.addInput(params, 'fontSize', { min: 100, max: 1200, step: 1 });
  folder.addInput(params, 'glyphSize', { min: 0.01, max: 12, step: 0.01 });
  folder.addInput(params, 'cell', { min: 2, max: 40, step: 2 });
  folder.addInput(params, 'text', { options: { Sea: '海', Rain: '雨', Dream: '夢' }});
  folder.addInput(params, 'animate');
};


const getGlyph = (v) => {
  if (v > 50) return ' ';
  if (v > 100) return '.';
  if (v > 150) return ' ';
  if (v > 200) return '=';

  const glyphs = '='.split('');

  return random.pick(glyphs);
};

const onKeyUp = (e) => {
  params.text = e.key.toUpperCase();
  manager.render();
};

 document.addEventListener('keyup', onKeyUp);

 const start = async () => {
   manager = await canvasSketch(sketch, settings);
 };
//


createPane();
start();
//canvasSketch(sketch, settings);
