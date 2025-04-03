import { Direction } from "./Direction.model";
import { SemVer } from "semver";

export interface Issue {
  id: number;
  url: string;

  title: string;
  date: string;

  isPR: boolean;
  assignee: string | null;

  directions: Direction[];
  version: SemVer | null;
  labels: string[];

  flags: {
    triage: boolean;
    question: boolean;
    unanswered: boolean;
    helpWanted: boolean;
  };
}
