import { createSlice } from "@reduxjs/toolkit";


const initialTestState = { 
  score: 0,
  showQuestions: true,
  showScore: false,
  review: false,
  testWords: [],
  userResponse: {}
};

const testSlice = createSlice({
  name: 'audioTest',
  initialState: initialTestState,
  reducers: {
    incrementScore(state) {
      state.score += 1;
    },
    toggleScore(state) {
      state.showScore = true;  
      state.showQuestions = false;
    },
    anotherAttempt(state) {
      state.showScore = false;
      state.review = false;
      state.showQuestions = true;
      state.score = 0;
      state.userResponse = {};
    },
    fetchTestWords(state, action) {
      state.testWords = action.payload;
      state.showScore = false;
      state.review = false;
      state.showQuestions = true;
      state.score = 0;
      state.userResponse = {};
    },
    saveResponse(state, action) {
      state.userResponse = action.payload;
    },
    reviewAnswers(state) {
      state.showScore = false;
      state.showQuestions = false;
      state.review = true;
    }
  }
});


export const testActions = testSlice.actions;

export default testSlice.reducer;