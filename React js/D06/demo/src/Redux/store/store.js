import { configureStore } from "@reduxjs/toolkit";

import LanguageReducer from '../slices/languageS'
import CounterReducer from '../slices/counterS'
import UsersReducer from '../slices/usersDataS'
import GetUsersReducer from '../slices/usersS'

export let storeConfig = configureStore({
  reducer:{
    languageR: LanguageReducer,
    counterR: CounterReducer,
    usersR: UsersReducer,
    getUsersR: GetUsersReducer
  }
})