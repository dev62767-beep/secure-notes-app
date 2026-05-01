import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Notes from './pages/Notes'
import Mynotes from './pages/Mynotes'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login />} />
        <Route path='/notes' element={<Notes />} />
        {/* <Route  path='/mynotes' element={<Mynotes />} /> */}
      </Routes>
        
      
    </Router>
  )
  
}

export default App
