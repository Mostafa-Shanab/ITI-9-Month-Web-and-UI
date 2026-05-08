import { useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";

const Ref = () => {

  // const [counter, setCounter] = useState(1);

  let clickNumbers =  useRef(0);

  // clickNumbers.current += 1

  const handleClick = ()=> {
    // setCounter((old)=> old +1)
    // alert(`you click ${counter} times`)
    
    // console.log(clickNumbers);
    
    clickNumbers.current += 1
    alert(`you click ${clickNumbers.current} times`)
  }

  let inputFocus = useRef();

  const handelFocus = ()=> {
    console.log(inputFocus);

    inputFocus.current.focus()
  }


  const [timer, setTimer] = useState(0);
  // const [timerVar, setTimerVar] = useState(null);

   let timerRef = useRef()

  const handleStart = ()=>{

    let interval = setInterval(()=>{
      setTimer((old)=> old + 1)
    }, 1000)

    timerRef.current = interval
  }
  const handleStop = ()=>{
    clearInterval(timerRef.current)
  }

  return (
    <>

      <div className="text-center my-5">
        <button className=" btn btn-warning" onClick={handleClick}>click me</button>
      </div>
      <hr className="w-25 border-3 border-danger mx-auto"/>
      {/* <h1>{clickNumbers}</h1> */}

      <div className="input-group w-50 mx-auto my-5">
        <label onClick={handelFocus} className="input-group-text bg-danger text-white fs-5"><IoMdSearch /></label>
        <input ref={inputFocus} type="text" className="form-control"/>
      </div>
      
      <hr className="w-25 border-3 border-success mx-auto"/>

    <h1>Timer = {timer}</h1>
    <button onClick={handleStart}>Start</button>
    <button onClick={handleStop}>Stop</button>

    </>
  );
}

export default Ref;
