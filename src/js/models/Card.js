export class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.faceUp = true;
  }

  get value() {
    if (this.rank === 'A') return 11;
    if (['K', 'Q', 'J'].includes(this.rank)) return 10;
    return parseInt(this.rank);
  }

  flip() {
    this.faceUp = !this.faceUp;
  }
}
