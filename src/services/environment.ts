import { Environment } from "../models/Environment.model";

export const environment = (): Environment => {
  const token = process.env.GITHUB_TOKEN ?? null;
  const source = process.env.GITHUB_REPOSITORY;

  if (!source) {
    throw new Error("Missing a GITHUB_REPOSITORY environment variable");
  }

  const [owner, repo] = source.split("/");

  if (!owner) {
    throw new Error(`Couldn't parse the owner name from ${source}`);
  }

  if (!repo) {
    throw new Error(`Couldn't parse the repository name from ${source}`);
  }

  return {
    token,
    owner,
    repo,
  };
};
