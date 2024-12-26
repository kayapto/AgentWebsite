// AnimationController.js - Enhanced Animations
export class AnimationController {
  constructor() {
    this.animations = new Map();
    this.particles = new ParticleSystem();
  }

  dealCard(card, destination, options = {}) {
    const animation = this.createCardAnimation(card, destination);
    animation.onComplete = () => this.handleAnimationComplete(card);
    
    this.animations.set(card.id, animation);
    animation.play();
  }

  createCardAnimation(card, destination) {
    return {
      duration: 500,
      easing: 'easeOutQuad',
      start: this.getStartPosition(),
      end: destination,
      onUpdate: (progress) => this.updateCardPosition(card, progress)
    };
  }

  addWinEffect() {
    this.particles.emit({
      count: 50,
      color: '#FFD700',
      speed: 2,
      spread: 120
    });
  }
}