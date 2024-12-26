import { gsap } from 'gsap';
import { CardView } from './components/CardView.js';
import { AdviceBox } from './components/AdviceBox.js';

export class GameUI {
  constructor(game) {
    this.game = game;
    this.cardViews = {
      dealer: [],
      player: []
    };
    this.adviceBox = new AdviceBox();
    this.setupUI();
  }

  setupUI() {
    const table = document.createElement('div');
    table.className = 'game-table';
    
    const dealerArea = document.createElement('div');
    dealerArea.className = 'dealer-area';
    
    const playerArea = document.createElement('div');
    playerArea.className = 'player-area';
    
    const actions = document.createElement('div');
    actions.className = 'action-buttons';
    
    ['Hit', 'Stand'].forEach(action => {
      const button = document.createElement('button');
      button.textContent = action;
      button.onclick = () => this.handleAction(action.toLowerCase());
      actions.appendChild(button);
    });

    table.appendChild(dealerArea);
    table.appendChild(this.adviceBox.element);
    table.appendChild(playerArea);
    table.appendChild(actions);
    
    document.getElementById('app').appendChild(table);
  }

  updateCards() {
    const dealerArea = document.querySelector('.dealer-area');
    const playerArea = document.querySelector('.player-area');
    
    // Clear existing cards
    dealerArea.innerHTML = '';
    playerArea.innerHTML = '';
    
    // Update dealer cards
    this.game.dealerHand.cards.forEach((card, index) => {
      const cardView = new CardView(card);
      dealerArea.appendChild(cardView.element);
      
      cardView.animate({
        x: index * 30,
        rotation: index * 2,
        duration: 0.3,
        delay: index * 0.1
      });
    });
    
    // Update player cards
    this.game.playerHand.cards.forEach((card, index) => {
      const cardView = new CardView(card);
      playerArea.appendChild(cardView.element);
      
      cardView.animate({
        x: index * 30,
        rotation: index * -2,
        duration: 0.3,
        delay: index * 0.1
      });
    });
  }

  showAdvice(advice) {
    this.adviceBox.show(advice);
  }

  handleAction(action) {
    if (action === 'hit') {
      this.game.playerHit();
    } else if (action === 'stand') {
      this.game.playerStand();
    }
    this.updateDisplay();
  }

  updateDisplay() {
    this.updateCards();
    
    if (this.game.gameState === 'playing') {
      const advice = this.game.agent.getAdvice(
        this.game.playerHand,
        this.game.dealerHand.cards[0]
      );
      this.showAdvice(advice);
    }
  }
}
