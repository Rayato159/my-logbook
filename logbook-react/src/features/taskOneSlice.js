import { createSlice } from '@reduxjs/toolkit'

export const taskOneSlice = createSlice({
    
    name: 'taskOne',
    initialState: {
        isLoading: false,
        taskOneInfo: { title: "", description: "" },
        errors: [],
    },

    reducers: {
        taskOneLoading(state) {
            state.isLoading = true
        },

        taskOneSuccess: (state, { payload }) => {
            state.isLoading = false
            state.taskOneInfo = payload
            state.errors = []
        },

        taskOneFail: (state, { payload }) => {
            state.isLoading = false
            state.errors = payload
        },
    }
})

export const { taskOneLoading, taskOneSuccess, taskOneFail } = taskOneSlice.actions

export default taskOneSlice.reducer