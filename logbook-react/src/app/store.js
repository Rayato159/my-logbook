import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/loginSlice'
import userReducer from '../features/userSlice'
import taskReducer from '../features/taskSlice'
import taskOneReducer from '../features/taskOneSlice'
import searchReducer from '../features/searchSlice'

export default configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    task: taskReducer,
    taskOne: taskOneReducer,
    search: searchReducer,
  }
})