import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter.js";
import authReducer from "./auth.js";

const store = configureStore({
  // merged into one big reducer
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

export default store;
