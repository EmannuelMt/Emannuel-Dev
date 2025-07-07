import { FaWhatsapp, FaEnvelope, FaGithub, FaInstagram } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="contact-page">
      <section className="intro">
        <div className="container">
          <h1>Contato</h1>
          <p>Entre em contato para tirar dúvidas ou solicitar um orçamento</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-form">
            <form>
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="project-type">Tipo de Projeto</label>
                <select id="project-type">
                  <option value="">Selecione...</option>
                  <option value="site-simples">Site Simples</option>
                  <option value="site-completo">Site Completo</option>
                  <option value="landing-page">Landing Page</option>
                  <option value="bot-discord">Bot Discord</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea id="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="submit-button">Enviar Mensagem</button>
            </form>
          </div>

          <div className="contact-info">
            <h2>Informações de Contato</h2>
            <div className="contact-method">
              <FaWhatsapp className="contact-icon" />
              <a href="https://wa.me/SEUNUMERO">WhatsApp</a>
            </div>
            <div className="contact-method">
              <FaEnvelope className="contact-icon" />
              <a href="mailto:contato@emanueldev.com">contato@emanueldev.com</a>
            </div>
            <div className="social-links">
              <a href="https://instagram.com/seuinstagram" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" />
              </a>
              <a href="https://github.com/seugithub" target="_blank" rel="noopener noreferrer">
                <FaGithub className="social-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}