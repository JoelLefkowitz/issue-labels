import { Environment } from "../src/models/Environment.model";
import { Issue } from "../src/models/Issue.model";

const fetch = jest.spyOn(global, "fetch");

export const mockAPI = (payload: unknown) =>
  fetch.mockImplementation(() =>
    Promise.resolve(
      new Response(JSON.stringify(payload), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ),
  );

export const environment: Environment = {
  token: null,
  remote: {
    owner: "owner",
    repository: "repository",
  },
};

export const issue: Issue = {
  id: 1,
  url: "https://github.com/owner/repository/issues/1",

  title: "Issue title",
  date: "2025-01-01T00:00:00.000+00:00",

  isPR: false,
  assignee: null,

  directions: [],
  version: null,
  labels: [],

  flags: {
    question: false,
    triage: false,
    unanswered: false,
    helpWanted: false,
  },
};

export const payload = {
  number: 1,
  title: issue.title,
  html_url: issue.url,
  created_at: issue.date,
  labels: [],
};
