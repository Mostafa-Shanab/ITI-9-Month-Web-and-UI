// //* problem 5
// export function Mult(x) {
//   return x * 2;
// }
// //? using assert
// //? 1- make sure that x > 0
// //? 2- make sure that the returned number will be above zero

// //& ////////////////////////////////////////////////////////////

import { assert } from "chai";
import { Mult } from "../index.js";

describe("Mult", () => {
  it("x should be above zero", () => {
    const x = 4;
    assert.isAbove(x, 0);
  });

  it("returned value should be above zero", () => {
    const x = 4;
    assert.isAbove(Mult(x), 0);
  });

  it("x is above zero and result is above zero", () => {
    const x = 4;
    assert.isAbove(x, 0); // check x first
    assert.isAbove(Mult(x), 0); // then check result
  });
});
