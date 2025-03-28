import { Direction, directions } from "../models/Direction.model";

export const isDirection = (str: string): str is Direction =>
  directions.includes(str as Direction);
