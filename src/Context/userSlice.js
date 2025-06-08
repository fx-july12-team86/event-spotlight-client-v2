import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: localStorage.getItem("token") || null,
    isAuthenticated: localStorage.getItem("isAuthenticated") ? true : false,
    userId: localStorage.getItem("userId") || null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn(state, action) {
            const { token, userId } = action.payload;
            state.token = token;
            state.isAuthenticated = true;
            state.userId = userId;

            localStorage.setItem("token", token);
            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem("userId", userId);
        },
        logOut(state) {
            state.token = null;
            state.isAuthenticated = false;
            state.userId = null;

            localStorage.removeItem("token");
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("userId");
        }
    }
    // reducers: {
    //     updateIsAuthenticated(state, action) {
    //         if (action) {
    //             localStorage.setItem("isAuthenticated", true);
    //         }
    //         else {
    //             localStorage.removeItem("isAuthenticated");
    //         }
    //         state.isAuthenticated = action.payload
    //     },
    //     updateToken(state, action) {
    //         if (action.payload) {
    //             localStorage.setItem("token", action.payload);
    //         }
    //         else {
    //             localStorage.removeItem("token");
    //         }
    //         state.token = action.payload
    //     },
    //     updateUserId(state, action) {
    //         if (action.payload) {
    //             localStorage.setItem("userId", action.payload);
    //         }
    //         else {
    //             localStorage.removeItem("userId");
    //         }
    //         state.userId = action.payload

    //     },
},
)

// export const { updateIsAuthenticated, updateToken, updateUserId } = userSlice.actions
export const { logIn, logOut } = userSlice.actions
export default userSlice.reducer
