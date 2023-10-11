import { configureStore } from "@reduxjs/toolkit";

import tabsReducer from "./tabs";
import testReducer from "./test";


const store = configureStore({
  reducer: { tabs: tabsReducer, test: testReducer }
});


export default store;