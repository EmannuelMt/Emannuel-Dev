import { 
  FaWhatsapp, 
  FaEnvelope, 
  FaGithub, 
  FaInstagram, 
  FaLinkedin,
  FaRegCopyright,
  FaHeart,
  FaCode,
  FaServer,
  FaExternalLinkAlt,
  FaPaintBrush,
  FaRocket,
  FaShieldAlt,
  FaMagic,
  FaLightbulb,
  FaGlobe,
  FaMobileAlt,
  FaShoppingCart,
  FaChartLine,
  FaTools,
  FaCog
} from 'react-icons/fa';
import { 
  FiArrowUp,
  FiAward,
  FiCode,
  FiCpu,
  FiDatabase,
  FiLayout,
  FiMail,
  FiMessageSquare,
  FiMonitor,
  FiPenTool,
  FiSmartphone,
  FiTool,
  FiTrendingUp,
  FiZap,
  FiCoffee,
  FiStar,
  FiCloud,
  FiBox
} from 'react-icons/fi';
import { 
  MdOutlineDesignServices,
  MdOutlineWeb,
  MdSmartphone,
  MdStorefront,
  MdSpeed,
  MdSecurity,
  MdPalette,
  MdDevices
} from 'react-icons/md';
import { 
  BiCodeAlt,
  BiServer,
  BiCustomize,
  BiRocket,
  BiShield,
  BiWorld,
  BiChat,
  BiTime
} from 'react-icons/bi';
import { 
  RiCustomerService2Line,
  RiTeamLine,
  RiLeafLine,
  RiFlashlightLine
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './Footer.css';

// Efeito de Partículas
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 30;
    
    // Ajustar canvas para o tamanho do container
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Classe de partícula
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(76, 201, 240, ${Math.random() * 0.3 + 0.1})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Criar partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animação
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Desenhar conexões entre partículas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(76, 201, 240, ${0.1 * (1 - distance/100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Atualizar e desenhar partículas
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="footer-particles" />;
};

// Componente de Assinatura Digital
const DigitalSignature = () => {
  return (
    <div className="digital-signature">
      <div className="signature-content">
        <div className="signature-icon">
          <FaCode />
        </div>
        <div className="signature-text">
          <span>Desenvolvido com</span>
          <span className="signature-heart">
            <FaHeart />
          </span>
          <span>por Emannuel Dev</span>
        </div>
      </div>
      <div className="signature-sparkle"></div>
    </div>
  );
};

// Dados estruturados para melhor organização
const footerData = {
  navigation: [
    { path: "/", label: "Home", icon: <FiLayout /> },
    { path: "/servicos", label: "Serviços", icon: <MdOutlineDesignServices /> },
    { path: "/portfolio", label: "Portfólio", icon: <FiAward /> },
    { path: "/sobre", label: "Sobre Mim", icon: <FiCode /> },
    { path: "/contato", label: "Contato", icon: <FiMessageSquare /> },
    { path: "/blog", label: "Blog", icon: <FiPenTool /> }
  ],
  services: [
    { name: "Sites Institucionais", icon: <MdOutlineWeb />, description: "Presença digital profissional" },
    { name: "Landing Pages", icon: <FiMonitor />, description: "Conversões otimizadas" },
    { name: "Aplicações Web", icon: <FiCpu />, description: "Soluções interativas" },
    { name: "Sistemas Personalizados", icon: <BiCustomize />, description: "Sob medida para você" },
    { name: "E-commerce", icon: <MdStorefront />, description: "Lojas virtuais completas" },
    { name: "Otimização SEO", icon: <FiTrendingUp />, description: "Maior visibilidade" },
    { name: "Design Responsivo", icon: <MdSmartphone />, description: "Perfeito em todos dispositivos" },
    { name: "Manutenção & Suporte", icon: <FiTool />, description: "Sua aplicação sempre funcionando" }
  ],
  expertise: [
    { name: "React & Next.js", icon: <FiZap />, level: 95 },
    { name: "Node.js & Express", icon: <BiServer />, level: 90 },
    { name: "UI/UX Design", icon: <MdPalette />, level: 85 },
    { name: "Bancos de Dados", icon: <FiDatabase />, level: 88 },
    { name: "DevOps & Cloud", icon: <FiCloud />, level: 82 }
  ],
  social: [
    { 
      icon: <FaInstagram />, 
      url: "https://www.instagram.com/emannuel_mt/", 
      label: "Instagram",
      className: "instagram",
      color: "#E1306C"
    },
    { 
      icon: <FaGithub />, 
      url: "https://github.com/EmannuelMt", 
      label: "GitHub",
      className: "github",
      color: "#6e5494"
    },
    { 
      icon: <FaLinkedin />, 
      url: "https://www.linkedin.com/in/emannuel-matos-a98556261/", 
      label: "LinkedIn",
      className: "linkedin",
      color: "#0077b5"
    },
    { 
      icon: <FiMail />, 
      url: "mailto:emannueldevfullstacksolutions@gmail.com", 
      label: "Email",
      className: "email",
      color: "#EA4335"
    }
  ],
  contact: [
    {
      icon: <FaWhatsapp />,
      url: "https://wa.me/5562984317595?text=Olá%20Emannuel%20Dev!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços.",
      text: "(62) 9 8431-7595",
      label: "WhatsApp",
      color: "#25D366"
    },
    {
      icon: <FaEnvelope />,
      url: "mailto:emannueldevfullstacksolutions@gmail.com",
      text: "emannueldevfullstacksolutions@gmail.com",
      label: "Email",
      color: "#EA4335"
    },
    {
      icon: <BiTime />,
      text: "Seg-Sex: 9h-18h | Sáb: 10h-14h",
      label: "Horário de Atendimento",
      color: "#4cc9f0"
    }
  ],
  legal: [
    { url: "/termos", text: "Termos de Serviço", icon: <FiCode /> },
    { url: "/privacidade", text: "Política de Privacidade", icon: <FaShieldAlt /> },
    { url: "/cookies", text: "Política de Cookies", icon: <FiDatabase /> }
  ]
};

// Componentes reutilizáveis
const FooterSection = ({ title, icon, children, className = "", animationDelay = 0 }) => (
  <div 
    className={`footer-col ${className}`}
    style={{ animationDelay: `${animationDelay}ms` }}
  >
    <h4 className="footer-section-title">
      <span className="footer-section-icon-wrapper">
        {icon}
      </span>
      {title}
    </h4>
    {children}
  </div>
);

const FooterLinkList = ({ items, isExternal = false, isRouterLink = false }) => (
  <ul className="footer-links-list">
    {items.map((item, index) => (
      <li 
        key={index} 
        className="footer-link-item"
        style={{ animationDelay: `${100 + (index * 50)}ms` }}
      >
        {isRouterLink ? (
          <Link 
            to={item.path} 
            className="footer-link"
            aria-label={item.label}
          >
            <span className="footer-link-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="footer-link-text">{item.label}</span>
            <span className="footer-link-arrow">
              <FiArrowUp />
            </span>
          </Link>
        ) : isExternal ? (
          <a 
            href={item.url} 
            className="footer-link"
            aria-label={item.text || item.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="footer-link-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="footer-link-text">{item.text || item.label}</span>
            <span className="footer-link-arrow">
              <FiArrowUp />
            </span>
          </a>
        ) : (
          <div className="footer-service-item">
            <span className="footer-service-icon" aria-hidden="true">
              {item.icon}
            </span>
            <div className="footer-service-content">
              <span className="footer-service-text">{item.name}</span>
              <span className="footer-service-desc">{item.description}</span>
            </div>
          </div>
        )}
      </li>
    ))}
  </ul>
);

const SkillBar = ({ name, icon, level }) => (
  <div className="footer-skill-item">
    <div className="footer-skill-header">
      <span className="footer-skill-icon">{icon}</span>
      <span className="footer-skill-name">{name}</span>
      <span className="footer-skill-percent">{level}%</span>
    </div>
    <div className="footer-skill-bar">
      <div 
        className="footer-skill-progress" 
        style={{ width: `${level}%` }}
      ></div>
    </div>
  </div>
);

const ContactInfo = ({ contacts }) => (
  <div className="footer-contact-info">
    {contacts.map((contact, index) => (
      <div 
        key={index} 
        className="footer-contact-item"
        style={{ animationDelay: `${100 + (index * 100)}ms` }}
      >
        <span className="footer-contact-icon-wrapper" style={{ color: contact.color }}>
          {contact.icon}
        </span>
        {contact.url ? (
          <a 
            href={contact.url} 
            className="footer-contact-link"
            aria-label={contact.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contact.text}
          </a>
        ) : (
          <span className="footer-contact-text">{contact.text}</span>
        )}
      </div>
    ))}
  </div>
);

const SocialLinks = ({ socialLinks }) => (
  <div className="footer-social-links">
    {socialLinks.map((social, index) => (
      <a 
        key={index}
        href={social.url} 
        className={`footer-social-link ${social.className}`}
        aria-label={social.label}
        target="_blank"
        rel="noopener noreferrer"
        style={{ 
          animationDelay: `${300 + (index * 100)}ms`,
          '--hover-color': social.color 
        }}
      >
        <span className="footer-social-icon">{social.icon}</span>
        <span className="footer-social-tooltip">{social.label}</span>
        <span className="footer-social-ring"></span>
      </a>
    ))}
  </div>
);

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`footer-scroll-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
    >
      <FiArrowUp />
      <span className="scroll-top-tooltip">Voltar ao topo</span>
    </button>
  );
};

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de sucesso no cadastro
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
    setEmail('');
  };

  return (
    <div className="footer-newsletter">
      <h5 className="footer-newsletter-title">
        <FiMail className="newsletter-title-icon" />
        Newsletter
      </h5>
      <p className="footer-newsletter-text">Receba insights exclusivos sobre desenvolvimento web</p>
      
      {isSubscribed ? (
        <div className="newsletter-success">
          <FiStar className="success-icon" />
          <span>Inscrito com sucesso!</span>
        </div>
      ) : (
        <form className="footer-newsletter-form" onSubmit={handleSubmit}>
          <div className="newsletter-input-wrapper">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail" 
              className="footer-newsletter-input"
              aria-label="Inscrever-se na newsletter"
              required
            />
            <div className="newsletter-input-border"></div>
          </div>
          <button type="submit" className="footer-newsletter-button">
            <FiArrowUp className="button-icon" />
            <span className="button-text">Inscrever</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [visibleSection, setVisibleSection] = useState(null);

  return (
    <footer className="footer" aria-label="Rodapé">
      <div className="footer-background">
        <ParticleBackground />
        <div className="footer-background-gradient"></div>
        <div className="footer-background-pattern"></div>
      </div>
      
      <div className="footer-container">
        {/* Main content grid */}
        <div className="footer-grid">
          
          {/* About column */}
          <FooterSection 
            title="Emannuel Dev"
            icon={<BiCodeAlt />}
            className="footer-about"
            animationDelay={100}
          >
            <div className="footer-brand">
              <div className="footer-brand-logo">
                <FaCode className="footer-brand-icon" aria-hidden="true" />
                <span className="footer-brand-glow"></span>
                <div className="footer-brand-orbit">
                  <div className="orbit-dot"></div>
                  <div className="orbit-dot"></div>
                  <div className="orbit-dot"></div>
                </div>
              </div>
              <div className="footer-brand-text">
                <h3>Emannuel<span className="footer-brand-accent">Dev</span></h3>
                <p className="footer-brand-tagline">Fullstack Developer</p>
              </div>
            </div>
            <p className="footer-description">
              Transformando ideias em experiências digitais excepcionais. 
              Especializado em criar soluções web modernas e de alto desempenho.
            </p>
            <SocialLinks socialLinks={footerData.social} />
          </FooterSection>

          {/* Navigation column */}
          <FooterSection 
            title="Navegação Rápida"
            icon={<FaExternalLinkAlt />}
            animationDelay={200}
          >
            <FooterLinkList 
              items={footerData.navigation} 
              isRouterLink={true}
            />
          </FooterSection>

          {/* Services column */}
          <FooterSection 
            title="Serviços Premium"
            icon={<MdOutlineDesignServices />}
            animationDelay={300}
          >
            <FooterLinkList items={footerData.services} />
          </FooterSection>

          {/* Expertise column */}
          <FooterSection 
            title="Áreas de Expertise"
            icon={<FiAward />}
            animationDelay={400}
          >
            <div className="footer-skills">
              {footerData.expertise.map((skill, index) => (
                <SkillBar 
                  key={index}
                  name={skill.name}
                  icon={skill.icon}
                  level={skill.level}
                />
              ))}
            </div>
          </FooterSection>

          {/* Contact column */}
          <FooterSection 
            title="Contato Direto"
            icon={<BiServer />}
            animationDelay={500}
          >
            <ContactInfo contacts={footerData.contact} />
            <NewsletterForm />
          </FooterSection>
        </div>

        {/* Footer bottom section */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <FaRegCopyright aria-hidden="true" />
            <span>{currentYear} Emannuel Dev Fullstack Solutions. Todos os direitos reservados.</span>
          </div>
          
          <div className="footer-legal-links">
            {footerData.legal.map((link, index) => (
              <a 
                key={index}
                href={link.url} 
                className="footer-legal-link"
                aria-label={link.text}
              >
                <span className="footer-legal-icon">{link.icon}</span>
                {link.text}
              </a>
            ))}
          </div>
          
          <DigitalSignature />
        </div>
      </div>

      <ScrollToTop />
    </footer>
  );
}