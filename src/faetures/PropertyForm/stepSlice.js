import { createSlice } from "@reduxjs/toolkit";

const stepSlice = createSlice({
  name: "step",
  initialState: 1,
  reducers: {
    incrementStep: (state) => state + 1,
    decrementStep: (state) => state - 1,
    setStep: (state, action) => action.payload,
  },
});

export const { incrementStep, decrementStep, setStep } = stepSlice.actions;
export default stepSlice.reducer;
