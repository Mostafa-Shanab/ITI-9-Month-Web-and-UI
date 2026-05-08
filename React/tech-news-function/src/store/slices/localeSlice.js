import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: localStorage.getItem("language") || "en",
};

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem("language", action.payload);
    },
    toggleLanguage: (state) => {
      state.language = state.language === "en" ? "ar" : "en";
      localStorage.setItem("language", state.language);
    },
  },
});

export const { setLanguage, toggleLanguage } = localeSlice.actions;
export default localeSlice.reducer;
