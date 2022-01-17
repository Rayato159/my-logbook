import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/loginSlice'
import userReducer from '../features/userSlice'
import taskReducer from '../features/taskSlice'

export default configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    task: taskReducer,
  }
})