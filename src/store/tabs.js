import { createSlice } from "@reduxjs/toolkit";


const initialTabState = { 
  showFoundWordsList: false, 
  showPracticeList: false, 
  showBlanki: true,
  showTest: false, 
  reloadId: 0 
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: initialTabState,
  reducers: {
    togglePracticeList(state) {
      state.reloadId = Math.random();
      state.showPracticeList = true;
      state.showBlanki = false;
      state.showFoundWordsList = false;
      state.showTest = false;
    },
    toggleFoundWordsList(state) {
      state.reloadId = Math.random();
      state.showFoundWordsList = true;
      state.showPracticeList = false;
      state.showBlanki = false;
      state.showTest = false;
    },
    toggleTestMode(state) {
      state.showTest = true;
      state.showFoundWordsList = false;
      state.showPracticeList = false;
      state.showBlanki = false;
    },
    refreshTabs(state) {
      state.showFoundWordsList = false; 
      state.showPracticeList = false; 
      state.showBlanki = true;
      state.showTest = false; 
      state.reloadId = 0; 
    }
  }
});


export const tabsActions = tabsSlice.actions;

export default tabsSlice.reducer;