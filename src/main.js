import { BlackjackAgent } from './agents/BlackjackAgent.js';
import { BlackjackGame } from './game/BlackjackGame.js';
import { GameUI } from './ui/GameUI.js';
import '../styles/game.css';

const agent = new BlackjackAgent(
  'Jack the Dealer',
  'avatar.png',
  { gamesPlayed: 0, winRate: 0, highScore: 0 }
);

const game = new BlackjackGame(agent);
const ui = new GameUI(game);

game.startGame();
ui.updateDisplay();
