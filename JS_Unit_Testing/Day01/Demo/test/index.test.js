import * as chai from "chai";
const {assert,expect} = chai;
chai.should();
import { Sum ,convertToArray , obj1 , obj2 , obj3,add , newSet,frozenObj , sealedObj} from "../index.js";

describe("test sum function",()=>{
    it("test positive nums ",()=>{
        //? test cases 
        expect(Sum(2,2)).equal(4)
        // Sum(2,5).should.equal(7)
        // assert.equal(Sum(2,1),3)
    })

    it.skip("test params num",()=>{
        // expect(()=>Sum()).throw("enter two nums")
        // (()=>Sum(1,2,4)).should.throw("enter two nums")
        assert.throws(()=>Sum(1),"enter two nums")
    })
});

describe("test convertToArray function",()=>{
    it.skip("test with assert [no chaining]",()=>{
        assert.isArray(convertToArray(1,2,3))
        assert.lengthOf(convertToArray(1,2,3,4),4)
        assert.include(convertToArray(1,2,3,4),40)
    })
    it("test with expect and should",()=>{
        expect(convertToArray(1,2,3)).to.be.an('array').that.have.lengthOf(3).that.include(1)
        convertToArray(1,2,3).should.to.be.an('array').that.have.lengthOf(3).that.include(1)
    })
})

describe("test Types of Equality",()=>{
    it("with expect and should",()=>{
        // expect(obj1).equal(obj2) //? equal [shallow comparison "check ref"]
        expect(obj1).deep.equal(obj2) //? equal [deep comparison]
    })
    it("with assert",()=>{
        // assert.equal(obj1,obj2) //? equal [shallow comparison "check ref"]
        // assert.equal(3,'3') //? coercion with primitive

        // assert.deepEqual(3,'3') //? deep comparison with objs + not coercion with primitive

        // assert.strictEqual(obj1,obj2) //? shallow comparison with objs + not coercion with primitive
        // assert.strictEqual(3,'3')
    }) 
})

describe.only("test obj3",()=>{
    it("",()=>{
        // expect(obj3).to.have.keys('x','y')
        // expect(obj3).to.have.all.keys('x','y')
        expect(obj3).to.have.any.keys('x')
        expect(newSet).have.property('size',3)
        expect(obj3).have.property('y',1)
        expect(add).to.increase(obj3,'y').by(2)
        expect(obj3.y).above(2)
    })
    it.only("nested array",()=>{
        // expect({obj3}).to.nested.include({'obj3.x[1]':2})
        // expect(obj3).have.ownPropertyDescriptor('y').that.has.property('enumerable',false)
        // expect(frozenObj).to.be.frozen
        expect(sealedObj).to.be.sealed
    })
})