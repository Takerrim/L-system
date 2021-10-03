import { LSystemTypes } from "./types";

type RuleType = {
  rules: Record<string, string>;
  axiom: string;
  vars: string;
  consts: string;
  maxIterations: number;
};

const rulesMap: Record<LSystemTypes, RuleType> = {
  [LSystemTypes.PifagorTree]: {
    rules: {
      "0": "1[0]0",
      "1": "11"
    },
    axiom: "0",
    vars: '01',
    consts: '[]',
    maxIterations: 5,
  },
  [LSystemTypes.FractalTree]: {
    rules: {
      "X": "F-[[X]+X]+F[+FX]-X",
      "F": "FF",
    },
    axiom: "X",
    vars: 'XF',
    consts: '+-[]',
    maxIterations: 2,
  },
};

export default class LSystem {
  private alphabet!: string;

  private currentIterationCount: number = 0

  constructor(private ruleName: LSystemTypes) {
    this.alphabet = rulesMap[ruleName].axiom;
  }

  public getOutput() {
    const { maxIterations, consts, rules } = rulesMap[this.ruleName];

    if (this.currentIterationCount === maxIterations) {
      return this.alphabet;
    }

    let output = "";

    for (let i = 0; i < this.alphabet.length; ++i) {
      const sign = this.alphabet[i];
      output += consts.includes(sign) ? sign : rules[sign];
    }

    this.alphabet = output;
    this.currentIterationCount++;
    return this.getOutput();
  }
}
