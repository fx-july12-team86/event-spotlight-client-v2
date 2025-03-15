import { configureStore } from '@reduxjs/toolkit'
import cityReducer from './citySlice'
import dateReducer from './dateSlice'

const store = configureStore({
    reducer: {
        city: cityReducer,
        date: dateReducer,
    }
})

export default store