import { createSlice } from "@reduxjs/toolkit"

export function formatToLocalISODateTime(isoString) {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const initialState = {
    today: formatToLocalISODateTime(new Date()),
    currentDate: formatToLocalISODateTime(new Date()),
    // selectedDate: null,
}

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setCurrentDate(state, action) {
            state.currentDate = action.payload
        },
        // setSelectedDate(state, action) {
        //     state.selectedDate = action.payload
        // }
    }
})

export function updateCurrentDate(date) {
    return { type: 'date/setSelectedDate', payload: date }
}

export const { currentDate, selectedDate } = dateSlice.actions
export default dateSlice.reducer