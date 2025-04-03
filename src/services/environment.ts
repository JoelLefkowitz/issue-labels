import { Environment } from "../models/Environment.model";

export const environment = (): Environment => {
  const { GITHUB_REPOSITORY: remote, GITHUB_TOKEN: token } = process.env;

  if (!remote) {
    throw new Error("Missing a GITHUB_REPOSITORY environment variable");
  }

  const [owner, repository] = remote.split("/");

  if (!owner) {
    throw new Error(
      `Could not parse the owner name from the GITHUB_REPOSITORY environment variable '${remote}'`,
    );
  }

  if (!repository) {
    throw new Error(
      `Could not parse the repository name from the GITHUB_REPOSITORY environment variable '${remote}'`,
    );
  }

  return {
    token: token ?? null,
    remote: {
      owner,
      repository,
    },
  };
};
