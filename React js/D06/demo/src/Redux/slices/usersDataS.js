import { createSlice } from "@reduxjs/toolkit";
import {v4 as uuid} from 'uuid'


let usersSlice = createSlice({
  name:'users',
  initialState:{users:[
    {id:uuid(), name:"Ahmed", age:25},
    {id:uuid(), name:"Omar", age:28},
    {id:uuid(), name:"Aya", age:20},
    {id:uuid(), name:"Nader", age:15},
    {id:uuid(), name:"Fatma", age:10},
    {id:uuid(), name:"Ali", age:27},
  ]},
  reducers:{
    incrementAge: function(state,action){
      state.users = state.users.map((u)=> u.id === action.payload? {...u, age:u.age + 1} :u);
    },
    decrementAge: function(state,action){
      state.users = state.users.map((u)=> u.id === action.payload? {...u, age:u.age - 1} :u);
    },
    deleteUser: function(state,action){
      state.users = state.users.filter((u)=> u.id !== action.payload);
    },
    addNewUser: function(state,action){
      console.log(action);
      state.users.push(action.payload)
    },
  }
})


export let {incrementAge, decrementAge, deleteUser, addNewUser} = usersSlice.actions

export default usersSlice.reducer


