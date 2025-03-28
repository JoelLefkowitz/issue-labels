import { environment } from "./environment";

describe("environment", () => {
  beforeEach(() => {
    delete process.env.GITHUB_TOKEN;
  });

  it("fetches the GITHUB_TOKEN environment variable", () => {
    process.env.GITHUB_TOKEN = "token";
    expect(environment().token).toBe("token");
  });
});
