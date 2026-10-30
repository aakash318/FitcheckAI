import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Header from './Component/Header'
import HeroSection from './Component/HeroSection'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <HeroSection />
    </>
  )
}

export default App
