import { configureStore } from '@reduxjs/toolkit'
import cityReducer from './citySlice'
import dateReducer from './dateSlice'
import filtersReducer from './filtersSlice'

const store = configureStore({
    reducer: {
        city: cityReducer,
        date: dateReducer,
        filters: filtersReducer,
    }
})

export default store