import { 
  FaWhatsapp, 
  FaEnvelope, 
  FaGithub, 
  FaInstagram, 
  FaLinkedin,
  FaRegCopyright,
  FaHeart
} from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { MdOutlineDesignServices } from 'react-icons/md';
import { BiCodeAlt, BiServer } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Navigation links data
  const navigationLinks = [
    { path: "/", label: "Home" },
    { path: "/servicos", label: "Serviços" },
    { path: "/portfolio", label: "Portfólio" },
    { path: "/sobre", label: "Sobre Mim" },
    { path: "/contato", label: "Contato" }
  ];

  // Services list data
  const services = [
    "Sites Institucionais",
    "Landing Pages",
    "Aplicações Web",
    "Sistemas Personalizados",
    "E-commerce",
    "Otimização SEO"
  ];

  // Social media links
  const socialLinks = [
    { 
      icon: <FaInstagram className="text-xl" />, 
      url: "#", 
      label: "Instagram",
      className: "instagram"
    },
    { 
      icon: <FaGithub className="text-xl" />, 
      url: "#", 
      label: "GitHub",
      className: "github"
    },
    { 
      icon: <FaLinkedin className="text-xl" />, 
      url: "#", 
      label: "LinkedIn",
      className: "linkedin"
    }
  ];

  // Contact information
  const contactInfo = [
    {
      icon: <FaWhatsapp className="footer-contact-icon whatsapp" />,
      url: "https://wa.me/5562984317595?text=Olá%20Emannuel%20Dev!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços.",
      text: "(62) 9 8431-7595",
      label: "WhatsApp"
    },
    {
      icon: <FaEnvelope className="footer-contact-icon" />,
      url: "mailto:emannuelmatosdeoliveira@gmail.com",
      text: "emannuelmatosdeoliveira@gmail.com",
      label: "Email"
    }
  ];

  // Legal links
  const legalLinks = [
    { url: "#", text: "Termos de Serviço" },
    { url: "#", text: "Política de Privacidade" }
  ];

  return (
    <footer className="footer" aria-label="Rodapé">
      <div className="footer-container">
        {/* Main content grid */}
        <div className="footer-grid">
          
          {/* About column */}
          <div className="footer-col footer-about">
            <div className="footer-brand">
              <BiCodeAlt className="footer-brand-icon" aria-hidden="true" />
              <h3 className="footer-brand-text">
                Emannuel Dev
              </h3>
            </div>
            <p className="footer-description">
              Transformando ideias em soluções digitais de alto impacto.
            </p>
            
            {/* Social media links */}
            <div className="footer-social-links">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  className={`footer-social-link ${social.className}`}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div className="footer-col">
            <h4 className="footer-section-title">
              <FiExternalLink className="footer-section-icon" aria-hidden="true" />
              Navegação
            </h4>
            <ul className="footer-links-list">
              {navigationLinks.map((item) => (
                <li key={item.path} className="footer-link-item">
                  <Link 
                    to={item.path} 
                    className="footer-link"
                    aria-label={item.label}
                  >
                    <span className="footer-link-bullet" aria-hidden="true"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div className="footer-col">
            <h4 className="footer-section-title">
              <MdOutlineDesignServices className="footer-section-icon" aria-hidden="true" />
              Serviços
            </h4>
            <ul className="footer-links-list">
              {services.map((service, index) => (
                <li key={index} className="footer-link-item">
                  <span className="footer-link-bullet" aria-hidden="true"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="footer-col">
            <h4 className="footer-section-title">
              <BiServer className="footer-section-icon" aria-hidden="true" />
              Contato
            </h4>
            <div className="footer-contact-info">
              {contactInfo.map((contact, index) => (
                <div key={index} className="footer-contact-item">
                  {contact.icon}
                  <a 
                    href={contact.url} 
                    className="footer-contact-link"
                    aria-label={contact.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contact.text}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer bottom section */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <FaRegCopyright className="text-sm" aria-hidden="true" />
            <span>{currentYear} Emannuel Dev. Todos os direitos reservados.</span>
          </div>
          
          <div className="footer-legal-links">
            {legalLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url} 
                className="footer-legal-link"
                aria-label={link.text}
              >
                {link.text}
              </a>
            ))}
          </div>
          
          <div className="footer-made-with">
            <span>Feito com</span>
            <FaHeart className="footer-heart" aria-label="amor" />
            <span>por Emannuel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}