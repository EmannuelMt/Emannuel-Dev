import { FaWhatsapp, FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css'; // Certifique-se de criar este arquivo CSS para estilizar o rodapé

export default function Footer() {
  return (
    <footer className="footer bg-dark text-light">
      <div className="container">
        <div className="footer-grid">
          {/* Coluna Sobre */}
          <div className="footer-col">
            <h3 className="brand">Emannuel Dev</h3>
            <p className="footer-description">Soluções digitais sob medida para você e seu negócio.</p>
            <div className="social-links">
              <a href="https://instagram.com/seuinstagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="social-icon" />
              </a>
              <a href="https://github.com/seugithub" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub className="social-icon" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="social-icon" />
              </a>
            </div>
          </div>

          {/* Coluna Links */}
          <div className="footer-col">
            <h4 className="footer-title">Links Rápidos</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/servicos" className="footer-link">Serviços</Link></li>
              <li><Link to="/portfolio" className="footer-link">Portfólio</Link></li>
              <li><Link to="/precos" className="footer-link">Preços</Link></li>
              <li><Link to="/sobre" className="footer-link">Sobre</Link></li>
              <li><Link to="/contato" className="footer-link">Contato</Link></li>
            </ul>
          </div>

          {/* Coluna Serviços */}
          <div className="footer-col">
            <h4 className="footer-title">Serviços</h4>
            <ul className="footer-links">
              <li><Link to="/servicos" className="footer-link">Sites Institucionais</Link></li>
              <li><Link to="/servicos" className="footer-link">Landing Pages</Link></li>
              <li><Link to="/servicos" className="footer-link">Bots Discord</Link></li>
              <li><Link to="/servicos" className="footer-link">Sistemas Web</Link></li>
              <li><Link to="/servicos" className="footer-link">E-commerce</Link></li>
              <li><Link to="/servicos" className="footer-link">SEO</Link></li>
            </ul>
          </div>

          {/* Coluna Contato */}
          <div className="footer-col">
            <h4 className="footer-title">Contato</h4>
            <ul className="contact-info">
              <li className="contact-item">
                <FaWhatsapp className="contact-icon" /> 
                <a href="https://wa.me/SEUNUMERO" target="_blank" rel="noopener noreferrer" className="contact-link">
                  (XX) XXXX-XXXX
                </a>
              </li>
              <li className="contact-item">
                <FaEnvelope className="contact-icon" /> 
                <a href="mailto:contato@emanueldev.com" className="contact-link">
                  contato@emanueldev.com
                </a>
              </li>
            </ul>
            
            <div className="newsletter">
              <h5>Receba nossas novidades</h5>
              <form className="newsletter-form">
                <input type="email" placeholder="Seu melhor e-mail" className="newsletter-input" />
                <button type="submit" className="newsletter-button">Assinar</button>
              </form>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Emannuel Dev. Todos os direitos reservados.</p>
            <p>Desenvolvido  por Emannuel Dev</p>
          </div>
          
          <div className="footer-legal">
            <Link to="/politica-de-privacidade" className="legal-link">Política de Privacidade</Link>
            <Link to="/termos-de-uso" className="legal-link">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}