import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { checkUserToken } from "../services/apiUser"

const initialState = {
    token: localStorage.getItem("token") || null,
    isAuthenticated: localStorage.getItem("isAuthenticated") ? true : false,
    userId: localStorage.getItem("userId") || null,
}

export const verifyToken = createAsyncThunk("user/verifyToken", async function (_, thunkAPI) {
    try {
        const response = await checkUserToken()
        console.log(response)
        return response
    }
    catch (error) {
        return thunkAPI.rejectWithValue('token invalid')
    }
})

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
    },
    extraReducers: (builder) => builder.addCase(verifyToken.rejected, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.userId = null;

        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userId");
    })
},
)

export const { logIn, logOut } = userSlice.actions
export default userSlice.reducer
