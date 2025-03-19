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
export function formatToLocalISODateTimeArray(isoArray) {
    return isoArray.map((isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    });
}

const initialState = {
    today: formatToLocalISODateTime(new Date()),
    selectedDate: formatToLocalISODateTime(new Date()),
    rangeDate: null,
}

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setSelectedDate(state, action) {
            state.selectedDate = action.payload
        },
        setRangeDate(state, action) {
            if (action.payload[0] === action.payload[1]) {
                state.rangeDate = null
            }
            else {
                state.rangeDate = action.payload
            }
        },
    }
})

export function updateSelectedDate(date) {
    return { type: 'date/setSelectedDate', payload: date }
}
export function updateRangeDate(range) {
    return { type: 'date/setRangeDate', payload: range }
}

export const { today, selectedDate, rangeDates } = dateSlice.actions
export default dateSlice.reducer