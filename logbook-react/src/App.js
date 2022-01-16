import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

// Components
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

// Pages
import { Home } from './pages/Home'
import { Login } from './pages/Login'

// Base URL
const client = axios.create({
  baseURL: 'http://localhost:3000/api'
})

const tokenDefault = localStorage.getItem("accessToken")

if(tokenDefault) {
  const decodeToken = jwt_decode(tokenDefault)

  if(decodeToken.exp*1000 < Date.now()) {
    window.location.href = "/"
  }
}

const App = () => {

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(tokenDefault)
  const [error, setError] = useState(null)

  

  return (
    <div className="App flex flex-col h-screen justify-between bg-myrose-100">
      <BrowserRouter>
          <Navbar user={"Ruangyot"}/>
              <Routes>
                  <Route>
                      <Route path="/" element={<Login />} />
                      <Route path="/logbook" element={<Home />} />
                  </Route>
              </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
