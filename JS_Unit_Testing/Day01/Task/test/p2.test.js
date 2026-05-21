// //* problem 2
// //* input number 3 ==> output should be [0,1,2]

// export const createArray = (number) => {
//   const myArray = Array.from(Array(number).keys());
//   return myArray;
// };

// //? test that the return value of type array
// //? test if we pass 3 it will return array of length 3 and test it's include 1
// //? try to delay the testing process 5 seconds
// //? try to use different styles (expect , should , assert)
// //? after finishing your test process try to  run it on a browser//bonus
// //? make pending test case

// //^ createArray(3)>>>>>[0,1,2]
// //^ createArray(5)>>>[0,1,2,3,4]
// //& ////////////////////////////////////////////////////////

import * as chai from "chai";
const { expect, assert } = chai;
chai.should();

import { createArray } from "../index.js";

describe("createArray", () => {
  it("return value should be of type array", () => {
    expect(createArray(3)).to.be.an("array");
  });

  it("passing 3 returns array of length 3 that includes 1", () => {
    expect(createArray(3)).to.have.lengthOf(3);
    expect(createArray(3)).to.include(1);

    createArray(3).should.have.lengthOf(3);
    createArray(3).should.include(1);

    assert.lengthOf(createArray(3), 3);
    assert.include(createArray(3), 1);
  });

  describe("createArray", function () {
    this.timeout(6000);

    it("works correctly after a 5 second delay", (done) => {
      setTimeout(() => {
        assert.deepEqual(createArray(3), [0, 1, 2]);
        done();
      }, 5000);
    });
  });

  it("correct output - expect style", () => {
    expect(createArray(5)).to.deep.equal([0, 1, 2, 3, 4]);
    createArray(5).should.deep.equal([0, 1, 2, 3, 4]);
    assert.deepEqual(createArray(5), [0, 1, 2, 3, 4]);
  });

  it("should handle when 0 is passed"); // pending
  it("should handle negative numbers"); // pending
});
