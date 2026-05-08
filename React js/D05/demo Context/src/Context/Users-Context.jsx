import { createContext, useState } from "react";
import {v4 as uuid} from 'uuid'

export const UsersContextConfig = createContext();

const UsersContext = ({children}) => {

    const [userData, setUserData] = useState([
    {id:uuid(), name:"Ahmed", age:25},
    {id:uuid(), name:"Omar", age:28},
    {id:uuid(), name:"Aya", age:20},
    {id:uuid(), name:"Nader", age:15},
    {id:uuid(), name:"Fatma", age:10},
    {id:uuid(), name:"Ali", age:27},
  ])

  const [disabled, setDisabled] = useState(false);
  const [counter, setCounter] = useState(0);

    const addNewUser = (newUser)=>{
    if(counter === 2){
      setDisabled(true)
    }
    setUserData([...userData, {...newUser, id:uuid(), age: +newUser.age}])

    setCounter((old) => old + 1)
    setCounter((old) => old + 1)
    setCounter((old) => old + 1)
  }

  return (
    <>
      <UsersContextConfig.Provider value={{userData, setUserData ,disabled, addNewUser}}>
        {children}
      </UsersContextConfig.Provider>
    </>
  );
}

export default UsersContext;
