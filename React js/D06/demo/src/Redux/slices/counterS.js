import { createSlice } from "@reduxjs/toolkit";


let CounterSlice = createSlice({
  name:'counter',
  initialState:{counter:0},
  reducers:{
    incrementCounter: function(state){
      state.counter += 1
    },
    decrementCounter: (state, action)=>{
      state.counter -= action.payload
    },
    setCounter: (state, action)=>{
      state.counter = action.payload
    }
  }
})

export let {incrementCounter, decrementCounter, setCounter} = CounterSlice.actions

export default CounterSlice.reducer