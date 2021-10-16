import { LSystemTypes } from "../types";
import AbstractLSystemRenderer from "./AbstractLSystemRenderer";
import degreeToRadian from '../utils/degreeToRadian'
import getCatets from "../utils/getCatets";
import { angles, LINE_LENGTH, rulesDictionary } from '../consts'


export default class LSystemFractalTreeRenderer extends AbstractLSystemRenderer {
  constructor() {
    super();
    this.init();
  }

  public render(alphabet: string) {
    const { ctx } = this;

    const commands = {
      "draw": () => {
        const state = this.currentState;

        ctx.save()
        ctx.translate(state.position.x, state.position.y)
        ctx.rotate(degreeToRadian(-state.angle));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.strokeStyle = '#B3CE3B'
        ctx.lineTo(LINE_LENGTH, 0);
        ctx.stroke();
        ctx.restore();

        const catets = getCatets({ hypotenuse: LINE_LENGTH, angle: state.angle })
        this.currentState = { position: { x: state.position.x + catets.x, y: state.position.y - catets.y }, angle: state.angle };
      },
      "rotateToRight": () => {
        this.currentState = { angle: this.currentState.angle - angles[LSystemTypes.FractalTree] };
      },
      "rotateToLeft": () => {
        this.currentState = { angle: this.currentState.angle + angles[LSystemTypes.FractalTree] };
      },
      "add": () => {
        this.stack.push({ ...this.currentState });
      },
      "remove": () => {
        this.currentState = this.stack.pop();
      }
    };

    for (let rule of alphabet) {
      const commandKey = rulesDictionary[LSystemTypes.FractalTree][rule];
      commands[commandKey as keyof typeof commands]();
    }
  }
}
