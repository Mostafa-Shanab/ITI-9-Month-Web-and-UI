import { createSlice } from "@reduxjs/toolkit";


let languageSlice = createSlice({
  name:'language',
  initialState:{language:'en'},
  reducers:{
    changeLanguageFun: function(state, action){
      state.language = action.payload;

      console.log("language State: ", state.language);
      console.log("language action: ", action);
    }
  }
})


export let {changeLanguageFun} = languageSlice.actions 
// 👆 for useDispatch hook 👉 dispatch(changeLanguageFun('ع')) 👉 {type:'language/changeLanguageFun', payload:'ع'}

export default languageSlice.reducer // for store