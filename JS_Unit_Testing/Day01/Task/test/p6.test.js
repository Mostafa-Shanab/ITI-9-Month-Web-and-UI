// //* problem 6
// export let obj3 = { a: { b: [{ x: 1 }] } };
// //? using assert check 'a.b[0]' will include {x: 1}

// //& ////////////////////////////////////////////////////////

import { assert } from "chai";
import { obj3 } from "../index.js";

describe("obj3", () => {
  it("a.b[0] deep equal { x: 1 }", () => {
    assert.deepEqual(obj3.a.b[0], { x: 1 });
  });
  // it("a.b[0] equal { x: 1 }", () => {
  //   //FAILS — compares memory address, not content
  //   assert.equal(obj3.a.b[0], { x: 1 });
  // });
});
