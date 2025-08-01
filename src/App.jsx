import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
<<<<<<< HEAD
=======
import Chatbot from './components/Chatbot';
>>>>>>> aefe7df (Corrige carregamento de imagem e atualiza seção About)

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/precos" element={<Pricing />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
          </Routes>
        </main>
        
        <Footer />
        
        {/* Botão flutuante do WhatsApp */}
        <a 
          href="https://wa.me/SEUNUMERO" 
          className="whatsapp-float"
          target="_blank" 
          rel="noopener noreferrer"
        >
          <i className="whatsapp-icon"></i>
        </a>
<<<<<<< HEAD
=======
        
        {/* Componente do Chatbot */}
        <Chatbot />
>>>>>>> aefe7df (Corrige carregamento de imagem e atualiza seção About)
      </div>
    </Router>
  );
}

export default App;