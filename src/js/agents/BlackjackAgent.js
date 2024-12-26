export class BlackjackAgent {
  constructor(name, avatar, stats = {}) {
    this.name = name;
    this.avatar = avatar;
    this.stats = {
      gamesPlayed: stats.gamesPlayed || 0,
      winRate: stats.winRate || 0,
      highScore: stats.highScore || 0
    };
  }

  getAdvice(playerHand, dealerUpCard) {
    const playerValue = playerHand.value;
    const dealerValue = dealerUpCard.value;

    if (playerValue >= 17) return 'Stand';
    if (playerValue <= 11) return 'Hit';
    if (playerValue === 12 && dealerValue >= 4 && dealerValue <= 6) return 'Stand';
    if (playerValue >= 13 && playerValue <= 16 && dealerValue >= 2 && dealerValue <= 6) return 'Stand';
    
    return 'Hit';
  }

  updateStats(won) {
    this.stats.gamesPlayed++;
    this.stats.winRate = ((this.stats.winRate * (this.stats.gamesPlayed - 1) + (won ? 1 : 0)) / this.stats.gamesPlayed);
  }
}
