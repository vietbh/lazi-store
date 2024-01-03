import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer:{
        cartState: cartSlice.reducer,
    }
});
export default store;