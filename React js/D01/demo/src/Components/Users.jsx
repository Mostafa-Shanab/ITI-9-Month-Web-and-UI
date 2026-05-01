import { useState } from "react";
import User from "./User";

const Users = () => {

  const [userData, setUserData] = useState([
    {id:1, name:"Ahmed", age:25},
    {id:2, name:"Omar", age:28},
    {id:3, name:"Aya", age:20},
    {id:4, name:"Nader", age:15},
    {id:5, name:"Fatma", age:33},
    {id:6, name:"Ali", age:27},
  ])
  // console.log(x);

  return (
    <>
      {
        userData.map((u)=> <User id={u.id} name={u.name} age={u.age}></User>)
      }
    </>
  );
}

export default Users;
