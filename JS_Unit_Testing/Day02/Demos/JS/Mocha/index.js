export class Calculator{
    constructor(){
        this.value = 0;

    }
    increase(){
        ++this.value;
    }

    getValue(){
        return this.value
    }
}

export function Shape(){}
Shape.print=function(){}
Shape.prototype.display=function(){}

export function fetchUsingCallback(callback){
    setTimeout(()=>callback("data"),1000)
}

export function fetchUsingPromise(){
    return new Promise((res)=>{
        setTimeout(()=>res("data"),1000)
    })
}