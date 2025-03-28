import { DateTime, Duration } from "luxon";

export interface IssueAge {
  created: DateTime;
  age: Duration;
  human: string;
}
