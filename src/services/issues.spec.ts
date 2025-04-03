import { SemVer } from "semver";
import {
  environment,
  mockAPI,
  payload,
  issue as sample,
} from "../../tests/mocks";
import { issues } from "./issues";

describe("issues", () => {
  it("fetches GitHub issues from a repository", async () => {
    mockAPI([payload]);

    const [issue] = await issues(environment);
    expect(issue).toMatchObject(sample);
  });

  it("parses the issue assignee", async () => {
    mockAPI([
      {
        ...payload,
        assignee: { login: "owner" },
      },
    ]);

    const [issue] = await issues(environment);
    expect(issue).toMatchObject({ assignee: "owner" });
  });

  it("parses the issue version", async () => {
    mockAPI([
      {
        ...payload,
        labels: [{ name: "v1.0.0" }],
      },
    ]);

    const [issue] = await issues(environment);
    expect(issue).toMatchObject({
      version: new SemVer("v1.0.0"),
      labels: ["v1.0.0"],
    });
  });

  it("stops fetching issues over the age limit", async () => {
    mockAPI(
      [
        "2025-01-01T00:00:00.000Z",
        "2025-01-01T00:00:00.000Z",
        "1970-01-01T00:00:00.000Z",
      ].map((created_at) => ({
        ...payload,
        created_at,
      })),
    );

    expect(await issues(environment, "P1D")).toHaveLength(2);
  });
});
