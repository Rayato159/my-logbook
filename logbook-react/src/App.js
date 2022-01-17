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
                  <Route>
                      <Route path="/" element={<Login />} />
                      <Route path="/home" element={<Home />} />
                  </Route>
              </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
