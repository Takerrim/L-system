import { LSystemTypes } from "./types";

type RuleType = {
  rules: Record<string, string>;
  axiom: string;
  vars: string[];
  consts: string[];
  maxIterations: number;
  count: number;
};

const rulesMap: Record<LSystemTypes, RuleType> = {
  [LSystemTypes.PifagorTree]: {
    rules: {
      "0": "1[0]0",
      "1": "11"
    },
    axiom: "0",
    vars: ["0", "1"],
    consts: ["[", "]"],
    maxIterations: 5,
    count: 0
  }
};

export default class LSystem {
  public alphabet!: string;

  constructor(private ruleName: LSystemTypes) {
    this.alphabet = rulesMap[ruleName].axiom;
    this.getOutput();
  }

  private getOutput() {
    const rulesInfo = rulesMap[this.ruleName];

    if (rulesInfo.count === rulesInfo.maxIterations) {
      return this.alphabet;
    }

    const arr = this.alphabet.split("");
    let output = "";

    for (let i = 0; i < arr.length; ++i) {
      const sign = arr[i];

      if (rulesInfo.consts.includes(sign)) {
        output += sign;
        continue;
      }
      output += rulesInfo.rules[sign];
    }

    this.alphabet = output;
    rulesInfo.count++;
    this.getOutput();
  }
}
