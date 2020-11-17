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
    let strategy = Math.max(0, this.cumulativeRegrets);
    let norm = this.normalize(strategy);
    let reachStrat = 

  }

}

class KuhnSolver {
  hello() {
    return 'Hello World'
  }
}

export default KuhnSolver;
