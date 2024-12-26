// UI/UX Enhancements - GameUI.js
export class GameUI {
  constructor(game, analytics) {
    this.game = game;
    this.analytics = analytics;
    this.animations = new AnimationController();
    this.tutorial = new AdaptiveTutorial();
  }

  updateDisplay() {
    this.renderGameState();
    this.updateProbabilities();
    this.showPredictiveHints();
    this.renderAnalytics();
  }

  showPredictiveHints() {
    const nextBestMoves = this.game.agent.getPredictedMoves();
    this.renderHints(nextBestMoves);
  }

  renderAnalytics() {
    const insights = this.analytics.generateInsights();
    this.updateAnalyticsDisplay(insights);
  }
}

// AdaptiveTutorial.js - New Tutorial System
export class AdaptiveTutorial {
  constructor() {
    this.playerMistakes = new Map();
    this.tutorialSteps = new Map();
    this.currentFocus = null;
  }

  analyzeMistake(gameState, playerDecision) {
    const correctDecision = this.getOptimalDecision(gameState);
    if (playerDecision !== correctDecision) {
      this.recordMistake(gameState.pattern);
      this.triggerTutorial(gameState.pattern);
    }
  }

  recordMistake(pattern) {
    const count = this.playerMistakes.get(pattern) || 0;
    this.playerMistakes.set(pattern, count + 1);
    
    if (count + 1 >= 3) {
      this.prioritizeTutorial(pattern);
    }
  }

  generatePersonalizedTips() {
    const commonMistakes = Array.from(this.playerMistakes.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
      
    return commonMistakes.map(([pattern, count]) => ({
      pattern,
      tip: this.getTipForPattern(pattern),
      priority: count
    }));
  }
}
