import { createSlice } from '@reduxjs/toolkit'

export const taskSlice = createSlice({
    
    name: 'task',
    initialState: {
        isLoading: false,
        taskInfo: [],
        error: [],
    },

    reducers: {
        taskLoading(state) {
            state.isLoading = true
        },

        taskSuccess: (state, { payload }) => {
            state.isLoading = false
            state.taskInfo = payload
            state.error = []
        },

        taskFail: (state, { payload }) => {
            state.isLoading = false
            state.error = payload
        },
    }
})

export const { taskLoading, taskSuccess, taskFail } = taskSlice.actions

export default taskSlice.reducer