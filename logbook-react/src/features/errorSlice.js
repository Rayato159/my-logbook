import { createSlice } from '@reduxjs/toolkit'

export const errorSlice = createSlice({
    name: 'error',
    initialState: {},

    reducers: {
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setError } = errorSlice.reducer

export default errorSlice.reducer