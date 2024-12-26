import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/game.css'; // Import global styles

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Blackjack Agent Initialization
import { BlackjackAgent } from './agents/BlackjackAgent.js';
import { BlackjackGame } from './agents/BlackjackGame.js';
import { GameUI } from './ui/GameUI.js';

// Initialize Blackjack Agent
const agent = new BlackjackAgent('Jack the Dealer', 'avatar.png', {
  gamesPlayed: 0,
  winRate: 0,
  highScore: 0,
});

// Initialize Blackjack Game
const game = new BlackjackGame(agent);

// Initialize Game UI
const ui = new GameUI(game);

// Start the game logic
game.startGame();

// Update UI
ui.updateDisplay();

// Pass agent, game, and ui as props to the React App
ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App agent={agent} game={game} ui={ui} />
  </React.StrictMode>
);
