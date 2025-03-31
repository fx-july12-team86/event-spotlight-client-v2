import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.isAuthenticated = true
        },
        removeUser(state) {
            state.isAuthenticated = false
            state.user = null
        },
    },
})

export const { user, isAuthenticated } = userSlice.actions
export default userSlice.reducer