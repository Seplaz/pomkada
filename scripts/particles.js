class Particle {
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'particle';
    
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    
    this.dx = (Math.random() - 0.5) * 0.5;
    this.dy = (Math.random() - 0.5) * 0.5;
    
    this.updatePosition();
    
    document.querySelector('.particles').appendChild(this.element);
  }
  
  updatePosition() {
    this.x += this.dx;
    this.y += this.dy;
    
    if (this.x < 0 || this.x > window.innerWidth) {
      this.dx = -this.dx;
    }
    if (this.y < 0 || this.y > window.innerHeight) {
      this.dy = -this.dy;
    }
    
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
}

function initParticles() {
  const particles = [];
  const particleCount = 100;
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    particles.forEach(particle => particle.updatePosition());
    requestAnimationFrame(animate);
  }
  
  animate();
}

document.addEventListener('DOMContentLoaded', initParticles); 