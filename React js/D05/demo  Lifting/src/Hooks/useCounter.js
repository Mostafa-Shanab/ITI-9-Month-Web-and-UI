import { useState } from "react"


const UseCounter = (initial)=>{
  const [counter2, setCounter] = useState(initial);

  function incrementCounter (){
    setCounter((old)=> old +1)
  }
  function decrementCounter (){
    setCounter((old)=> old -1)
  }

  return [counter2, incrementCounter, decrementCounter]
}


export default UseCounter;