// //* problem 3
// export let obj = { id: 1 };
// export let obj1 = { x: obj };
// export let obj2 = { x: obj };
// //? check whether obj1 is equal to obj2 using expect , should and assert

// //& ////////////////////////////////////////////////////////

import * as chai from "chai";
import { obj1, obj2 } from "../index.js";

const { expect, assert } = chai;
chai.should();

describe("obj1 equals obj2", () => {
  it("obj1 deeply equals obj2 - expect", () => {
    expect(obj1).to.deep.equal(obj2);
  });

  it("obj1 deeply equals obj2 - should", () => {
    obj1.should.deep.equal(obj2);
  });

  it("obj1 deeply equals obj2 - assert", () => {
    assert.deepEqual(obj1, obj2);
  });

  // it("obj1 equals obj2", () => {
  //   //This FAILS — checks if they are the exact same object in memory
  //   expect(obj1).to.equal(obj2); // FAIL
  //   obj1.should.equal(obj2); // FAIL
  //   assert.equal(obj1, obj2); // FAIL
  // });

  it("obj1 deep equals obj2", () => {
    //This PASSES — checks if they have the same content
    expect(obj1).to.deep.equal(obj2); // PASS
    obj1.should.deep.equal(obj2); // PASS
    assert.deepEqual(obj1, obj2); // PASS
  });
});
