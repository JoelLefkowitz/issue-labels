import { Issue } from "../models/Issue.model";
import { IssueResponse } from "../models/IssueResponse.model";
import { isDirection } from "./guards";
import semver from "semver";

export const parse = (response: IssueResponse): Issue => {
  const { id, url, age, labels, title, assignee, pr } = response;
  const version = labels.find((name) => /\d+\.[\dx]+\.[\dx]+/.test(name));

  return {
    id,
    properties: {
      url,
      age,
      title,
      assignee,
      pr,
    },
    labels: {
      labels,
      version: version ? semver.parse(version) : null,
      directions: labels.filter(isDirection),
      flags: {
        triage: labels.includes("triage"),
        helpWanted: labels.includes("help wanted"),
        question: labels.includes("question"),
        unanswered: labels.includes("unanswered"),
      },
    },
  };
};
