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

export const { setCurrentEventData } = CurrentEventSlice.actions
export default CurrentEventSlice.reducer
