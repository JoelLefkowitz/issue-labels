import { environment } from "./environment";

describe("environment", () => {
  beforeEach(() => {
    delete process.env.GITHUB_REPOSITORY;
    delete process.env.GITHUB_TOKEN;
  });

  it("throws an error if the GITHUB_REPOSITORY environment variable is not set", () => {
    expect(environment).toThrow(
      "Missing a GITHUB_REPOSITORY environment variable",
    );
  });

  it("throws an error if the GITHUB_REPOSITORY has no owner name", () => {
    process.env.GITHUB_REPOSITORY = "owner/";
    expect(environment).toThrow(
      "Could not parse the repository name from the GITHUB_REPOSITORY environment variable 'owner/'",
    );
  });

  it("throws an error if the GITHUB_REPOSITORY has no repository name", () => {
    process.env.GITHUB_REPOSITORY = "/repository";
    expect(environment).toThrow(
      "Could not parse the owner name from the GITHUB_REPOSITORY environment variable '/repository'",
    );
  });

  it("fetches the owner name from the GITHUB_REPOSITORY environment variable", () => {
    process.env.GITHUB_REPOSITORY = "owner/repository";
    const { remote } = environment();
    expect(remote.owner).toBe("owner");
    expect(remote.repository).toBe("repository");
  });

  it("fetches a token from the GITHUB_TOKEN environment variable", () => {
    process.env.GITHUB_REPOSITORY = "owner/repository";
    process.env.GITHUB_TOKEN = "token";
    const { token } = environment();
    expect(token).toBe("token");
  });
});
