import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "Оберіть місто",
  selectCity: false,
  // "loading", "error", "ready", "active", "finished"
  // status: "loading",
};




const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    select(state, action) {
      if (action.payload.length <= 3) return;
      state.city = action.payload
    },
    detected(state, action) {
      state.city = action.payload
    },
    toggleSelectCity(state, action) {
      state.selectCity = action.payload
    },
  },
});


export function citySelect(city) {
  return { type: 'city/select', payload: city };
}
export function cityDetected(city) {
  return { type: 'city/detected', payload: city }
}
export function IsSelectCity(is) {
  return { type: 'city/toggleSelectCity', payload: is }
}
export const { select, detected, toggleSelectCity } = citySlice.actions

export default citySlice.reducer