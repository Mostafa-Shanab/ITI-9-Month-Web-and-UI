const { MathUtils } = require("../index");

describe("MathUtils Full Testing", () => {
  let math;

  beforeEach(() => {
    math = new MathUtils();
  });

  describe("sum()", () => {
    it("should add two positive numbers", () => {
      expect(math.sum(2, 3)).toBe(5);
    });

    it("should return number type", () => {
      expect(typeof math.sum(2, 3)).toBe("number");
    });

    it("should throw error if parameters are strings", () => {
      expect(() => {
        math.sum("2", "3");
      }).toThrowError();
    });

    it("should throw error if one parameter missing", () => {
      expect(() => {
        math.sum(5);
      }).toThrowError();
    });

    it("should throw error if parameters are more than 2", () => {
      expect(() => {
        math.sum(5, 10, 20);
      }).toThrowError();
    });
  });

  describe("divide()", () => {
    it("should divide correctly", () => {
      expect(math.divide(6, 2)).toBe(3);
    });

    it("should return number type", () => {
      expect(typeof math.divide(6, 2)).toBe("number");
    });

    it("should throw error when dividing by zero", () => {
      expect(() => {
        math.divide(5, 0);
      }).toThrowError();
    });
  });

  describe("factorial()", () => {
    it("should calculate factorial correctly", () => {
      expect(math.factorial(5)).toBe(120);
    });

    it("should return number type", () => {
      expect(typeof math.factorial(5)).toBe("number");
    });

    it("should return 1 for factorial 0", () => {
      expect(math.factorial(0)).toBe(1);
    });

    it("should throw error for negative number", () => {
      expect(() => {
        math.factorial(-5);
      }).toThrowError();
    });

    it("should throw error for string", () => {
      expect(() => {
        math.factorial("hello");
      }).toThrowError();
    });

    it("should throw error for decimal numbers", () => {
      expect(() => {
        math.factorial(2.5);
      }).toThrowError();
    });
  });

  describe("checkPositivity()", () => {
    it("should return true for positive number", () => {
      expect(math.checkPositivity(5)).toBeTrue();
    });

    it("should return false for negative number", () => {
      expect(math.checkPositivity(-5)).toBeFalse();
    });

    it("should return boolean type", () => {
      expect(typeof math.checkPositivity(5)).toBe("boolean");
    });

    it("should throw error for invalid type", () => {
      expect(() => {
        math.checkPositivity("text");
      }).toThrowError();
    });
  });
});
