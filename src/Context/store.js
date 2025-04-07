import { configureStore, current } from '@reduxjs/toolkit'

import cityReducer from './citySlice'
import filtersReducer from './filtersSlice'
import dataEventsReducer from './dataEventsSlice'
import currentEventReducer from './currentEventSlice'
import userReducer from './userSlice'

const store = configureStore({
    reducer: {
        city: cityReducer,
        filters: filtersReducer,
        events: dataEventsReducer,
        currentEvent: currentEventReducer,
        user: userReducer,
    }
})

export default store