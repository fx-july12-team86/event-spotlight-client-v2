import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "",
  selectCity: false,
};




const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    updateCurrentCity(state, action) {
      if (action.payload.length <= 3) return;
      state.city = action.payload
    },
    updateSelectCity(state, action) {
      state.selectCity = action.payload
    },
  },
});


export const { updateCurrentCity, updateSelectCity } = citySlice.actions;
export default citySlice.reducer