export function Sum(x,y){
    if(arguments.length !== 2){
        throw new Error("enter two nums")
    }
    return x+y;
}

export function convertToArray(...params){
    return params
}

export let obj1 = {
    id:1
},obj2 = {
    id:1
}

export let obj3 = {
    x:[1,2,3],
    y:123
},add = function(){
    return obj3.y+=2
}
// Object.defineProperty(obj3,"y",{
//     value:1,
//     enumerable:false
// })
export const newSet = new Set([1,2,3])

//? prevent --> add update delete
export const frozenObj = Object.freeze(obj3)
//? prevent --> add , delete 
export const sealedObj = Object.seal(obj3)