import { configureStore } from '@reduxjs/toolkit'
import cityReducer from './citySlice'
import filtersReducer from './filtersSlice'
import dataEventsReducer from './dataEventsSlice'
import userReducer from './userSlice'

const store = configureStore({
    reducer: {
        city: cityReducer,
        filters: filtersReducer,
        events: dataEventsReducer,
        user: userReducer,
    }
})

export default store