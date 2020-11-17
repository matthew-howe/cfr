const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

class RPSSolverSelfTrain {
  constructor(villainStrategy, setRegretSum) {
    this.strategy = [0, 0, 0];
    this.regretSum = [0, 0, 0];
    this.strategySum = [0, 0, 0];
    this.villainStrategy = villainStrategy;
    this.setRegretSum = setRegretSum.bind(this);

    this.villStrategy = [0, 0, 0];
    this.villRegretSum = [0, 0, 0];
    this.villStrategySum = [0, 0, 0];
  }

  getStrategy() {
    let normalizingSum = 0;

    for (let i = 0; i < 3; i++) {
      this.strategy[i] = this.regretSum[i] > 0 ? this.regretSum[i] : 0;
      normalizingSum += this.strategy[i];
    }

    if (normalizingSum === 0) {
      let randomStrat = this.getRandomStrat();
      console.log('New random strat created: ', randomStrat);
      this.strategy = randomStrat;
      normalizingSum = 1;
    }

    for (let i = 0; i < 3; i++) {
      this.strategy[i] /= normalizingSum;
      this.strategySum[i] += this.strategy[i];
    }
    return this.strategy;
  }

  getVillStrategy() {
    let normalizingSumOpp = 0;
    for (let i = 0; i < 3; i++) {
      this.villStrategy[i] =
        this.villRegretSum[i] > 0 ? this.villRegretSum[i] * 1.0 : 0.0;
      normalizingSumOpp += this.villStrategy[i];
    }
    if (normalizingSumOpp === 0) {
      let randomStrat = this.getRandomStrat();
      this.villStrategy = randomStrat;
      normalizingSumOpp = 1;
    }

    for (let i = 0; i < 3; i++) {
      this.villStrategy[i] /= normalizingSumOpp;
      this.villStrategySum[i] += this.villStrategy[i];
    }
    return this.villStrategy;
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
    let villActionUtility = [];
    let strategy, heroAction, villStrategy, villainAction;
    for (let i = 0; i < iterations; i++) {
      strategy = this.getStrategy();
      heroAction = this.getAction(strategy);
      villStrategy = this.getVillStrategy();
      villainAction = this.getAction(this.villStrategy);

      actionUtility[villainAction] = 0;
      actionUtility[villainAction === 2 ? 0 : villainAction + 1] = 1;
      actionUtility[villainAction === 0 ? 2 : villainAction - 1] = -1;
      villActionUtility[heroAction] = 0;
      villActionUtility[heroAction === 3 - 1 ? 0 : heroAction + 1] = 1;
      villActionUtility[heroAction === 0 ? 3 - 1 : heroAction - 1] = -1;

      for (let j = 0; j < 3; j++) {
        this.regretSum[j] += actionUtility[j] - actionUtility[heroAction];
        this.villRegretSum[j] +=
          villActionUtility[j] - villActionUtility[villainAction];
        if (i % 100 === 0) this.setRegretSum([...this.regretSum]);
      }
    }
  }
  getRandomStrat() {
    let action1 = Math.random();
    let action2 = Math.random();
    let action3 = Math.random();
    let sum = action1 + action2 + action3;
    return [action1 / sum, action2 / sum, action3 / sum];
  }

  getAvgStrategy() {
    let avgStrategy = [0, 0, 0];
    let normalizingSum = this.strategySum.reduce((a, b) => a + b);

    for (let i = 0; i < 3; i++) {
      if (normalizingSum > 0)
        avgStrategy[i] = this.strategySum[i] / normalizingSum;
      else avgStrategy[i] = 0.333333333;
    }
    return avgStrategy;
  }
}

export default RPSSolverSelfTrain;
