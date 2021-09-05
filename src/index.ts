import LSystem from "./LSystem";
import LSystemVisualisation from "./LSystemVisualisation";
import { LSystemTypes } from "./types";

const visualisation = new LSystemVisualisation();

const pifagorTreeLSystem = new LSystem(LSystemTypes.PifagorTree);

visualisation.render(pifagorTreeLSystem.alphabet)
