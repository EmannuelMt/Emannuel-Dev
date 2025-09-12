import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import Chatbot from './components/Chatbot';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Novo componente


function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header />

        <main className="main-content">
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/precos" element={<Pricing />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/esqueci-senha" element={<ForgotPassword />} />
            
            {/* Rotas protegidas - só acessíveis quando logado */}
            <Route 
              path="/perfil" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Rota para página não encontrada */}
            <Route path="*" element={<NotFound />} />
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

        {/* Componente do Chatbot */}
        <Chatbot />
      </div>
    </Router>
  );
}

// Componente para página não encontrada
function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404 - Página Não Encontrada</h1>
        <p>A página que você está procurando não existe.</p>
        <a href="/" className="home-button">Voltar para Home</a>
      </div>
    </div>
  );
}

export default App;