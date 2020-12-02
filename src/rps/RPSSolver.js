const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;



class RPSSolver {
  constructor(villainStrategy, setRegretSum) {
    this.strategy = [0, 0, 0];
    this.regretSum = [0, 0, 0];
    this.strategySum = [0, 0, 0];
    this.villainStrategy = villainStrategy;
    this.setRegretSum = setRegretSum.bind(this)
  }

  getStrategy() {
    let normalizingSum = 0;

    for (let i = 0; i < 3; i++) {
      this.strategy[i] = this.regretSum[i] > 0 ? this.regretSum[i] : 0;
      normalizingSum += this.strategy[i];
    }

    for (let i = 0; i < 3; i++) {
      if (normalizingSum > 0) this.strategy[i] /= normalizingSum
      else this.strategy[i] = 0.333333333

      this.strategySum[i] += this.strategy[i];
    }

    return this.strategy;
  }

  getAction(strategy) {
        let rand = Math.random();
        let i = 0;
        let cumulativeProbability = 0;
        while (i < 2) {
            cumulativeProbability += strategy[i];
            if (rand < cumulativeProbability) break;
            i++;
        }
        return i;
  }

  train(iterations) {
    let actionUtility = [];
    let strategy, heroAction, villainAction;
    for (let i = 0; i < iterations; i++) {
      strategy = this.getStrategy();
      heroAction = this.getAction(strategy);
      villainAction = this.getAction(this.villainStrategy);

      actionUtility[villainAction] = 0;
      actionUtility[villainAction === 2 ? 0 : villainAction + 1] = 1;
      actionUtility[villainAction === 0 ? 2 : villainAction - 1] = -1;

      for (let j = 0; j < 3; j++) {
        this.regretSum[j] += actionUtility[j] - actionUtility[heroAction];
        if( i % 100 === 0) this.setRegretSum([...this.regretSum]);
      }
    }
  }

  getAvgStrategy() {
    let avgStrategy = [0, 0, 0];
    let normalizingSum = this.strategySum.reduce((a, b) => a + b);

    for (let i = 0; i < 3; i++) {
      if (normalizingSum > 0) avgStrategy[i] = this.strategySum[i] / normalizingSum;
      else avgStrategy[i] = 0.333333333
    }
    return avgStrategy;
  }
};

export default RPSSolver;
