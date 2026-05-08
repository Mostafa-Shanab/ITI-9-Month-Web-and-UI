import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import User from "./User";

import {v4 as uuid} from 'uuid'
import AddUser from "./AddUser";
import axios from "axios";
import UseCounter from "../Hooks/useCounter";
import { useDispatch, useSelector } from "react-redux";
import { decrementAge, deleteUser, incrementAge } from "../Redux/slices/usersDataS";
import { getUsersAction } from "../Redux/slices/usersS";

const Users = () => {

  // let userData = useSelector((state)=> state.usersR.users)
  let dispatch = useDispatch();

  let userData  = useSelector((state)=> state.getUsersR.usersApi)
  let loading  = useSelector((state)=> state.getUsersR.loading)
  let error  = useSelector((state)=> state.getUsersR.error)

  useEffect(()=> {
    dispatch(getUsersAction())
  } ,[])


  // const [disabled, setDisabled] = useState(false);
  // const [counter, setCounter] = useState(0);


  // const incrAgeFun = useCallback((uId)=>{
  //   dispatch(incrementAge(uId))
  // },[userData])
  
  // const decrAgeFun = (uId)=>{
  //   dispatch(decrementAge(uId))
  // }
  
  // const deletUserFun = (uId)=>{
  //   dispatch(deleteUser(uId))
  // }

  // const addNewUser = (newUser)=>{
  
    // setUserData([...userData, {...newUser, id:uuid(), age: +newUser.age}])
  // }


  if(loading){ return <div className="spinner-border text-success" role="status">
  <span className="visually-hidden">Loading...</span>
</div>}

    if(error) { return <h1>{error}</h1>}

  return (
    <>
        {
          // userData.map((u)=> <User deletUserFun={deletUserFun} incrAgeFun={incrAgeFun} decrAgeFun={decrAgeFun} key={uuid()} {...u}></User>)
          userData.map((u)=> <User  key={uuid()} {...u}></User>)
        }
    </>
  );
}

export default Users;
