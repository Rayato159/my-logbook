import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = { username: "", password: "" }

export const userSlice = createSlice({
    
    name: 'user',
    initialState: {
        isLoading: false,
        isAuth: false,
        error: '',
    },

    reducers: {
        loginPending: (state) => {
            state.isLoading = true
        },

        loginSuccess: (state) => {
            state.isLoading = false
            state.isAuth = true
            state.error = ''
        },

        loginFail: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        },

        logout: (state) => {
            state.value = initialStateValue
            localStorage.removeItem("accessToken")
        }
    }
})

export const { loginPending, loginSuccess, loginFail, logout } = userSlice.actions

export default userSlice.reducer