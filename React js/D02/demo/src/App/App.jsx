import "./App.css";
import Task from "../Components/Task";
import User from "../Components/User";
import Users from "../Components/Users";

function App() {
  let name = "Ahmed";

  // const divStyle = {backgroundColor:'black', color:'coral'}


  return (
    <>
      <Task taskName="nest.js"></Task>
      {/* <User></User> */}
      <Users></Users>
    </>
  );
}

export default App;


const Styles = {
  divStyle : {backgroundColor:'black', color:'coral'},
  h1Style: {backgroundColor:'dodgerblue', color:'white', textAlign:'center'}
}