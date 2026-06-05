import { describe, it, expect } from "@jest/globals";
import { add } from "./lab";

describe("StringCalculator add()", () => {
  it("returns 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });

  it("returns 1 for '1'", () => {
    expect(add("1")).toBe(1);
  });

  it("returns 3 for '1,2'", () => {
    expect(add("1,2")).toBe(3);
  });

  it("returns 6 for '1,2,3' with an unknown count of numbers", () => {
    expect(add("1,2,3")).toBe(6);
  });

  it("returns 6 for '1\n2,3' when new lines and commas are mixed", () => {
    expect(add("1\n2,3")).toBe(6);
  });

  it("throws an error for negative numbers and includes all negatives", () => {
    expect(() => add("1,-2,-5,3")).toThrow("negatives not allowed: -2,-5");
  });
});
