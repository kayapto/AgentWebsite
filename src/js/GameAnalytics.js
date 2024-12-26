// GameAnalytics.js - New Analytics System
export class GameAnalytics {
    constructor() {
      this.data = {
        playerDecisions: [],
        outcomes: [],
        timing: [],
        patterns: new Map()
      };
    }
  
    recordDecision(state, decision, outcome) {
      this.data.playerDecisions.push({
        state,
        decision,
        outcome,
        timestamp: Date.now()
      });
      
      this.analyzePatterns();
    }
  
    analyzePatterns() {
      const recentDecisions = this.data.playerDecisions.slice(-10);
      const pattern = this.detectPattern(recentDecisions);
      
      if (pattern) {
        this.data.patterns.set(pattern.type, {
          frequency: pattern.frequency,
          success: pattern.success
        });
      }
    }
  
    generateInsights() {
      return {
        winRate: this.calculateWinRate(),
        commonPatterns: this.getTopPatterns(),
        suggestedImprovements: this.generateSuggestions()
      };
    }
  }
  