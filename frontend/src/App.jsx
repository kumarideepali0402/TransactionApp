import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter} from 'react-router-dom'
import { Route,Routes } from 'react-router-dom'
import './App.css'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
import SendMoney from './Pages/SendMoney'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/sendMoney" element={<SendMoney/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
