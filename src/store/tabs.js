import { createSlice } from "@reduxjs/toolkit";


const initialTabState = { 
  showFoundWords: false,
  showPracticeList: false, 
  showBlanki: true,
  showTest: false, 
  foundWordsLen: 0,
  testWordLen: 0,
  reloadId: 0
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: initialTabState,
  reducers: {
    toggleFoundWords(state, action) {
      state.showFoundWords = true;
      state.foundWordsLen = action.payload;
      state.reloadId = Math.random();
      state.showPracticeList = false;
      state.showBlanki = false;
      state.showTest = false;
    },
    togglePracticeList(state) {
      state.reloadId = Math.random();
      state.showPracticeList = true;
      state.showFoundWords = false;
      state.showBlanki = false;
      state.showTest = false;
    },
    toggleTestMode(state, action) {
      state.showTest = true;
      state.testWordLen = action.payload;
      state.showFoundWords = false;
      state.showPracticeList = false;
      state.showBlanki = false;
    },
    refreshTabs(state) {
      state.showFoundWords = false;
      state.showPracticeList = false; 
      state.showBlanki = true;
      state.showTest = false; 
      state.foundWordsLen = 0;
      state.testWordLen = 0;
      state.reloadId = 0; 
    }
  }
});


export const tabsActions = tabsSlice.actions;

export default tabsSlice.reducer;