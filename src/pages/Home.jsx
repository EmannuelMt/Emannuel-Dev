import { useState, useRef, useEffect } from 'react';
import {
  FaLaptopCode,
  FaRobot,
  FaMobileAlt,
  FaArrowRight,
  FaWhatsapp,
  FaRegClock,
  FaRegMoneyBillAlt,
  FaRegUserCircle,
  FaChevronDown,
  FaChevronUp,
  FaCode,
  FaEye,
  FaShieldAlt,
  FaRocket,
  FaServer,
  FaPalette,
  FaChartLine,
  FaCog,
  FaLightbulb,
  FaUsers,
  FaGlobe,
  FaShoppingCart,
  FaDatabase,
  FaLock,
  FaSyncAlt,
  FaMagic,
  FaTachometerAlt,
  FaBookOpen,
  FaPenFancy,
  FaComments,
  FaHandshake,
  FaStar,
  FaCheck,
  FaTimes,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaInstagram,
  FaLinkedin,
  FaGithub
} from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import './Home.css';

import profileImage from './AIDrawing_250911_d80e2d99-024a-4ae2-bd8e-9c4422800165_0_MiriCanvas.png';
import buguerDeliciaImage from './Opera Instantâneo_2025-10-22_230837_buguerdelicia.netlify.app.png';

// Componentes modulares
const ServiceCard = ({ service, index }) => (
  <motion.article
    className="service-card"
    whileHover={{ y: -10 }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="service-icon-container">
      {service.icon}
    </div>
    <h3>{service.title}</h3>
    <p>{service.description}</p>
    <div className="service-highlight">
      {service.highlight}
    </div>
    <a href={`/servicos#${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="service-link">
      Saiba mais <FaArrowRight />
    </a>
  </motion.article>
);

const FAQItem = ({ faq, index, activeIndex, toggleFaq }) => (
  <div className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
    <button
      className="faq-question"
      onClick={() => toggleFaq(index)}
      aria-expanded={activeIndex === index}
      aria-controls={`faq-answer-${index}`}
    >
      <h3>{faq.question}</h3>
      {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
    </button>
    <div id={`faq-answer-${index}`} className="faq-answer" role="region">
      <p>{faq.answer}</p>
    </div>
  </div>
);

const PricingCard = ({ plan, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      className={`pricing-card ${plan.popular ? 'popular' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {plan.popular && <div className="popular-badge">Mais escolhido</div>}
      <h3>{plan.name}</h3>
      <div className="pricing-value">
        {plan.price}
        <span className="pricing-period">{plan.period}</span>
      </div>
      <ul className="pricing-features">
        {plan.features.map((feature, i) => (
          <li key={i}>
            <FaCheck className="feature-check" />
            {feature}
          </li>
        ))}
      </ul>
      <a href="/contato" className="pricing-button">
        Solicitar orçamento
      </a>
    </motion.div>
  );
};

const PortfolioItem = ({ item, index }) => (
  <motion.article
    className="portfolio-item"
    whileHover={{ scale: 1.03 }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="portfolio-image">
      <img src={item.image} alt={item.title} loading="lazy" />
      <div className="portfolio-overlay">
        <h3>{item.title}</h3>
        <span>{item.type}</span>
        <a href={`/portfolio/${item.title.toLowerCase().replace(/\s+/g, '-')}`} className="portfolio-link">
          Ver detalhes
        </a>
      </div>
    </div>
  </motion.article>
);

const BlogCard = ({ post, index }) => (
  <motion.article
    className="blog-card"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="blog-category">{post.category}</div>
    <h3>{post.title}</h3>
    <p>{post.excerpt}</p>
    <div className="blog-meta">
      <span>{post.readTime}</span>
    </div>
    <a href="/blog" className="blog-link">
      Ler artigo <FaArrowRight />
    </a>
  </motion.article>
);

// Componente Principal
export default function Home() {
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const services = [
    {
      icon: <FaLaptopCode className="service-icon" />,
      title: "Sites Profissionais",
      description: "Desenvolvimento de sites modernos, rápidos e responsivos",
      highlight: "Ideal para autônomos e pequenos negócios"
    },
    {
      icon: <FaMobileAlt className="service-icon" />,
      title: "Landing Pages",
      description: "Páginas de alta conversão para campanhas específicas",
      highlight: "Aumente suas vendas online"
    },
    {
      icon: <FaRobot className="service-icon" />,
      title: "Bots para Discord",
      description: "Automatizações inteligentes para sua comunidade",
      highlight: "Melhore a interação do seu servidor"
    },
    {
      icon: <FaShoppingCart className="service-icon" />,
      title: "E-commerce",
      description: "Lojas virtuais completas com painel administrativo",
      highlight: "Venda online 24/7"
    },
    {
      icon: <FaCog className="service-icon" />,
      title: "Sistemas Personalizados",
      description: "Soluções sob medida para necessidades específicas",
      highlight: "Automatize seus processos"
    },
    {
      icon: <FaServer className="service-icon" />,
      title: "Hospedagem & Manutenção",
      description: "Serviços completos de hospedagem e manutenção contínua",
      highlight: "Seu site sempre funcionando"
    }
  ];

  const portfolioItems = [
    {

      title: "Buguer Delicia",
      type: "O Burger Delícia - Cardápio Online é uma plataforma digital moderna que transforma a maneira como seus clientes fazem pedidos.",
      image: buguerDeliciaImage
    },
  ];

  const pricingPlans = [
    {
      name: "Landing Page",
      price: "R$ 500",
      period: "único",
      features: ["1 página otimizada", "Design responsivo", "Formulário de contato", "Otimização básica SEO", "Entrega em 5 dias"],
      popular: false
    },
    {
      name: "Site Institucional",
      price: "R$ 1.200",
      period: "único",
      features: ["Até 5 páginas", "Design personalizado", "Formulário de contato", "SEO básico", "Painel administrativo", "Responsivo", "Suporte 30 dias"],
      popular: true
    },
    {
      name: "Site Profissional",
      price: "R$ 2.500",
      period: "único",
      features: ["Até 15 páginas", "Design premium", "Blog integrado", "SEO avançado", "Painel administrativo completo", "Integração com redes sociais", "Suporte 60 dias"],
      popular: false
    },
    {
      name: "E-commerce",
      price: "R$ 3.500",
      period: "único",
      features: ["Catálogo de produtos", "Carrinho de compras", "Integração com pagamentos", "Painel administrativo", "Relatórios de vendas", "SEO otimizado", "Suporte 90 dias"],
      popular: false
    },
    {
      name: "Manutenção Mensal",
      price: "R$ 150",
      period: "/mês",
      features: ["Atualizações de segurança", "Backups regulares", "Suporte técnico", "Otimizações de performance", "Atualizações de conteúdo (até 2h)"],
      popular: false
    }
  ];

  const blogPosts = [
    {
      title: "Como escolher a plataforma ideal para seu site",
      excerpt: "Descubra as melhores opções para seu negócio e orçamento.",
      category: "Desenvolvimento Web",
      readTime: "5 min de leitura"
    },
    {
      title: "5 estratégias de SEO que todo site pequeno precisa",
      excerpt: "Aumente sua visibilidade no Google com técnicas simples e eficazes.",
      category: "Marketing Digital",
      readTime: "7 min de leitura"
    },
    {
      title: "Por que seu negócio precisa de um site responsivo em 2024",
      excerpt: "Entenda a importância da mobile-first approach nos dias de hoje.",
      category: "Tendências",
      readTime: "6 min de leitura"
    }
  ];

  const faqs = [
    {
      question: "Qual o prazo médio de entrega?",
      answer: "Landing pages: 5 dias úteis. Sites institucionais: 10-15 dias úteis. E-commerce: 15-20 dias úteis. Sistemas personalizados: prazo variável conforme complexidade."
    },
    {
      question: "Vocês oferecem suporte pós-entrega?",
      answer: "Sim, todos os projetos incluem suporte gratuito (30 dias para sites, 60 dias para sites profissionais, 90 dias para e-commerce). Após este período, oferecemos planos de manutenção mensal com valores acessíveis."
    },
    {
      question: "Posso fazer alterações no site depois?",
      answer: "Sim! Todos os nossos pacotes profissionais incluem painel administrativo para edições básicas. Para alterações mais complexas, oferecemos serviços de manutenção e atualização conforme sua necessidade."
    },
    {
      question: "Qual a forma de pagamento?",
      answer: "Aceitamos parcelamento em até 12x no cartão (com juros da operadora), transferência bancária ou PIX (com 5% de desconto para pagamento à vista). Para projetos maiores, podemos dividir em etapas com payentos parcelados."
    },
    {
      question: "Meu site ficará responsivo para mobile?",
      answer: "Sim! Todos os nossos projetos são desenvolvidos com abordagem mobile-first, garantindo que seu site funcione perfeitamente em smartphones, tablets e desktops."
    },
    {
      question: "Vocês fazem hospedagem do site?",
      answer: "Oferecemos serviço completo de hospedagem com otimização para performance e segurança. Também podemos ajudar a migrar sites existentes para nossa infraestrutura."
    },
    {
      question: "Como funciona o processo de criação?",
      answer: "1) Briefing e entendimento do projeto; 2) Proposta e contrato; 3) Desenvolvimento do design; 4) Aprovação do cliente; 5) Implementação e programação; 6) Revisões e ajustes; 7) Treinamento e entrega; 8) Suporte pós-entrega."
    },
    {
      question: "Posso ver exemplos de trabalhos anteriores?",
      answer: "Claro! Temos um portfólio completo com casos de sucesso. Agende uma call para conversarmos e mostrarmos projetos similares ao que você precisa."
    }
  ];

  const features = [
    {
      icon: <FaPalette />,
      title: "Design Exclusivo",
      description: "Criamos designs únicos que refletem sua marca e encantam seus clientes"
    },
    {
      icon: <FaRocket />,
      title: "Performance Otimizada",
      description: "Sites rápidos que melhoram a experiência do usuário e o SEO"
    },
    {
      icon: <FaShieldAlt />,
      title: "Segurança Avançada",
      description: "Proteção contra ameaças e garantia de que seus dados estarão seguros"
    },
    {
      icon: <FaSyncAlt />,
      title: "Atualização Constante",
      description: "Mantenha seu site sempre atualizado com as últimas tecnologias"
    },
    {
      icon: <FaMagic />,
      title: "Tecnologia Moderna",
      description: "Utilizamos as ferramentas mais atuais do mercado para desenvolvimento"
    },
    {
      icon: <FaTachometerAlt />,
      title: "Painel Administrativo",
      description: "Controle seu conteúdo de forma fácil e intuitiva sem precisar de conhecimentos técnicos"
    }
  ];

  const stats = [
    { value: "50+", label: "Projetos Entregues" },
    { value: "98%", label: "Clientes Satisfeitos" },
    { value: "24/7", label: "Suporte Disponível" },
    { value: "100%", label: "Sites Responsivos" }
  ];

  const testimonials = [
    {
      name: "Carlos Silva",

      role: "Diretor - Golden Grill",

      content: "O sistema desenvolvido pela Emannuel Dev revolucionou nosso restaurante. Agora conseguimos gerenciar pedidos online com eficiência e nossos clientes amam a experiência!",
      rating: 5
    },
    {
      name: "Marina Oliveira",

      role: "Proprietária - Cantinho do Universo",

      content: "Fiquei impressionada com a qualidade do meu site pessoal. Profissionalismo, atenção aos detalhes e entrega dentro do prazo. Super recomendo!",
      rating: 5
    },
    {
      name: "Ricardo Mendes",

      role: "Game Master - Ecos da Realidade",
      content: "A plataforma que criaram para nossa comunidade de RPG é incrível. Os jogadores adoraram as funcionalidades e a interface intuitiva.",
      rating: 5
    }
  ];

  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-title"
            >
              Soluções Digitais <span className="gradient-text">que Impulsionam</span> seu Negócio
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hero-subtitle"
            >
              Desenvolvimento web personalizado com foco em resultados e experiência do usuário
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hero-cta"
            >
              <a href="#contato" className="cta-button primary">
                <FaWhatsapp /> Solicite um orçamento
              </a>
              <a href="#servicos" className="cta-button secondary">
                Conheça nossos serviços <FaChevronDown />
              </a>
            </motion.div>

            <div className="hero-stats">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="stat-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                >
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hero-image"
          >
            <div className="image-container">
              <img src={profileImage} alt="Desenvolvimento Web - Emannuel Dev" loading="eager" />
              <div className="floating-elements">
                <div className="floating-element element-1"><FaCode /></div>
                <div className="floating-element element-2"><FaRocket /></div>
                <div className="floating-element element-3"><FaPalette /></div>
              </div>
            </div>
          </motion.figure>
        </div>

        <div className="scroll-indicator">
          <FaChevronDown className="bounce" />
        </div>
      </section>

      <main>
        {/* Stats Bar */}
        <section className="stats-bar">
          <div className="container">
            {stats.map((stat, index) => (
              <div key={index} className="stat-bar-item">
                <div className="stat-bar-value">{stat.value}</div>
                <div className="stat-bar-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Sobre Section */}
        <section id="sobre" className="bio-section" aria-labelledby="sobre-title">
          <div className="container">
            <div className="bio-card">
              <div className="bio-content">
                <h2 id="sobre-title">Sobre a Emannuel Dev</h2>
                <p>
                  Na <strong>Emannuel Dev</strong>, transformamos ideias em presença digital de verdade. Somos especializados em criar <strong>sites, e-commerces, sistemas personalizados e landing pages</strong> que não apenas impressionam visualmente, mas principalmente geram resultados reais para pequenos negócios, autônomos e prestadores de serviço.
                </p>
                <p>
                  Com uma abordagem prática e transparente, entendemos que cada negócio é único. Por isso, nos dedicamos a compreender profundamente seus objetivos para desenvolver soluções que realmente funcionem para você. Nossos valores são baseados em:
                </p>
                
                <div className="bio-values">
                  <div className="value-item">
                    <FaHandshake />
                    <span>Transparência absoluta</span>
                  </div>
                  <div className="value-item">
                    <FaUsers />
                    <span>Atendimento personalizado</span>
                  </div>
                  <div className="value-item">
                    <FaRocket />
                    <span>Compromisso com resultados</span>
                  </div>
                  <div className="value-item">
                    <FaRegMoneyBillAlt />
                    <span>Preços justos e acessíveis</span>
                  </div>
                </div>

                <p>
                  Trabalhamos com as tecnologias mais modernas do mercado, garantindo que seu projeto não apenas atenda às necessidades atuais, mas esteja preparado para o futuro. Desde a concepção até a entrega e beyond, estamos com você em cada etapa do processo.
                </p>
                
                <a href="#contato" className="bio-link">
                  Entre em contato <FaArrowRight />
                </a>
              </div>

              <div className="bio-highlights">
                <div className="highlight-item">
                  <FaRegClock className="highlight-icon" />
                  <div>
                    <h4>Entrega Rápida</h4>
                    <p>Projetos entregues em até 10 dias úteis, com agilidade e qualidade.</p>
                  </div>
                </div>

                <div className="highlight-item">
                  <FaRegMoneyBillAlt className="highlight-icon" />
                  <div>
                    <h4>Preço Justo</h4>
                    <p>Soluções acessíveis, sem perder valor ou qualidade.</p>
                  </div>
                </div>

                <div className="highlight-item">
                  <FaRegUserCircle className="highlight-icon" />
                  <div>
                    <h4>Suporte Dedicado</h4>
                    <p>Acompanhamento próximo e personalizado do início ao pós-entrega.</p>
                  </div>
                </div>

                <div className="highlight-item">
                  <FaMobileAlt className="highlight-icon" />
                  <div>
                    <h4>Design Responsivo</h4>
                    <p>Sites adaptados para qualquer dispositivo: celular, tablet e desktop.</p>
                  </div>
                </div>

                <div className="highlight-item">
                  <FaCode className="highlight-icon" />
                  <div>
                    <h4>Código Limpo</h4>
                    <p>Projetos escaláveis e fáceis de manter, prontos para evoluir.</p>
                  </div>
                </div>

                <div className="highlight-item">
                  <FaEye className="highlight-icon" />
                  <div>
                    <h4>Transparência Total</h4>
                    <p>Comunicação clara e sem letras miúdas: você sabe exatamente o que está contratando.</p>
                  </div>
                </div>

                <div className="highlight-item">
                  <FaLock className="highlight-icon" />
                  <div>
                    <h4>Segurança</h4>
                    <p>Proteção de dados e implementação das melhores práticas de segurança.</p>
                  </div>
                </div>

                <div className="highlight-item">
                  <FaGlobe className="highlight-icon" />
                  <div>
                    <h4>Hospedagem Otimizada</h4>
                    <p>Infraestrutura preparada para alto desempenho e disponibilidade.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços Section */}
        <section id="servicos" className="services-section" aria-labelledby="servicos-title">
          <div className="container">
            <div className="section-header">
              <h2 id="servicos-title">Nossos Serviços</h2>
              <p>Soluções digitais personalizadas para suas necessidades</p>
            </div>

            <div className="services-grid">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </div>

            <div className="services-cta">
              <a href="#contato" className="cta-button primary">
                Solicitar orçamento
              </a>
            </div>
          </div>
        </section>

        {/* Diferenciais Section */}
        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2>Por que escolher meus serviços?</h2>
              <p>Diferenciais que fazem a diferença no seu projeto digital</p>
            </div>

            <div className="features-grid">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="portfolio-section" aria-labelledby="portfolio-title">
          <div className="container">
            <div className="section-header">
              <h2 id="portfolio-title">Trabalhos Recentes</h2>
              <p>Confira alguns projetos que desenvolvi para clientes</p>
            </div>

            <div className="portfolio-grid">
              {portfolioItems.map((item, index) => (
                <PortfolioItem key={index} item={item} index={index} />
              ))}
            </div>

            <div className="portfolio-cta">
              <a href="#contato" className="cta-button secondary">
                Quero um projeto similar
              </a>
            </div>
          </div>
        </section>

        {/* Depoimentos Section */}
        <section className="testimonials-section">
          <div className="container">
            <div className="section-header">
              <h2>O que nossos clientes dizem</h2>
              <p>Feedback de quem já experimentou nossos serviços</p>
            </div>

            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="testimonial-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="testimonial-content">
                    <p>"{testimonial.content}"</p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <span>{testimonial.role}</span>
                    </div>
                    <div className="testimonial-rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < testimonial.rating ? 'filled' : ''} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="blog-section">
          <div className="container">
            <div className="section-header">
              <h2>Conteúdo Exclusivo</h2>
              <p>Artigos e dicas para alavancar seu negócio digital</p>
            </div>

            <div className="blog-grid">
              {blogPosts.map((post, index) => (
                <BlogCard key={index} post={post} index={index} />
              ))}
            </div>

            <div className="blog-cta">
              <a href="/blog" className="cta-button secondary">
                Ver todos os artigos
              </a>
            </div>
          </div>
        </section>

        {/* Preços Section */}
        <section id="precos" className="pricing-section" aria-labelledby="precos-title">
          <div className="container">
            <div className="section-header">
              <h2 id="precos-title">Planos e Investimento</h2>
              <p>Soluções para diferentes necessidades e orçamentos</p>
            </div>

            <div className="pricing-grid">
              {pricingPlans.map((plan, index) => (
                <PricingCard key={index} plan={plan} index={index} />
              ))}
            </div>

            <div className="pricing-disclaimer">
              <p><strong>Valores personalizados:</strong> Projetos complexos ou com requisitos específicos podem ter valores diferentes. Entre em contato para um orçamento preciso.</p>
              <p><strong>Pagamento:</strong> Aceitamos PIX (5% off), cartão de crédito (até 12x) e transferência bancária.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section" aria-labelledby="faq-title">
          <div className="container">
            <div className="section-header">
              <h2 id="faq-title">Perguntas Frequentes</h2>
              <p>Tire suas dúvidas sobre desenvolvimento web</p>
            </div>

            <div className="faq-grid">
              {faqs.map((faq, index) => (
                <FAQItem 
                  key={index} 
                  faq={faq} 
                  index={index} 
                  activeIndex={activeFaqIndex} 
                  toggleFaq={toggleFaq} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section id="contato" className="final-cta-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="final-cta-card"
            >
              <div className="final-cta-content">
                <h2>Pronto para transformar sua presença digital?</h2>
                <p>Vamos conversar sobre seu projeto e como posso ajudar seu negócio a crescer online</p>
              </div>
              <div className="final-cta-buttons">
                <a
                  href="https://wa.me/5562984317595?text=Olá%20Emannuel%20Dev!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços."
                  className="cta-button whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Falar no WhatsApp"
                >
                  <FaWhatsapp /> Falar no WhatsApp
                </a>
                <a href="mailto:emannueldevfullstacksolutions@gmail.com" className="cta-button secondary">
                  <FaEnvelope /> Enviar e-mail
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}