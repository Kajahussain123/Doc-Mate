import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { alertsSlice } from "./alertSlice"; // Ensure the correct path to the file
import { userSlice } from "./userSlice";

const rootReducer = combineReducers({
    alert: alertsSlice.reducer,
    user: userSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
