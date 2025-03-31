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

export function formatDate(date) {
    return date.split("T")[0].replaceAll("-", ".").split(".").reverse().join(".");;
}

const initialState = {
    filters: [],
    sort: null,
    today: formatToLocalISODateTime(new Date()),
    selectedDate: formatToLocalISODateTime(new Date()),
    datesRange: null
}

const filtersSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilters(state, action) {
            const index = state.filters.indexOf(action.payload);
            if (index === -1) {
                // Если фильтра нет, добавляем
                state.filters.push(action.payload);
            } else {
                // Если есть — удаляем  
                state.filters.splice(index, 1);
            }
        },
        setDateRange(state, action) {
            state.datesRange = action.payload
        },
        setDate(state, action) {
            state.date = action.payload
        },
        setSelectedDate(state, action) {
            state.selectedDate = action.payload
        },
        // setRangeDate(state, action) {
        //     if (action.payload[0] === action.payload[1]) {
        //         state.rangeDate = null
        //     }
        //     else {
        //         state.rangeDate = action.payload
        //     }
        // },
    }
})

export const { filters, datesRange, selectedDate } = filtersSlice.actions
export default filtersSlice.reducer

export function updateFilters(element) {
    return { type: 'filter/setFilters', payload: element }
}
export function updateSelectedDate(date) {
    return { type: 'filter/setSelectedDate', payload: date }
}
export function updateRangeDate(range) {
    return { type: 'filter/setDateRange', payload: range }
}