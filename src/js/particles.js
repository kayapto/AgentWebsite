export class ParticleSystem {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.options = {
      count: options.count || 100,
      color: options.color || 'rgba(42, 59, 255, 0.2)',
      speed: options.speed || 1,
      size: options.size || { min: 1, max: 3 }
    };
    
    this.init();
    this.animate();
  }

  // ... rest of the file remains the same
}
