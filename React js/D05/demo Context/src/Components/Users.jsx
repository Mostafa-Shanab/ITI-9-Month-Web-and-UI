import { Suspense, useCallback, useContext, useEffect, useMemo, useState } from "react";
import User from "./User";

import {v4 as uuid} from 'uuid'
import AddUser from "./AddUser";
import axios from "axios";
import UseCounter from "../Hooks/useCounter";
import { UsersContext2 } from "../Context/Users2-Context";
// import { UsersContextConfig } from "../Context/Users-Context";

const Users = () => {

  // let {userData, setUserData} = useContext(UsersContextConfig)
  let {userData, setUserData} = useContext(UsersContext2)

  const incrAgeFun = useCallback((uId)=>{
    setUserData(userData.map((u)=> {
      // console.log('useCallBack run');
      return u.id === uId?{...u, age:u.age+1}:u
    }))
  },[userData])
  
  const decrAgeFun = (uId)=>{
    setUserData(userData.map((u)=> u.id === uId?{...u, age:u.age-1}:u))
  }

  const deletUserFun = (uId)=>{
    setUserData(userData.filter((u)=> u.id !== uId))
  }


  if(!userData){ return <div className="spinner-border text-success" role="status">
  <span className="visually-hidden">Loading...</span>
</div>}

  return (
    <>
        {
          userData.map((u)=> <User deletUserFun={deletUserFun} incrAgeFun={incrAgeFun} decrAgeFun={decrAgeFun} key={uuid()} {...u}></User>)
        }
    </>
  );
}

export default Users;
