import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import transactionsReducer from "../redux/transactionsSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
  },
});

export default store;


