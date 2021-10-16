import { IState } from "../types";

export default abstract class AbstractLSystemDrawer {
  protected ctx!: CanvasRenderingContext2D;

  protected stack: IState[] = [];

  protected state: IState = {} as IState;

  protected init() {
    this.ctx = document
      .createElement("canvas")
      .getContext("2d") as CanvasRenderingContext2D;

    const { ctx } = this;
    const { body } = document;

    ctx.canvas.width = body.clientWidth;
    ctx.canvas.height = body.clientHeight;
    body.append(ctx.canvas);

    const position = { x: ctx.canvas.width / 2, y: ctx.canvas.height };
    this.currentState = { position, angle: 90 }
  }

  protected get currentState(): IState {
    return this.state;
  }

  public destroy() {
    this.ctx.canvas.remove()
  }

  protected set currentState(state: Partial<IState>) {
    Object.assign(this.state, state);
  }

  public abstract render(alphabet: string): void;
}
