import { DateTime, Duration } from "luxon";
import { Environment } from "../models/Environment.model";
import { Issue } from "../models/Issue.model";
import { Octokit } from "octokit";
import { has } from "ramda";
import { isDirection, isNamed } from "./guards";
import semver from "semver";

export const issues = async (
  { remote, token }: Environment,
  limit?: string,
): Promise<Issue[]> => {
  const { rest, paginate } = new Octokit({ auth: token });

  const parsed: Issue[] = [];
  const maxAge = limit ? Duration.fromISO(limit) : null;

  for await (const { data: issues } of paginate.iterator(
    rest.issues.listForRepo,
    {
      owner: remote.owner,
      repo: remote.repository,
    },
  )) {
    for (const issue of issues) {
      const date = DateTime.fromISO(issue.created_at);
      const age = DateTime.now().diff(date);

      if (!date.isValid || (maxAge && age > maxAge)) {
        return parsed;
      }

      const labels = issue.labels.filter(isNamed).map(({ name }) => name);
      const version = labels.find((name) => /\d+\.[\dx]+\.[\dx]+/.test(name));

      parsed.push({
        id: issue.number,
        url: issue.html_url,

        title: issue.title,
        date: date.toISO(),

        isPR: has("pull_request", issue),
        assignee: issue.assignee?.login ?? null,

        directions: labels.filter(isDirection),
        version: version ? semver.parse(version) : null,
        labels,

        flags: {
          triage: labels.includes("triage"),
          question: labels.includes("question"),
          unanswered: labels.includes("unanswered"),
          helpWanted: labels.includes("help wanted"),
        },
      });
    }
  }

  return parsed;
};
