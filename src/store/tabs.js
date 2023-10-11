import { createSlice } from "@reduxjs/toolkit";


const initialTabState = { 
  showPracticeList: false, 
  showBlanki: true,
  showTest: false, 
  testWordLen: 0,
  reloadId: 0,
  wordsFirebase: {}, 
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: initialTabState,
  reducers: {
    fetchWordsMetadata(state, action) {
      state.wordsFirebase = action.payload;
    },
    togglePracticeList(state) {
      state.reloadId = Math.random();
      state.showPracticeList = true;
      state.showBlanki = false;
      state.showTest = false;
    },
    toggleTestMode(state, action) {
      state.showTest = true;
      state.testWordLen = action.payload;
      state.showPracticeList = false;
      state.showBlanki = false;
    },
    refreshTabs(state) {
      state.showPracticeList = false; 
      state.showBlanki = true;
      state.showTest = false; 
      state.testWordLen = 0;
      state.reloadId = 0; 
    }
  }
});


export const tabsActions = tabsSlice.actions;

export default tabsSlice.reducer;