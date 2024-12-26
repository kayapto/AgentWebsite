export class AdviceBox {
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'advice-box';
  }

  show(advice) {
    this.element.textContent = `Agent suggests: ${advice}`;
    gsap.from(this.element, {
      y: -20,
      opacity: 0,
      duration: 0.3
    });
  }
}
