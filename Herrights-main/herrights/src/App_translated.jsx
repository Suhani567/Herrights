import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar_new'
import Hero from './Components/Hero_new'
import Cards from './Components/Cards'
import CommunityStories from './Components/CommunityStories'
import Footer from './Components/Footer_new'
import Testimonials from './Components/Testimonials'
import AskAIPage from './Components/AskAIPage'
import LawsPage from './Components/LawsPage'
import ComplaintFormPage from './Components/ComplaintFormPage'
import DocumentGeneratorPage from './Components/DocumentGeneratorPage'
import FAQPage from './Components/FAQPage'
import LoginPage from './Components/LoginPage_new'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
  return (
    <LanguageProvider>
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
            <Route path="/laws" element={<LawsPage />} />
            <Route path="/file-complaint" element={<ComplaintFormPage />} />
            <Route path="/generate-document" element={<DocumentGeneratorPage />} />
            <Route path="/faqs" element={<FAQPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
