import { createSlice } from "@reduxjs/toolkit";


const initialTestState = { 
  showScore: false
};

const testSlice = createSlice({
  name: 'audioTest',
  initialState: initialTestState,
  reducers: {
    toggleScore(state) {
      state.showScore = true;
    }
  }
});


export const testActions = testSlice.actions;

export default testSlice.reducer;