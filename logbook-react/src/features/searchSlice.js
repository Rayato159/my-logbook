import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    
    name: 'search',
    initialState: {
        keyword: "",
        isLoading: false,
        errors: [],
    },

    reducers: {
        searchPending: (state) => {
            state.isLoading = true
        },

        searchSuccess: (state, { payload }) => {
            state.isLoading = false
            state.keyword = payload
            state.errors = []
        },

        searchFail: (state, { payload }) => {
            state.isLoading = false
            state.errors = payload
        },
    }
})

export const { searchPending, searchSuccess, searchFail } = searchSlice.actions

export default searchSlice.reducer