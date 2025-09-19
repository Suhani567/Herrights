import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Cards from './Components/Cards'
import CommunityStories from './Components/CommunityStories'
import Footer from './Components/Footer'

function App() {
  

  return (
    <>
     <Navbar />
     <Hero />
     <Cards />
     {/* //the web3 feature */}
     <CommunityStories />
     <Footer />
    </>
  )
}

export default App
