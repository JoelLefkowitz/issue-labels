import { DateTime, Duration } from "luxon";
import { Environment } from "../models/Environment.model";
import { IssueResponse } from "../models/IssueResponse.model";
import { Octokit } from "octokit";
import { has } from "ramda";

export const fetch = async (
  { token, owner, repo }: Environment,
  limit?: Duration,
): Promise<IssueResponse[]> => {
  const { rest, paginate } = new Octokit({ auth: token });

  const now = DateTime.now();
  const aged: IssueResponse[] = [];

  for await (const { data: issues } of paginate.iterator(
    rest.issues.listForRepo,
    { owner, repo },
  )) {
    for (const issue of issues) {
      const { number, created_at, title, html_url } = issue;
      const assignee = issue.assignee?.login ?? null;

      const labels = issue.labels.reduce<string[]>(
        (acc, x) =>
          typeof x === "string"
            ? acc.concat(x)
            : x.name
              ? acc.concat(x.name)
              : acc,
        [],
      );

      const created = DateTime.fromISO(created_at);
      const age = now.diff(created);

      if (limit && age > limit) {
        return aged;
      }

      aged.push({
        id: number,
        title,
        url: html_url,
        age: {
          age,
          created,
          human: age
            .shiftTo("years", "months", "days")
            .toHuman({ maximumFractionDigits: 0 }),
        },
        pr: has("pull_request", issue),
        labels,
        assignee,
      });
    }
  }

  return aged;
};
