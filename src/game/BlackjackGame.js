  import { Deck } from '../models/Deck.js';
import { Hand } from '../models/Hand.js';

export class BlackjackGame {
  constructor(agent) {
    this.agent = agent;
    this.deck = new Deck();
    this.playerHand = new Hand();
    this.dealerHand = new Hand();
    this.gameState = 'betting'; // betting, playing, finished
  }

  startGame() {
    this.deck.reset();
    this.playerHand.clear();
    this.dealerHand.clear();
    
    // Initial deal
    this.playerHand.addCard(this.deck.draw());
    this.dealerHand.addCard(this.deck.draw());
    this.playerHand.addCard(this.deck.draw());
    const dealerCard = this.deck.draw();
    dealerCard.faceUp = false;
    this.dealerHand.addCard(dealerCard);

    this.gameState = 'playing';
  }

  playerHit() {
    if (this.gameState !== 'playing') return;
    
    this.playerHand.addCard(this.deck.draw());
    if (this.playerHand.value > 21) {
      this.endGame();
    }
  }

  playerStand() {
    if (this.gameState !== 'playing') return;

    this.dealerPlay();
    this.endGame();
  }

  dealerPlay() {
    this.dealerHand.cards[1].faceUp = true;
    
    while (this.dealerHand.value < 17) {
      this.dealerHand.addCard(this.deck.draw());
    }
  }

  endGame() {
    this.gameState = 'finished';
    const playerValue = this.playerHand.value;
    const dealerValue = this.dealerHand.value;
    
    let playerWon = false;
    if (playerValue <= 21) {
      if (dealerValue > 21 || playerValue > dealerValue) {
        playerWon = true;
      }
    }

    this.agent.updateStats(playerWon);
    return playerWon;
  }
}
