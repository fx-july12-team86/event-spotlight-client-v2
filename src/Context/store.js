import { configureStore, current } from '@reduxjs/toolkit'

import cityReducer from './citySlice'
import filtersReducer from './filtersSlice'
import dataEventsReducer from './dataEventsSlice'
import currentEventReducer from './currentEventSlice'
import userReducer from './userSlice'
import userEventsReducer from './userEventsSlice'

const store = configureStore({
    reducer: {
        city: cityReducer,
        filters: filtersReducer,
        events: dataEventsReducer,
        currentEvent: currentEventReducer,
        user: userReducer,
        userEvents: userEventsReducer,
    }
})

export default store