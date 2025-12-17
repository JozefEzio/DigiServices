import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './components/pages/LandingPage'
import ListTickets from './components/pages/ListTickets'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/tickets' element={<ListTickets/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App