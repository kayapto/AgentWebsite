import { useState, useEffect } from 'react';

const BlackjackTable = () => {
  const [gameState, setGameState] = useState({
    dealerHand: [
      { rank: '10', suit: 'hearts' },
      { rank: '?', suit: 'hidden' } // Face down card
    ],
    playerHands: [
      [
        { rank: 'J', suit: 'spades' },
        { rank: 'Q', suit: 'diamonds' }
      ]
    ],
    currentHandIndex: 0,
    canSplit: true,
    canDouble: true
  });
  const [analytics, setAnalytics] = useState({
    winRate: 0,
    gamesPlayed: 0,
    bestStreak: 0
  });

  return (
    <div className="game-container bg-gray-900 p-8 rounded-xl shadow-lg">
      <header className="flex justify-between items-center mb-8">
        <div className="stats-panel w-full">
          <h2 className="text-2xl font-bold text-white mb-2">Game Statistics</h2>
          <div className="grid grid-cols-3 gap-4">
            <StatCard title="Win Rate" value={`${analytics.winRate}%`} />
            <StatCard title="Games Played" value={analytics.gamesPlayed} />
            <StatCard title="Best Streak" value={analytics.bestStreak} />
          </div>
        </div>
      </header>

      <main className="game-table bg-gray-800 p-6 rounded-xl">
        <div className="dealer-section mb-8">
          <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center">
            Dealer's Hand
            <span className="ml-2 text-sm text-gray-400">
              {gameState.dealerHand[0].rank !== '?' && `(${calculateHandValue(gameState.dealerHand)})`}
            </span>
          </h3>
          <div className="dealer-cards flex gap-4">
            {gameState.dealerHand.map((card, index) => (
              <Card 
                key={index} 
                card={card} 
                faceUp={index === 0 || card.rank !== '?'} 
              />
            ))}
          </div>
        </div>

        {gameState.playerHands.map((hand, handIndex) => (
          <div 
            key={handIndex} 
            className={`player-hand mb-6 p-4 rounded-lg ${
              handIndex === gameState.currentHandIndex ? 'bg-blue-900/20 ring-2 ring-blue-500' : ''
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center">
              {handIndex === 0 ? 'Your Hand' : `Split Hand ${handIndex + 1}`}
              <span className="ml-2 text-sm text-gray-400">
                ({calculateHandValue(hand)})
              </span>
            </h3>
            <div className="player-cards flex gap-4 mb-4">
              {hand.map((card, cardIndex) => (
                <Card key={cardIndex} card={card} faceUp={true} />
              ))}
            </div>
          </div>
        ))}

        <div className="action-panel mt-8">
          <div className="basic-actions flex justify-center gap-4 mb-4">
            <button 
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              onClick={() => handleAction('hit')}
            >
              Hit
            </button>
            <button 
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              onClick={() => handleAction('stand')}
            >
              Stand
            </button>
          </div>
          
          <div className="advanced-actions flex justify-center gap-4">
            <button 
              className={`px-6 py-3 text-white rounded-lg transition-colors ${
                gameState.canDouble 
                  ? 'bg-yellow-600 hover:bg-yellow-700' 
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
              onClick={() => handleAction('double')}
              disabled={!gameState.canDouble}
            >
              Double Down
            </button>
            <button 
              className={`px-6 py-3 text-white rounded-lg transition-colors ${
                gameState.canSplit 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
              onClick={() => handleAction('split')}
              disabled={!gameState.canSplit}
            >
              Split
            </button>
          </div>
        </div>

        <div className="ai-advice mt-6 p-4 bg-blue-900/50 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-300 mb-2">AI Advice</h4>
          <p className="text-white">
            Based on the current situation, I recommend: 
            {getAIAdvice(gameState.playerHands[gameState.currentHandIndex], gameState.dealerHand[0])}
          </p>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
};

const Card = ({ card, faceUp = true }) => {
  const suits = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠',
    hidden: '?'
  };

  const suitColor = ['hearts', 'diamonds'].includes(card.suit) ? 'text-red-600' : 'text-gray-900';

  return (
    <div className={`
      relative w-24 h-36 rounded-lg shadow-lg transition-transform hover:scale-105
      ${faceUp ? 'bg-white' : 'bg-blue-900'}
    `}>
      {faceUp ? (
        <div className={`absolute inset-0 p-2 flex flex-col justify-between ${suitColor}`}>
          <span className="text-lg font-bold">{card.rank}</span>
          <span className="text-4xl self-center">{suits[card.suit]}</span>
          <span className="text-lg font-bold self-end rotate-180">{card.rank}</span>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-16 rounded border-2 border-blue-300/30" />
        </div>
      )}
    </div>
  );
};

// Helper functions
const calculateHandValue = (hand) => {
  let value = 0;
  let aces = 0;

  hand.forEach(card => {
    if (card.rank === '?') return;
    if (card.rank === 'A') {
      aces += 1;
      value += 11;
    } else if (['K', 'Q', 'J'].includes(card.rank)) {
      value += 10;
    } else {
      value += parseInt(card.rank);
    }
  });

  while (value > 21 && aces > 0) {
    value -= 10;
    aces -= 1;
  }

  return value;
};

const getAIAdvice = (playerHand, dealerUpCard) => {
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = dealerUpCard.rank === '?' ? 0 : calculateHandValue([dealerUpCard]);

  if (playerValue === 21) return "You have Blackjack! Stand.";
  if (playerValue > 21) return "Bust! You went over 21.";
  
  if (playerHand.length === 2 && playerHand[0].rank === playerHand[1].rank) {
    return "Consider splitting your pair.";
  }
  
  if (playerValue >= 17) return "Stand with a strong hand.";
  if (playerValue <= 11) return "Hit - you can't bust.";
  
  if (dealerValue >= 7) return "Hit to compete with dealer's strong card.";
  return "Stand with dealer showing weak card.";
};

const handleAction = (action) => {
  console.log(`Player chose to ${action}`);
  // Implementation would connect to game logic
};

export default BlackjackTable;