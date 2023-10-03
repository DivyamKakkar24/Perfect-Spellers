import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { showFoundWordsList: false, showPracticeList: false, showBlanki: true, reloadId: 0 };   


const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    togglePracticeList(state) {
      state.reloadId = Math.random();
      state.showPracticeList = true;
      state.showBlanki = false;
      state.showFoundWordsList = false;
    },
    toggleFoundWordsList(state) {
      state.reloadId = Math.random();
      state.showFoundWordsList = true;
      state.showPracticeList = false;
      state.showBlanki = false;
    },
  }
});


const store = configureStore({
  reducer: tabsSlice.reducer
});

export const tabsActions = tabsSlice.actions;

export default store;
