import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    error: null,
    generalEvents: [],
    topEventsCity: [],
    onlineEvents: [],
    closestEvents: [],
    catalogEvents: [],
}

const dataEventsSlice = createSlice({
    name: 'dataEvents',
    initialState,
    reducers: {
        setGeneralEvents(state, action) {
            state.generalEvents = action.payload
        },
        setTopEventsCity(state, action) {
            state.topEventsCity = action.payload
        },
        setOnlineEvents(state, action) {
            state.onlineEvents = action.payload
        },
        setCatalogEvents(state, action) {
            state.catalogEvents = action.payload
        }
    }
})

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
export function updateCatalogEvents(events) {
    console.log(events)
    return { type: 'dataEvents/setCatalogEvents', payload: events }
}