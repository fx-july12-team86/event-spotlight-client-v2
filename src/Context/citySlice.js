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
    updateCurrentcity(state, action) {
      if (action.payload.length <= 3) return;
      state.city = action.payload
    },
    updateSelectCity(state, action) {
      state.selectCity = action.payload
    },
  },
});


export function toggleCurrentCity(city) {
  return { type: 'city/updateCurrentcity', payload: city };
}
export function toggleSelectCity(is) {
  return { type: 'city/updateSelectCity', payload: is }
}
export const { city, selectCity } = citySlice.actions

export default citySlice.reducer