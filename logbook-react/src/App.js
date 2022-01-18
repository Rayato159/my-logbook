import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import jwt_decode from 'jwt-decode'

// API
import { getUserInfo } from './api/UserAPI'

// Components
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

// Pages
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { AddTask } from './pages/AddTask'
import { EditTask } from './pages/EditTask'
import { NotFound } from './pages/NotFound'

// Redux State
import { useSelector, useDispatch } from 'react-redux'
import { userSuccess, userFail, userLoading } from './features/userSlice'

const App = () => {

  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.user)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getUserInfo()
        dispatch(userSuccess(res))
      } catch(e) {
        dispatch(userFail(e.message))
      }
    }

    dispatch(userLoading())
    fetchUser()
  }, [])

  return (
    <div className="App flex flex-col h-screen justify-between">
      <BrowserRouter>
          <Navbar user={userInfo}/>
              <Routes>
                <Route index element={<Login />} />
                <Route path="home" element={<Home />} />
                  <Route path="home/add_task" element={<AddTask />} />
                  <Route path="home/edit_task" element={<EditTask />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
