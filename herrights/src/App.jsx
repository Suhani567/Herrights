import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Cards from './Components/Cards'
import CommunityStories from './Components/CommunityStories'
import Footer from './Components/Footer'
import Testimonials from './Components/Testimonials'
import AskAIPage from './Components/AskAIPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <Cards />
              <CommunityStories />
              <Testimonials />
              <Footer />
            </>
          } />
          <Route path="/ask-ai" element={<AskAIPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
