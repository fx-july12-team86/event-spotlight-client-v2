import { createSlice } from "@reduxjs/toolkit"
import { set } from "lodash"

const initialState = {
    token: localStorage.getItem("token") || null,
    isAuthenticated: localStorage.getItem("isAuthenticated") ? true : false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuthenticated(state, action) {
            state.isAuthenticated = action.payload
        },
        setToken(state, action) {
            state.token = action.payload
        }
    },
})

export default userSlice.reducer

export function updateIsAuthenticated(action) {
    if (action) {
        localStorage.setItem("isAuthenticated", true);
    }
    else {
        localStorage.removeItem("isAuthenticated");
    }
    return { type: "user/setIsAuthenticated", payload: action }
}
export function updateToken(token) {
    if (token) {
        localStorage.setItem("token", token);
    }
    else {
        localStorage.removeItem("token");
    }
    return { type: "user/setToken", payload: token }
}