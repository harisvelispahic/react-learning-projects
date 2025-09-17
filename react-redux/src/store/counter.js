import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = {
  counter: 0,
  showCounter: true,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    // Here we ARE allowed to edit the original state, unlike in the counterReducer function
    // Actually, it only looks to us that we are modifying the original state, however redux toolkit handles that in the background for us
    decrement(state) {
      state.counter--;
    },
    increment(state) {
      state.counter++;
    },
    increase(state, action) {
      state.counter += action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
