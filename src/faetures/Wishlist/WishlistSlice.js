import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistData: [],
  wishlistUpdated: false,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.wishlistData = [];
    },
    setWishlistData: (state, action) => {
      state.wishlistData = action.payload;
    },
    toggleWishlistUpdated: (state) => {
      state.wishlistUpdated = !state.wishlistUpdated;
    },
  },
});

export const { clearWishlist, setWishlistData, toggleWishlistUpdated } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
