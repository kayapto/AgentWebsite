// BlackjackAgent.js - Enhanced AI Agent
export class BlackjackAgent {
  constructor(name, avatar, stats = {}) {
    this.name = name;
    this.avatar = avatar;
    this.stats = {
      gamesPlayed: stats.gamesPlayed || 0,
      winRate: stats.winRate || 0,
      highScore: stats.highScore || 0,
      cardsPlayed: [], // Track card history
      decisionMatrix: new Map(), // Store decision patterns
    };
    this.learningRate = 0.1;
    this.cardCounter = 0;
  }

  calculateProbabilities(playerHand, dealerUpCard, remainingCards) {
    const playerValue = playerHand.value;
    const dealerValue = dealerUpCard.value;
    const cardCounts = this.countCards(remainingCards);
    
    // Calculate bust probability
    const bustCards = cardCounts.filter(card => (playerValue + card > 21)).length;
    const bustProbability = bustCards / remainingCards.length;
    
    // Calculate win probability
    const winProbability = this.calculateWinProbability(playerValue, dealerValue, cardCounts);
    
    return { bustProbability, winProbability };
  }

  getAdvice(playerHand, dealerUpCard, gameState) {
    const probs = this.calculateProbabilities(playerHand, dealerUpCard, gameState.remainingCards);
    
    // Advanced decision making
    if (probs.bustProbability > 0.6) return 'Stand';
    if (probs.winProbability > 0.7) return 'Hit';
    
    // Basic strategy with ML enhancement
    const decision = this.getBasicStrategy(playerHand.value, dealerUpCard.value);
    const adjustedDecision = this.applyMLAdjustment(decision, probs);
    
    this.updateDecisionMatrix(playerHand, dealerUpCard, adjustedDecision);
    return adjustedDecision;
  }

  updateDecisionMatrix(playerHand, dealerUpCard, decision) {
    const key = `${playerHand.value}-${dealerUpCard.value}`;
    const currentSuccess = this.decisionMatrix.get(key)?.successRate || 0.5;
    
    // Update success rate based on game outcome
    this.decisionMatrix.set(key, {
      decision,
      successRate: currentSuccess * (1 - this.learningRate) + (this.won ? 1 : 0) * this.learningRate
    });
  }

  // Advanced card counting system
  countCards(card) {
    const value = card.value;
    if (value >= 2 && value <= 6) this.cardCounter++;
    if (value >= 10 || value === 1) this.cardCounter--;
    
    return this.cardCounter;
  }
}
