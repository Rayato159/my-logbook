import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    
    name: 'user',
    initialState: {
        isLoading: false,
        userInfo: null,
        error: [],
    },

    reducers: {
        userLoading(state) {
            state.isLoading = true
        },

        userSuccess: (state, { payload }) => {
            state.isLoading = false
            state.userInfo = payload
            state.error = []
        },

        userFail: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        },
    }
})

export const { userLoading, userSuccess, userFail } = userSlice.actions

export default userSlice.reducer