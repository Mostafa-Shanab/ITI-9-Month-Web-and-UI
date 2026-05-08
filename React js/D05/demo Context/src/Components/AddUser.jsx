import { useContext, useState } from "react";

import classes from '../Styles/AddUser.module.css'
import UseCounter from "../Hooks/useCounter";
// import { UsersContextConfig } from "../Context/Users-Context";
import { useNavigate } from "react-router";
import { UsersContext2 } from "../Context/Users2-Context";

const AddUser = () => {

  // const {addNewUser, disabled} = useContext(UsersContextConfig)
  const {addNewUser, disabled} = useContext(UsersContext2)
  const navigateTo = useNavigate();

  const [inputData, setInputData] = useState({name:'',age:''});

  const handleChg = (e)=> {
    setInputData({...inputData, [e.target.name]:e.target.value})
  }

  const handelSubmit = (e)=>{
    e.preventDefault()
    addNewUser(inputData)
    setInputData({name:'', age:''})
    navigateTo('/users')
  }

  return (
    <>
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