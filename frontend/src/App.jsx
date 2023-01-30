import { useState } from 'react'
import { Outlet } from "react-router-dom";
import Header from './components/Header'
import Home from './pages/home/Home';


function App() {

  return (
      <>
        <Home />
      </>
  )
}

export default App
