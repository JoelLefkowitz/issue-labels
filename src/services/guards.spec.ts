import { isDirection, isNamed } from "./guards";

describe("isNamed", () => {
  it("checks if an object has a name property", () => {
    expect(isNamed({})).toBe(false);
    expect(isNamed({ name: "" })).toBe(true);
  });
});

describe("isDirection", () => {
  it("checks if a string is a direction", () => {
    expect(isDirection("")).toBe(false);
    expect(isDirection("bug")).toBe(true);
  });
});
