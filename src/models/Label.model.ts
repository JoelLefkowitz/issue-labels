import { Direction } from "./Direction.model";
import { Flags } from "./Flags.model";
import { SemVer } from "semver";

export interface Labels {
  labels: string[];
  version: SemVer | null;
  directions: Direction[];
  flags: Flags;
}
