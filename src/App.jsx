import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout/FirstLayout'
import Hero from './components/HeroSection'
import Carrusel from './components/Carrusel'
import Cities from './Cities'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Carrusel />
            </>
          } />
          <Route path="/cities" element={<Cities />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
