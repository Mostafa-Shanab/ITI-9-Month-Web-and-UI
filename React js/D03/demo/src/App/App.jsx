import "./App.css";
import Task from "../Components/Task";
import User from "../Components/User";
import Users from "../Components/Users";
import Search from "../Components/Components Interaction/Search";
import Students from "../Components/Components Interaction/Students";
import Parent from "../Components/Components Interaction/Parent";

// import '/node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  let name = "Ahmed";

  // const divStyle = {backgroundColor:'black', color:'coral'}


  return (
    <>
      {/* <Task taskName="nest.js"></Task> */}
      {/* <User></User> */}
      <Users></Users>
      {/* <Search></Search>
      <Students></Students> */}

      {/* <Parent></Parent> */}
    </>
  );
}

export default App;


const Styles = {
  divStyle : {backgroundColor:'black', color:'coral'},
  h1Style: {backgroundColor:'dodgerblue', color:'white', textAlign:'center'}
}