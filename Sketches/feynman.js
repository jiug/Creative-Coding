const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

// Simple animation loop without canvas-sketch
// const animate =  () => {
//     console.log('domestika');
//     requestAnimationFrame(animate);
// };
//
// animate();

const count = 2;
const G = 10;
const sketch = ({ context, width, height }) => {
  const particles = [];

  for (let i = 0; i < count ; i++) {
    const x = random.range(0,width);
    const y = random.range(0,height);

    particles.push( new Particle(x,y));
  };

  return ({context, width, height}) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const agent = particles [i];

      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];

        const dist = agent.pos.getDistance(other.pos);
        if (dist > 100) continue;

        context.lineWidth = math.mapRange(dist,0,100,12,1);

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      };
    };


    particles.forEach(particle => {

      particle.update(particle.forceField(particles));
      particle.draw(context);
      // if (particle.radius < 8) {
        particle.wrap(width, height);
      // } else {
      //  particle.bounce(width, height);
      //};

    });
  };
};


canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  };

  getDistance(v){
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  getAngle(v){
    const Dx = v.x - this.x;
    const Dy = v.y - this.y;
    if (Dx == 0) return 0;
    //console.log(Math.atan(Dy/Dx))
    return Math.atan(Dy/Dx);
  }
};

class Particle {
  constructor(x, y, q) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1,1), random.range(-1,1))
    this.radius = random.range(4, 12);
    this.charge = Math.round(random.range(-1,1));
    this.mass = Math.pow(this.radius, 3)*0.004;
    this.energy = 0.5*this.mass * Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y);
  };

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  };

  wrap(width, height) {
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  };

  update(v){
    this.pos.x += v.x ;
    this.pos.y += v.y ;
  };

  // function to evaluate the force exerted by the rest of the particles
  forceField(a){
    let resultant = new Vector(0,0);

    for (let i = 0; i < a.length; i++) {
      const particleB = a[i];
      const dist = this.pos.getDistance(particleB.pos);
      let force = G * this.charge * particleB.charge / dist*dist;

      if (dist == 0) force = 0;

      resultant.x += force * Math.cos(this.pos.getAngle(particleB.pos));
      resultant.y += force * Math.sin(this.pos.getAngle(particleB.pos));
    };
    //console.log(resultant.x, resultant.y);
    return resultant;
  };

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  };
};
