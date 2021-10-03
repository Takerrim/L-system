import { LSystemTypes } from "./types";
import AbstractLSystemDrawer from "./AbstractLSystemDrawer";
import degreeToRadian from './utils/degreeToRadian'
import getCatets from "./utils/getCatets";

const LINE_LENGTH = 20; // px

const angles = {
  [LSystemTypes.PifagorTree]: 45,
  [LSystemTypes.FractalTree]: 25
};

const rulesDictionary = {
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
    "F": "0",
    "X": "0",
    "[": "1",
    "]": "-1",
    "+": '1',
    "-": '-1'
  },
};

export default class LSystemCanvas extends AbstractLSystemDrawer {
  constructor() {
    super();
    this.init();
  }

  private draw(alphabet: string) {
    const { ctx } = this;

    const commands = {
      "0": () => {
        const state = this.currentState;

        ctx.save()
        ctx.translate(state.position.x, state.position.y)
        ctx.rotate(degreeToRadian(-state.angle));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(LINE_LENGTH, 0);
        ctx.stroke();
        ctx.restore();

        const catets = getCatets({ hypotenuse: LINE_LENGTH, angle: state.angle })
        this.currentState = { position: { x: state.position.x + catets.x, y: state.position.y - catets.y }, angle: state.angle };
      },
      "1": () => {
        const { currentState } = this;
        this.stack.push({ ...currentState });
        this.currentState = { angle: currentState.angle - angles[LSystemTypes.PifagorTree] };
      },
      "-1": () => {
        const state = this.stack.pop();
        this.currentState = { position: state.position, angle: state.angle + angles[LSystemTypes.PifagorTree] };
      }
    };

    for (let i = 0; i < alphabet.length; ++i) {
      const rule = alphabet[
        i
      ] as keyof typeof rulesDictionary[LSystemTypes.PifagorTree];

      const commandKey = rulesDictionary[LSystemTypes.PifagorTree][rule];


      commands[commandKey as keyof typeof commands]();
    }
  }

  public render(alphabet: string) {
    this.draw(alphabet);
  }
}
