import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    filters: [],
    datesRange: [],
    date: null,
    sort: null,
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
    }
})

export const { filters, datesRange, date } = filtersSlice.actions
export default filtersSlice.reducer

export function updateFilters(element) {
    return { type: 'filter/setFilters', payload: element }
}
export function updateDateRange(dates) {
    return { type: 'filter/setDateRange', payload: dates }
}
export function updateDate(date) {
    return { type: 'filter/setDate', payload: date }
}