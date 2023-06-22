import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/UserSlice";
import cartReducer from "./Slice/CartSlide";
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
