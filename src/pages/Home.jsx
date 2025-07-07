import { FaLaptopCode, FaRobot, FaMobileAlt, FaArrowRight, FaWhatsapp, FaRegClock, FaRegMoneyBillAlt, FaRegUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Home.css';

export default function Home() {
  const services = [
    {
      icon: <FaLaptopCode className="service-icon" />,
      title: "Sites Profissionais",
      description: "Modernos, rápidos e responsivos",
      highlight: "Ideal para autônomos e pequenos negócios"
    },
    {
      icon: <FaMobileAlt className="service-icon" />,
      title: "Landing Pages",
      description: "Foco em conversão e captação de leads",
      highlight: "Aumente suas vendas online"
    },
    {
      icon: <FaRobot className="service-icon" />,
      title: "Bots para Discord",
      description: "Automatizações para atendimento ou comandos",
      highlight: "Melhore sua comunidade"
    }
  ];

  const portfolioItems = [
    {
      title: "Loja Virtual - Moda Fitness",
      type: "Site Completo",
      image: "/portfolio/ecommerce-fitness.jpg"
    },
    {
      title: "Bot de Música - Servidor Gamer",
      type: "Automação Discord",
      image: "/portfolio/discord-bot.jpg"
    },
    {
      title: "Landing Page - Consultoria",
      type: "Página de Conversão",
      image: "/portfolio/landing-consultoria.jpg"
    }
  ];

  const pricingPlans = [
    {
      name: "Site Simples",
      price: "400",
      features: ["1-3 páginas", "Design responsivo", "Formulário de contato"]
    },
    {
      name: "Site Completo",
      price: "1.000",
      features: ["Até 10 páginas", "Painel administrativo", "Domínio + Hospedagem", "SEO básico"]
    }
  ];

  const faqs = [
    {
      question: "Você aceita pagamento parcelado?",
      answer: "Sim, aceitamos pagamento em até 12x no cartão ou parcelado no Pix."
    },
    {
      question: "Posso atualizar o site sozinho depois?",
      answer: "Oferecemos painel administrativo para edições básicas em todos os nossos pacotes completos."
    },
    {
      question: "Quanto tempo demora para entregar?",
      answer: "Sites simples em 7 dias úteis, projetos complexos em até 15 dias."
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
              Criação de Sites e Bots com <span>Entrega Rápida e Preço Justo</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hero-subtitle"
            >
              Soluções personalizadas para pequenos negócios, autônomos e criadores
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hero-cta"
            >
              <a href="/contato" className="cta-button primary">
                Solicite um orçamento
              </a>
              <a href="#simulador" className="cta-button secondary">
                Simule seu preço
              </a>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hero-image"
          >
            <img src="/images/hero-dev.png" alt="Desenvolvimento Web" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* Mini Bio */}
      <section className="bio-section">
        <div className="container">
          <div className="bio-card">
            <div className="bio-content">
              <h2>Sobre a Emannuel Dev</h2>
              <p>
                Sou desenvolvedor web com foco em sites funcionais, landing pages estratégicas e automações inteligentes. 
                Entrego rápido, com suporte real e preço acessível.
              </p>
              <a href="/sobre" className="bio-link">
                Conheça mais sobre meu trabalho <FaArrowRight />
              </a>
            </div>
            <div className="bio-highlights">
              <div className="highlight-item">
                <FaRegClock className="highlight-icon" />
                <span>Entrega Rápida</span>
              </div>
              <div className="highlight-item">
                <FaRegMoneyBillAlt className="highlight-icon" />
                <span>Preço Justo</span>
              </div>
              <div className="highlight-item">
                <FaRegUserCircle className="highlight-icon" />
                <span>Suporte Personalizado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2>Serviços Oferecidos</h2>
            <p>Soluções digitais sob medida para suas necessidades</p>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulador */}
      <section id="simulador" className="simulator-section">
        <div className="container">
          <div className="simulator-card">
            <div className="simulator-content">
              <h2>Simule o valor do seu projeto</h2>
              <p>Descubra em poucos cliques o investimento necessário para seu site ou bot</p>
              
              <form className="simulator-form">
                <div className="form-group">
                  <label>Tipo de Projeto</label>
                  <select>
                    <option value="">Selecione...</option>
                    <option value="site">Site Institucional</option>
                    <option value="landing">Landing Page</option>
                    <option value="bot">Bot para Discord</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Recursos Adicionais</label>
                  <div className="checkbox-group">
                    <label>
                      <input type="checkbox" /> Painel Administrativo
                    </label>
                    <label>
                      <input type="checkbox" /> Formulário de Contato
                    </label>
                    <label>
                      <input type="checkbox" /> Integração com WhatsApp
                    </label>
                  </div>
                </div>
                
                <button type="button" className="simulator-button">
                  Calcular Valor
                </button>
              </form>
            </div>
            <div className="simulator-result">
              <div className="result-placeholder">
                <p>Preencha os campos ao lado para simular seu orçamento</p>
                <div className="result-value hidden">
                  <span>Valor estimado:</span>
                  <strong>R$ 0,00</strong>
                  <a href="https://wa.me/SEUNUMERO" className="whatsapp-button">
                    <FaWhatsapp /> Falar no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfólio */}
      <section className="portfolio-section">
        <div className="container">
          <div className="section-header">
            <h2>Destaques do Portfólio</h2>
            <p>Confira alguns dos projetos recentes</p>
          </div>
          
          <div className="portfolio-grid">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                className="portfolio-item"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="portfolio-image">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="portfolio-info">
                  <h3>{item.title}</h3>
                  <span>{item.type}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="portfolio-cta">
            <a href="/portfolio" className="cta-button secondary">
              Ver portfólio completo
            </a>
          </div>
        </div>
      </section>

      {/* Preços */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-header">
            <h2>Planos e Preços</h2>
            <p>Transparência e soluções para todos os orçamentos</p>
          </div>
          
          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className="pricing-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3>{plan.name}</h3>
                <div className="pricing-value">
                  R$ <span>{plan.price}</span>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <a href="/contato" className="pricing-button">
                  Contratar
                </a>
              </motion.div>
            ))}
          </div>
          
          <div className="pricing-cta">
            <a href="/precos" className="pricing-link">
              Veja todos os pacotes e opcionais
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Perguntas Frequentes</h2>
            <p>Tire suas dúvidas sobre nossos serviços</p>
          </div>
          
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="final-cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="final-cta-content"
          >
            <h2>Pronto para tirar sua ideia do papel?</h2>
            <p>Clique no botão abaixo e vamos conversar</p>
            <a 
              href="https://wa.me/SEUNUMERO" 
              className="whatsapp-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp /> Falar agora no WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}