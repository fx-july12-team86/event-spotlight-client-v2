import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    activeEvents: [],
    stoppedEvents: [],
    moderatingEvents: [],
    archivedEvents: [],
}

const userEventsSlice = createSlice({
    name: 'userEvents',
    initialState,
    reducers: {
        setActiveEvents(state, action) {
            state.activeEvents = action.payload
        },
        setStoppedEvents(state, action) {
            state.stoppedEvents = action.payload
        },
        setModeratingEvents(state, action) {
            state.moderatingEvents = action.payload
        },
        setArchivedEvents(state, action) {
            state.archivedEvents = action.payload
        },
    },
})

export default userEventsSlice.reducer

export function updateActiveEvents(events) {
    return { type: "userEvents/setActiveEvents", payload: events }
}