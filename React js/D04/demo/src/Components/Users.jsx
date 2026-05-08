import { useCallback, useEffect, useMemo, useState } from "react";
import User from "./User";

import {v4 as uuid} from 'uuid'
import AddUser from "./AddUser";
import axios from "axios";
import UseCounter from "../Hooks/useCounter";

const Users = () => {

  const [userData, setUserData] = useState([
    {id:uuid(), name:"Ahmed", age:25},
    {id:uuid(), name:"Omar", age:28},
    {id:uuid(), name:"Aya", age:20},
    {id:uuid(), name:"Nader", age:15},
    {id:uuid(), name:"Fatma", age:10},
    {id:uuid(), name:"Ali", age:27},
  ])
  // const [userData, setUserData] = useState(null)

  const [disabled, setDisabled] = useState(false);
  const [counter, setCounter] = useState(0);


//#region START  UseEffect
  // useEffect
  // useEffect(setupFunc logic, dependency arrray [optional]) 

  // Case 1: ComponentDidMount, ComponentDidUpdate

  // useEffect(()=>{
  //   console.log('Effect Works ☀️');
  // })

  // Case 2: ComponentDidMount 👉 Call Api

  // useEffect(()=>{
  //   console.log('Effect Works ☀️');
  // },[])

  // Case 3: ComponentDidMount, ComponentDidUpdate [counter only]

  // useEffect(()=>{
  //   console.log('Effect Works ☀️');
  // },[counter])

  // Case 4: ComponentDidMount, ComponentWillUnmount

  // useEffect(()=>{
  //   console.log('Effect Works ☀️');

  //   let interval = setInterval(()=>{
  //     console.log('interval Worked');
  //   },1000)

  //   return () => {
  //     console.log('Clean Up');
  //     clearInterval(interval)
  //     console.log('interval Cleaned');
  //   }
  // },[])

   // Case 5: ComponentDidMount, ComponentWillUnmount, ComponentDidUpdate [counter only]
  // useEffect(()=>{
  //   console.log('Effect Works ☀️');

  //   // let interval = setInterval(()=>{
  //   //   console.log('interval Worked');
  //   // },1000)

  //   return () => {
  //     console.log('Clean Up');
  //     // clearInterval(interval)
  //     // console.log('interval Cleaned');
  //   }
  // },[counter])

  // console.log(x);


  // console.log(x);


  // useEffect(()=>{
  //   // setCounter((old)=> old +1) // ❌❌❌

  //   // fetch('https://jsonplaceholder.typicode.com/users')
  //   // .then((res)=> res.json())
  //   // .then((data)=> setUserData(data))
  //   axios.get('https://jsonplaceholder.typicode.com/users')
  //   .then((res)=> {
  //     console.log('data fetched');
  //     console.log(res.data);
  //     setUserData(res.data)
  //   })

  // },[])

  
  // useEffect(()=>{
  //   async function fetchData(){
  //     let res = await fetch('https://jsonplaceholder.typicode.com/users')
  //     let data = await res.json()
  
  //     setUserData(data)
  //   }
  //   fetchData()

  // },[])

  //#endregion

  // useCallback(fun, dependency array)

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

  const addNewUser = (newUser)=>{
    if(counter === 2){
      setDisabled(true)
    }
    setUserData([...userData, {...newUser, id:uuid(), age: +newUser.age}])

    setCounter((old) => old + 1)
    setCounter((old) => old + 1)
    setCounter((old) => old + 1)
  }


  const [increment, setIncrement] = useState(0);

  let adults = useMemo(()=> {
    return userData.filter((old)=> {
    console.log('Adults Logic works');
    return old.age >= 18  
  }).length
  },[userData])

  let [counter2, incrementCounter, decrementCounter] = UseCounter(50)
  // console.log(x);


  if(!userData){ return <div className="spinner-border text-success" role="status">
  <span className="visually-hidden">Loading...</span>
</div>}

  return (
    <>
      <h1>Counter = {counter2}</h1>
      <button onClick={incrementCounter}>incr</button>
      <button onClick={decrementCounter}>decr</button>
      <hr />
      <h1>Number Of Adults User = {adults}</h1>
      <h1>Number Of New User = {counter}</h1>
      <h2>increment = {increment}</h2>
      <button onClick={()=> setIncrement((old)=> old + 1)}>incr</button>
      <AddUser disabled={disabled} addNewUser={addNewUser}></AddUser>
      {
        userData.map((u, index)=> <User deletUserFun={deletUserFun} incrAgeFun={incrAgeFun} decrAgeFun={decrAgeFun} key={uuid()} {...u}></User>)
      }
    </>
  );
}

export default Users;
