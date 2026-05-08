import { useState } from "react";

import classes from '../Styles/AddUser.module.css'
import UseCounter from "../Hooks/useCounter";

const AddUser = ({addNewUser, disabled}) => {

  const [inputData, setInputData] = useState({name:'',age:''});


  const handleChg = (e)=> {
    // console.log(e.target.value);
    // console.log(e.target.name); // age
    setInputData({...inputData, [e.target.name]:e.target.value})
  }

  // const handleAgeChg = (e)=> {
  //   console.log(e.target.value);
  //   setInputData({...inputData, age:e.target.value})
  // }

  // console.log(inputData);

  const handelSubmit = (e)=>{
    e.preventDefault()
    // addNewUser(inputData)
    setInputData({name:'', age:''})
  }

  //  let [counter2, incrementCounter, decrementCounter] = UseCounter(40)

  return (
    <>

      {/* <h1>Counter = {counter2}</h1>
      <button onClick={incrementCounter}>incr</button>
      <button onClick={decrementCounter}>decr</button> */}

      {/* <h1 id="h1Id">AddUser Component</h1> */}
      {/* <h1>AddUser Component</h1> */}
      <form style={Styles.formStyle} onSubmit={handelSubmit}>
      {/* <form style={Styles.formStyle}> */}
        <input style={Styles.inputStyle} type="text" placeholder="user name" name="name" value={inputData.name} onChange={handleChg}/>
        <input style={Styles.inputStyle} type="text" placeholder="user age" name="age" value={inputData.age} onChange={handleChg}/>
        {/* <input style={Styles.btnStyl} type="button" value="Add" onClick={handelSubmit}/> */}
        {/* <input style={Styles.btnStyl} type="submit" value="Add"/> */}
        <input className={classes.button1} type="submit" value="Add" disabled={disabled}/>
      </form>
    </>
  );
}

export default AddUser;


let Styles = {
  formStyle: {width:"50%", margin:"20px auto", display:"flex", flexDirection:"column", border:"2px solid crimson", padding:"20px", borderRadius:"5px"},
  inputStyle: {width:"70%", margin:"5px auto", outline:"none", border:"2px solid cornflowerblue", padding:"10px", borderRadius:"5px"},
  btnStyl: {width:"30%", margin:"5px auto", border:"none", backgroundColor:'crimson', fontSize:"17px", color:"white", padding:"10px 15px", borderRadius:"8px"}
} 