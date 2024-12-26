export class CardView {
  constructor(card) {
    this.element = document.createElement('div');
    this.element.className = 'card';
    this.update(card);
  }

  update(card) {
    this.element.className = `card ${card.faceUp ? '' : 'face-down'}`;
    this.element.textContent = card.faceUp ? `${card.rank}${card.suit}` : '';
  }

  animate(options = {}) {
    const { x = 0, y = 0, rotation = 0, duration = 0.5 } = options;
    return gsap.to(this.element, {
      x, y, rotation,
      duration,
      ease: 'power2.out'
    });
  }
}
