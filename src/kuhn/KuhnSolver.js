class InformationSet {
  constructor() {
    this.cumulativeRegrets = [0, 0];
    this.strategySum = [0, 0];
  }

  normalize(strategy) {
    let normalized = strategy.slice();
    const sum = strategy.reduce((a,b) => a+b);
    if (sum > 0) {
      for (let i = 0; i < 2; i++) {
        normalized[i] /= sum; 
      }
    } else {
      normalized = [0.5, 0.5];
    }
    return normalized;
  }

  getStrategy(reachProb) {
    let strategy = this.cumulativeRegrets.map(el => el > 0 ? el : 0);
    let normlizedStrat = this.normalize(strategy);
    let weightedStrat = normalizedStrat.map(el => el * reachProb);
    for (let i = 0; i < 2; i++) {
      this.strategySum[i] += weightedStrat[i];
    }
    
    return weightedStrat;
  }

  getAvgStrategy() {
    return this.normalize(this.strategySum.slice());
  }

}

class KuhnSolver {
  hello() {
    return 'Hello World'
  }

  isTerminal(history) {
    return ['BC', 'BB', 'CC', 'CBB', 'CBC'].includes(history);
  }

  getPayoff(history, cards) {
    if (['BC', 'CBC'].includes(history)) {
      return +1;
    } else {
      let payoff = history.includes('B') ? 2 : 1;
      let activePlayer = history.length % 2;
      let playerCard = cards[activePlayer];
      let villCard = cards[(activePlayer + 1) % 2];
      if (playerCard === 'K' || villCard === 'J') {
        return payoff;
      } else {
        return -payoff;
      }
    }
  }
}

export default KuhnSolver;
