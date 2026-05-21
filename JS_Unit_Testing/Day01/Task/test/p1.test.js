// export const capitalizeText = (input) => {
//   if (typeof input !== "string") {
//     throw new TypeError("parameter should be string");
//   }
//   return input.toUpperCase();
// };

// //? test that the function takes a string  it will return a string
// //? test that the function takes a string and return it after capitalize it
// //? test if the function takes number it will throw type error says parameter should be string
// //? make sure that this function accept one param only
// //& ////////////////////////////////////////////////////////

import { expect } from "chai";
import { capitalizeText } from "../index.js";

describe("capitalizeText", () => {
  it("returns a string", () => {
    expect(capitalizeText("shanab")).to.be.a("string");
  });

  it("capitalizes the input", () => {
    expect(capitalizeText("shanab")).to.equal("SHANAB");
  });

  it("throws TypeError for non-string input", () => {
    expect(() => capitalizeText(12)).to.throw(TypeError);
  });

  it("function accepts only one parameter", () => {
    expect(capitalizeText.length).to.equal(1);
  });
});
