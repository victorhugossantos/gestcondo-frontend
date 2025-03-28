import './App.css'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Avisos from './pages/Avisos'
import Moradores from './pages/Moradores'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/avisos' element={<Avisos />} />
        <Route path='/moradores' element={<Moradores />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
