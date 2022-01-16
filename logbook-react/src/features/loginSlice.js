import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'details',
    initialState: {
        username: "",
        password: "",
    },

    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
    }
})

export const { setUsername, setPassword } = loginSlice.actions

export default loginSlice.reducer