import { LSystemTypes } from "./types";

export const LINE_LENGTH = 15; // px

export const angles = {
  [LSystemTypes.PifagorTree]: 45,
  [LSystemTypes.FractalTree]: 25
};

export const rulesDictionary = {
  /**
   * @field {string} 0 - draw line
   * @field {string} 1 - add to stack position and angle, rotate 45 degrees
   * @field {string} -1 - remove from stack position and angle, rotate -45 degrees
   */
  [LSystemTypes.PifagorTree]: {
    "0": "0",
    "1": "0",
    "[": "1",
    "]": "-1"
  },
  [LSystemTypes.FractalTree]: {
    "F": "draw",
    "X": "draw",
    "[": "add",
    "]": "remove",
    "+": 'rotateToRight',
    "-": 'rotateToLeft'
  },
};
