import LSystem from "./LSystem";
import {
  LSystemPifagorTreeRenderer,
  LSystemFractalTreeRenderer,
} from "./l-system-renderer";

import { LSystemTypes } from "./types";

const changeTree = (event: { target: HTMLButtonElement }) => {
  document.querySelector('canvas').remove()
  const tree = event.target.dataset.tree
  switch (tree) {
    case 'pifagorTree':
      const pifagorTreeRenderer = new LSystemPifagorTreeRenderer();
      pifagorTreeRenderer.render(new LSystem(LSystemTypes.PifagorTree).getOutput())
      break;
    case 'fractalTree':
      const fractalTreeRenderer = new LSystemFractalTreeRenderer();
      fractalTreeRenderer.render(new LSystem(LSystemTypes.FractalTree).getOutput())
      break;
  }
}

const buttons = document.querySelectorAll('.button')

buttons.forEach((button) => {
  button.addEventListener('click', changeTree)
})

const pifagorTreeRenderer = new LSystemPifagorTreeRenderer();

const output = new LSystem(LSystemTypes.PifagorTree).getOutput();

pifagorTreeRenderer.render(output)
