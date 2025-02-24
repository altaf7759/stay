import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../faetures/Login/userSlice";
import propertyReducer from "../faetures/PropertyForm/PropertySlice";
import stepReducer from "../faetures/PropertyForm/stepSlice";
import wishlistReducer from "../faetures/Wishlist/WishlistSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    property: propertyReducer,
    step: stepReducer,
    wishlist: wishlistReducer,
  },
});
