import { LSystemTypes } from "../types";
import AbstractLSystemRenderer from "./AbstractLSystemRenderer";
import degreeToRadian from '../utils/degreeToRadian'
import getCatets from "../utils/getCatets";
import { angles, LINE_LENGTH, rulesDictionary } from '../consts'


export default class LSystemPifagorTreeRenderer extends AbstractLSystemRenderer {
  constructor() {
    super();
    this.init();
  }

  public render(alphabet: string) {
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

    for (let rule of alphabet) {
      const commandKey = rulesDictionary[LSystemTypes.PifagorTree][rule];
      commands[commandKey as keyof typeof commands]();
    }
  }
}
