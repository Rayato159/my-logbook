import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/loginSlice'
import userReducer from '../features/userSlice'
import errorReducer from '../features/errorSlice'

export default configureStore({
  reducer: {
    details: loginReducer,
    user: userReducer,
    error: errorReducer,
  }
})