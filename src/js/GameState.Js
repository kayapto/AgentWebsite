// GameState.js - Enhanced State Management
export class GameState {
    constructor() {
      this.machine = {
        initial: 'betting',
        states: {
          betting: {
            on: { PLACE_BET: 'dealing' }
          },
          dealing: {
            on: { 
              DEALT: 'playerTurn',
              ERROR: 'error'
            }
          },
          playerTurn: {
            on: {
              HIT: 'playerTurn',
              STAND: 'dealerTurn',
              BUST: 'evaluating'
            }
          },
          dealerTurn: {
            on: {
              DEALER_HIT: 'dealerTurn',
              DEALER_STAND: 'evaluating',
              DEALER_BUST: 'evaluating'
            }
          },
          evaluating: {
            on: { 
              COMPLETE: 'complete',
              NEW_GAME: 'betting'
            }
          },
          error: {
            on: { RETRY: 'betting' }
          }
        }
      };
      
      this.currentState = this.machine.initial;
      this.context = {
        deck: [],
        playerHands: [],
        dealerHand: [],
        bet: 0,
        analytics: new GameAnalytics()
      };
    }
  
    transition(event) {
      const currentStateConfig = this.machine.states[this.currentState];
      const nextState = currentStateConfig.on[event];
      
      if (nextState) {
        this.currentState = nextState;
        this.executeStateEffects();
      }
    }
  
    executeStateEffects() {
      switch (this.currentState) {
        case 'dealing':
          this.dealInitialCards();
          break;
        case 'evaluating':
          this.evaluateHands();
          break;
      }
    }
  }