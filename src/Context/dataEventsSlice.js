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

export const {
    setGeneralEvents,
    setTopEventsCity,
    setOnlineEvents,
    setCatalogEvents
} = dataEventsSlice.actions
export default dataEventsSlice.reducer