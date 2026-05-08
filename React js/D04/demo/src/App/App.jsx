import "./App.css";
import Task from "../Components/Task";
import User from "../Components/User";
import Users from "../Components/Users";
import Search from "../Components/Components Interaction/Search";
import Students from "../Components/Components Interaction/Students";
import Parent from "../Components/Components Interaction/Parent";
import { useState } from "react";
import Ref from "../Components/UseRef Hook/Ref";
import Reducer from "../Components/Reducer Hook/Reducer";

// import '/node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  let name = "Ahmed";

  // const divStyle = {backgroundColor:'black', color:'coral'}

  const [isShow, setIsShow] = useState(true);

  const isShowBtn =()=> {
    setIsShow((old)=> !old)
  }

  return (
    <>
      {/* <Task taskName="nest.js"></Task> */}
      {/* <User></User> */}

      <button onClick={isShowBtn} className="btn btn-warning my-5 d-block mx-auto w-25 text-center">{isShow?'Hide':'Show'}</button>

      {
        isShow ? <Users></Users> : ''
      }
       
      {/* <Search></Search>
      <Students></Students> */}

      {/* <Parent></Parent> */}

      {/* <Ref></Ref> */}

      {/* <Reducer></Reducer> */}
    </>
  );
}

export default App;


const Styles = {
  divStyle : {backgroundColor:'black', color:'coral'},
  h1Style: {backgroundColor:'dodgerblue', color:'white', textAlign:'center'}
}