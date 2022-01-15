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

  const isLogin = (username, password) => {
    setUser({ username, password })
  }

  console.log(user)

  return (
    <div className="App flex flex-col h-screen justify-between bg-myrose-100">
      <BrowserRouter>
          <Navbar user={null}/>
              <Routes>
                  <Route>
                      <Route path="/" element={<Home />} />
                      <Route path="login" element={<Login isLogin={isLogin} />} />
                  </Route>
              </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
