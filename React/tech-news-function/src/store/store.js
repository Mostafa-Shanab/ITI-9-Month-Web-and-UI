import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import reactionsReducer from "./slices/reactionsSlice";
import themeReducer from "./slices/themeSlice";
import localeReducer from "./slices/localeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reactions: reactionsReducer,
    theme: themeReducer,
    locale: localeReducer,
  },
});
