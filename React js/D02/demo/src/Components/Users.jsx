import { useState } from "react";
import User from "./User";

import {v4 as uuid} from 'uuid'

const Users = () => {

  const [userData, setUserData] = useState([
    {id:uuid(), name:"Ahmed", age:25},
    {id:uuid(), name:"Omar", age:28},
    {id:uuid(), name:"Aya", age:20},
    {id:uuid(), name:"Nader", age:15},
    {id:uuid(), name:"Fatma", age:33},
    {id:uuid(), name:"Ali", age:27},
  ])
  // console.log(x);

  return (
    <>
      {
        // userData.map((u)=> <User id={u.id} name={u.name} age={u.age}></User>)
        userData.map((u, index)=> <User key={uuid()} {...u}>
          {/* <h3>hello this is a msg</h3>
          <button>done</button> */}
        </User>)
      }
    </>
  );
}

export default Users;
