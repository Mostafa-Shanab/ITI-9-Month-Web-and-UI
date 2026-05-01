import { useState } from "react";
import User from "./User";

import {v4 as uuid} from 'uuid'
import AddUser from "./AddUser";

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

  const incrAgeFun = (uId)=>{
    // console.log(udata);
    // console.log('from users component');

    // let userIndex = userData.findIndex((u)=> u.id === uId)
    // console.log(userIndex);
    // userData[userIndex] = {...userData[userIndex] , age:userData[userIndex].age+1}
    // console.log(userData[userIndex]);
    // setUserData([...userData])

    setUserData(userData.map((u)=> u.id === uId?{...u, age:u.age+1}:u))
  }
  
  const decrAgeFun = (uId)=>{
    setUserData(userData.map((u)=> u.id === uId?{...u, age:u.age-1}:u))
  }

  const deletUserFun = (uId)=>{
    setUserData(userData.filter((u)=> u.id !== uId))
  }

  const addNewUser = (newUser)=>{
    // console.log(userData);

    setUserData([...userData, {...newUser, id:uuid(), age: +newUser.age}])
  }

  return (
    <>
      <AddUser addNewUser={addNewUser}></AddUser>
      {
        // userData.map((u)=> <User id={u.id} name={u.name} age={u.age}></User>)
        // userData.map((u, index)=> <User ageIncremantal={incrAgeFun} key={uuid()} {...u}>
        userData.map((u, index)=> <User deletUserFun={deletUserFun} incrAgeFun={incrAgeFun} decrAgeFun={decrAgeFun} key={uuid()} {...u}>
          {/* <h3>hello this is a msg</h3>
          <button>done</button> */}
        </User>)
      }
    </>
  );
}

export default Users;
