import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getUsersAction = createAsyncThunk('usersApi/getAll', async ()=>{
  let res = await axios.get('https://jsonplaceholder.typicode.com/user');
  console.log(res.data);
  return res.data
})


let getUsersSlice  = createSlice({
  name:'usersApi',
  initialState:{usersApi:null, loading:true, error:null},
  extraReducers: (builder) =>{
    builder.addCase(getUsersAction.fulfilled, (state, action)=>{
      state.usersApi = action.payload;
      state.loading = false
    })

    builder.addCase(getUsersAction.pending, (state)=>{
      console.log('looooooooading', state.loading);
      state.loading = true
    })

    builder.addCase(getUsersAction.rejected, (state, action)=>{
      console.log('rejected caase');
      console.log(action);
      state.error = action.error.message
      state.loading = false
    })
  }
})


export default getUsersSlice.reducer