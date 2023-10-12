import { createSlice } from "@reduxjs/toolkit";


const initialTestState = { 
  showScore: false,
  testWords: []
};

const testSlice = createSlice({
  name: 'audioTest',
  initialState: initialTestState,
  reducers: {
    toggleScore(state) {
      state.showScore = true;
    },
    fetchTestWords(state, action) {
      state.testWords = action.payload;
    }
  }
});


export const testActions = testSlice.actions;

export default testSlice.reducer;