import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ2NThiNTY1LWIwZmMtNGY0YS05MjE0LTgyOGJlNzM0YzI4ZiIsImlhdCI6MTY0MjI0NzM4NywiZXhwIjoxNjQyODUyMTg3fQ.z9HxI4wJZYW-FGWU0ZTEfPITPAXG3D_jiHYzBeKT-sw

// Components
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

// Pages
import { Home } from './pages/Home'
import { Login } from './pages/Login'

const App = () => {

  const [tasks, setTasks] = useState([])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3000/api/tasks', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ2NThiNTY1LWIwZmMtNGY0YS05MjE0LTgyOGJlNzM0YzI4ZiIsImlhdCI6MTY0MjI0NzM4NywiZXhwIjoxNjQyODUyMTg3fQ.z9HxI4wJZYW-FGWU0ZTEfPITPAXG3D_jiHYzBeKT-sw"}`
      }
    })

    const result = await res.json()
    setTasks(result)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  console.log(tasks)

  return (
    <div>
      {
        tasks.map((task) => {
          return (
            <div key={task.id}>
              {task.description}
            </div>
          )
        })
      }
    </div>
  )

  // return (
  //   <div className="App">
  //     <BrowserRouter>
  //         <Navbar />
  //             <Routes>
  //                 <Route>
  //                     <Route path="/" element={<Home />} />
  //                     <Route path="login" element={<Login />} />
  //                 </Route>
  //             </Routes>
  //         <Footer />
  //     </BrowserRouter>
  //   </div>
  // );
}

export default App;
