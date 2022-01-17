import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    
    name: 'login',
    initialState: {
        isLoading: false,
        isAuth: false,
        errors: [],
    },

    reducers: {
        loginPending: (state) => {
            state.isLoading = true
        },

        loginSuccess: (state) => {
            state.isLoading = false
            state.isAuth = true
            state.errors = []
        },

        loginFail: (state, { payload }) => {
            state.isLoading = false
            state.errors = payload
        },

        logout: (state) => {
            localStorage.removeItem("accessToken")
            state.isAuth = false
            state.errors = []
        }
    }
})

export const { loginPending, loginSuccess, loginFail, logout } = loginSlice.actions

export default loginSlice.reducer