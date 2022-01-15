import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

// Pages
import { Home } from './pages/Home'
import { Login } from './pages/Login'

const App = () => {

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const [isErrorArray, setIsErrorArray] = useState([])

  const isLogin = (username, password) => {
    fetchLogin(username, password)
  }

  const isLogout = () => {
    sessionStorage.removeItem("accessToken")
    setToken(null)
  }
  
  const fetchLogin = async (username, password) => {
    const res = await fetch('http://localhost:3000/api/auth/signin', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })

    const result = await res.json()

    if(!res.ok) {
      //Check if error return in array
      if(Array.isArray(result.message)){

        setIsErrorArray(result.message)
      } else {

        setError(result.message)
      }
    } else {
      sessionStorage.setItem("accessToken", result.accessToken)
      setToken(result.accessToken)
    }
  }

  const fetchUser = async () => {
    const res = await fetch('http://localhost:3000/api/auth/profile', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
      }
    })

    const result = await res.json()

    if(res.ok) {
      setUser(result)
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    fetchUser()
  }, [token])

  return (
    <div className="App flex flex-col h-screen justify-between bg-myrose-100">
      <BrowserRouter>
          <Navbar user={user} isLogout={isLogout}/>
              <Routes>
                  <Route>
                      <Route path="/" element={<Home />} />
                      <Route path="login" element={<Login user={user} isLogin={isLogin} isError={error} isErrorArray={isErrorArray} />} />
                  </Route>
              </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
