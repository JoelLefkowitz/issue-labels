import { IssueAge } from "./IssueAge.model";

export interface IssueProperties {
  url: string;
  age: IssueAge;
  title: string;
  assignee: string | null;
  pr: boolean;
}
