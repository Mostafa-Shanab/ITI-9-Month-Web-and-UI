import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reactions: {},
};

const reactionsSlice = createSlice({
  name: "reactions",
  initialState,
  reducers: {
    setReaction: (state, action) => {
      const { postId, reaction } = action.payload;
      state.reactions[postId] = reaction;
      localStorage.setItem("postReactions", JSON.stringify(state.reactions));
    },
    loadReactionsFromStorage: (state) => {
      const storedReactions = localStorage.getItem("postReactions");
      if (storedReactions) {
        try {
          state.reactions = JSON.parse(storedReactions);
        } catch (error) {
          console.error("Error loading reactions:", error);
        }
      }
    },
    getReaction: (state, action) => {
      return state.reactions[action.payload] || null;
    },
  },
});

export const { setReaction, loadReactionsFromStorage, getReaction } =
  reactionsSlice.actions;
export default reactionsSlice.reducer;
