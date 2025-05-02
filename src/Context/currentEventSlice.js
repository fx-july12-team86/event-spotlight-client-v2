import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null
}

const CurrentEventSlice = createSlice({
    name: 'currentEvent',
    initialState,
    reducers: {
        setCurrentEventData(state, action) {
            state.data = action.payload
        }
    }
})

export default CurrentEventSlice.reducer

export function updateCurrentEventData(data) {
    return { type: 'currentEvent/setCurrentEventData', payload: data }
}