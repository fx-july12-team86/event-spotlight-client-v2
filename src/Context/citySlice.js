import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "",
  selectCity: false,
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

export default citySlice.reducer