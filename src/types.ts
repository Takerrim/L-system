export enum LSystemTypes {
  PifagorTree = "PifagorTree",
  FractalTree = "FractalTree",
}

export interface IState {
  position: IPosition
  angle: number;
}

export interface IPosition {
  x: number;
  y: number;
}
