import { Direction, directions } from "../models/Direction.model";
import { has } from "ramda";

export const isNamed = (obj: unknown): obj is { name: string } =>
  has("name", obj);

export const isDirection = (str: string): str is Direction =>
  directions.includes(str as Direction);
