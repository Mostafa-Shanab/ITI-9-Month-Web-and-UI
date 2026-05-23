import * as chai from "chai";
const {assert,expect} = chai;
chai.should();

import { Calculator , Shape , fetchUsingCallback ,fetchUsingPromise} from "../index.js";

// before(()=>{
//     console.log("before");
// })
// after(()=>{
//     console.log("after");
// })
// beforeEach(()=>{
//     console.log("beforeEach");
// })
// afterEach(()=>{
//     console.log("afterEach");
// })

describe("test Calculator class",()=>{
    let calc
    before(()=>{
       calc = new Calculator()
    })
    it("test calc",()=>{
      expect(calc).to.be.an.instanceOf(Calculator)
    })
     it("test increase",()=>{
      calc.increase()
      expect(calc.getValue()).to.equal(1)
    })
})

describe("test Shape",()=>{
    it("",()=>{
        expect(Shape).itself.respondTo("print")
        expect(Shape).respondTo("display")
    })
})

describe.only("Testing Async Code",()=>{
    it("fetchUsingCallback",(done)=>{
       fetchUsingCallback(res=>{
        expect(res).equal("data")
        done()
       })
    })

    it("fetchUsingPromise", async()=>{
        // return fetchUsingPromise().then((res)=>{
        //     expect(res).equal("data")
        // })

        const res = await fetchUsingPromise()
        expect(res).equal("data")
    })
})