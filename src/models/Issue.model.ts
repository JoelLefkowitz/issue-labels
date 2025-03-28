import { IssueProperties } from "./IssueProperties.model";
import { Labels } from "./Label.model";

export interface Issue {
  id: number;
  properties: IssueProperties;
  labels: Labels;
}
