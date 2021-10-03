import LSystem from "./LSystem";
import LSystemVisualisation from "./LSystemVisualisation";
import { LSystemTypes } from "./types";

const visualisation = new LSystemVisualisation();

const output = new LSystem(LSystemTypes.FractalTree).getOutput();

visualisation.render(output)
