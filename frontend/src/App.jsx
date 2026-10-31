import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Header from './Component/Header'
import HeroSection from './Component/HeroSection'
import FitCheckLandingPage from './Component/FitCheckLandingPage'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SessionRoom from './session/SessionRoom'

function App() {


  return (
    <>
        <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <FitCheckLandingPage />
            </>
          }
        />

        <Route
          path="/sessionroom"
          element={<SessionRoom />}
        />
      </Routes>
    </BrowserRouter>
       
      
    </>
     
  )
}

export default App
