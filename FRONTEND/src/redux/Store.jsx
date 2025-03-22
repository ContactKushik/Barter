import { configureStore } from "@reduxjs/toolkit";
import adReducer from "./adSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ads:adReducer,
  },
});

export default store;
