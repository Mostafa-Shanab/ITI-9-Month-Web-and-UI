const { MathUtils, sayHelloWorld, obj } = require("../index.js");

//? describe --> suite
xdescribe("Test MathUtils", () => {
  let math;
  beforeAll(() => {
    math = new MathUtils();
  });
  //? it --> spec
  it("test sum method", () => {
    expect(math.sum(1, 2)).toEqual(3);
    expect(math.sum(1, 2)).toEqual(jasmine.any(Number));
  });

  it("diff btn toEqual and toBe", () => {
    let obj1 = { id: 1 };
    let obj2 = { id: 1 };
    expect(obj1).toEqual(obj2); //? deep
    // expect(obj1).toBe(obj2) //? shallow
  });
});

xdescribe("study spyOn Concept", () => {
  it("test hello inside obj", () => {
    spyOn(obj, "hello");
    sayHelloWorld(obj);
    //  sayHelloWorld(obj)
    expect(obj.hello).toHaveBeenCalled();
    expect(obj.hello).toHaveBeenCalledTimes(1);
    expect(obj.hello).toHaveBeenCalledWith(3);
    expect(obj.hello).toHaveBeenCalledOnceWith(3);
  });
});

xdescribe("Add Custom Matcher", () => {
  beforeEach(() => {
    jasmine.addMatchers({
      toBeGreaterThan1000: function () {
        return {
          compare: function (actual) {
            let res = {};
            res.pass = actual > 1000;
            res.message = "the num should be greater than 1000";
            return res;
          },
        };
      },
    });
  });
  it("", () => {
    expect(500).toBeGreaterThan1000()
  });
});

describe("study clock and tick",()=>{
    beforeAll(()=>{
        jasmine.clock().install()
    })
    afterAll(()=>{
        jasmine.clock().uninstall()
    })

    it("",()=>{
        let x = 5;
        setTimeout(()=>{
            x=10
        },1000)
        jasmine.clock().tick(1000)
        expect(x).toEqual(10)
    })
})