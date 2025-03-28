import { IssueAge } from "./IssueAge.model";

export interface IssueResponse {
  id: number;
  title: string;
  url: string;
  age: IssueAge;
  pr: boolean;
  labels: string[];
  assignee: string | null;
}
