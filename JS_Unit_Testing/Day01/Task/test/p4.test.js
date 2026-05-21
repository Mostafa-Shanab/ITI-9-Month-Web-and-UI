// //* problem 4
// export function CheckPositivity(x) {
//   if (x > 0) {
//     return true;
//   } else {
//     return false;
//   }
// }

// //? check the expected value using expect , should and assert if x = 4 , x = -1 and x=0
// //& ////////////////////////////////////////////////////////

import * as chai from "chai";
import { CheckPositivity } from "../index.js";

const { expect, assert } = chai;
chai.should();

describe("CheckPositivity", () => {
  describe("when x = 4", () => {
    it("returns true - expect", () => {
      expect(CheckPositivity(4)).to.be.true;
    });

    it("returns true - should", () => {
      CheckPositivity(4).should.be.true;
    });

    it("returns true - assert", () => {
      assert.isTrue(CheckPositivity(4));
    });
  });

  describe("when x = -1", () => {
    it("returns false - expect", () => {
      expect(CheckPositivity(-1)).to.be.false;
    });

    it("returns false - should", () => {
      CheckPositivity(-1).should.be.false;
    });

    it("returns false - assert", () => {
      assert.isFalse(CheckPositivity(-1));
    });
  });

  describe("when x = 0", () => {
    it("returns false - expect", () => {
      expect(CheckPositivity(0)).to.be.false;
    });

    it("returns false - should", () => {
      CheckPositivity(0).should.be.false;
    });

    it("returns false - assert", () => {
      assert.isFalse(CheckPositivity(0));
    });
  });
});
