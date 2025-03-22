import { configureStore } from '@reduxjs/toolkit'
import cityReducer from './citySlice'
import filtersReducer from './filtersSlice'
import dataEventsReducer from './dataEventsSlice'

const store = configureStore({
    reducer: {
        city: cityReducer,
        filters: filtersReducer,
        events: dataEventsReducer,
    }
})

export default store