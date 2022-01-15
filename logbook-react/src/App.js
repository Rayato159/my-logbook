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

  return (
    <div className="App flex flex-col h-screen justify-between">
      <BrowserRouter>
          <Navbar user={user}/>
              <Routes>
                  <Route>
                      <Route path="/" element={<Home />} />
                      <Route path="login" element={<Login />} />
                  </Route>
              </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
