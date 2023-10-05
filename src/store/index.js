import { configureStore } from "@reduxjs/toolkit";

import tabsReducer from "./tabs";


const store = configureStore({
  reducer: { tabs: tabsReducer }
});


export default store;