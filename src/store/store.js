import { configureStore } from "@reduxjs/toolkit";  
import auth from "../appWrite/auth";
import authReducer from "./authSlice.js"
 const store = configureStore({
    reducer:{
        auth: authReducer
    }
});

export default store;