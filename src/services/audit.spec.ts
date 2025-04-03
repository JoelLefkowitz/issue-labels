import { Check } from "../models/Check.model";
import { Issue } from "../models/Issue.model";
import { SemVer } from "semver";
import { audit } from "./audit";
import { issue } from "../../tests/mocks";

describe("audit", () => {
  const check: Check<Issue> = {
    conditions: ({ version }) => [!version],
    message: "Missing a version label",
  };

  it("checks if each input matches each set of conditions", () => {
    const input = {
      ...issue,
      version: new SemVer("1.0.0"),
    };

    expect(audit([check], [input])).toEqual([]);
  });

  it("collects error messages for each failed set of conditions", () => {
    expect(audit([check], [issue])).toEqual([
      {
        input: issue,
        problems: [check.message],
      },
    ]);
  });
});
