import React, { useState, useEffect } from 'react';
import BlackjackTable from './components/BlackjackTable'; // Import your components
import { BlackjackAgent } from './agents/BlackjackAgent';
import { BlackjackGame } from './agents/BlackjackGame';
import { GameUI } from './ui/GameUI';

const App = ({ agent, game, ui }) => {
    return (
      <div>
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-center text-2xl font-bold">Blackjack AI Agent</h1>
        </header>
        <main className="container mx-auto p-4">
          <BlackjackTable agent={agent} game={game} ui={ui} />
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; 2024 Blackjack AI Agent</p>
        </footer>
      </div>
    );
  };
  const [game, setGame] = useState(null);
  const [ui, setUI] = useState(null);

  // Effect to initialize game and UI on load
  useEffect(() => {
    const newGame = new BlackjackGame(agent);
    setGame(newGame);

    const newUI = new GameUI(newGame);
    setUI(newUI);

    // Start the game and update UI
    newGame.startGame();
    newUI.updateDisplay();
  }, [agent]);

  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-center text-2xl font-bold">Blackjack AI Agent</h1>
      </header>

      <main className="container mx-auto p-4">
        <BlackjackTable game={game} ui={ui} />
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 Blackjack AI Agent</p>
      </footer>
    </div>
  );
};

export default App;
