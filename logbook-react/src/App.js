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
  const [error, setError] = useState(null)

  const isLogin = (username, password) => {
    setUser({ username, password })
    fetchLogin(username, password)
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
      setError(result)
    }

    setUser(result)
  }

  return (
    <div className="App flex flex-col h-screen justify-between bg-myrose-100">
      <BrowserRouter>
          <Navbar user={user}/>
              <Routes>
                  <Route>
                      <Route path="/" element={<Home />} />
                      <Route path="login" element={<Login isLogin={isLogin} isError={error} />} />
                  </Route>
              </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
