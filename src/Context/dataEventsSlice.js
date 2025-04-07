import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status: 'loading', // 'loading', 'ready', 'error'
    error: null,
    generalEvents: [],
    topEventsCity: [],
    onlineEvents: [],
    closestEvents: []
}

const dataEventsSlice = createSlice({
    name: 'dataEvents',
    initialState,
    reducers: {
        setGeneralEvents(state, action) {
            state.generalEvents = action.payload
            state.status = 'ready'
        },
        setTopEventsCity(state, action) {
            state.topEventsCity = action.payload
        },
        setOnlineEvents(state, action) {
            state.onlineEvents = action.payload
        }
    }
})

export const { generalEvents, topEventsCity, onlineEvents, closestEvents, status } = dataEventsSlice.actions
export default dataEventsSlice.reducer

export function updateGeneralEvents(events) {
    return { type: 'dataEvents/setGeneralEvents', payload: events }
}
export function updateTopEventsCity(events) {
    return { type: 'dataEvents/setTopEventsCity', payload: events }
}
export function updateOnlineEvents(events) {
    return { type: 'dataEvents/setOnlineEvents', payload: events }
}