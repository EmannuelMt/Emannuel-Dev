import { useState } from 'react';
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
  FaEye
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Home.css';
import profileImage from './AIDrawing_250911_d80e2d99-024a-4ae2-bd8e-9c4422800165_0_MiriCanvas.png';
import CantinhoDoUniversoImage from './Captura de tela 2025-08-13 141109.png';
import goldenGrillImage from './Captura de tela 2025-08-04 235057.png';
import ecosRealidadeImage from './Captura de tela 2025-08-04 234136.png'; // Substitua pelo arquivo correto

export default function Home() {
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
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
    }
  ];

  const portfolioItems = [
    {
      title: "Golden Grill",
      type: "Sistema de gerenciamento para restaurantes com cardápio digital, pedidos online e dashboard administrativo.",
      image: goldenGrillImage
    },
    {
      title: "Cantinho Do Universo",
      type: "Site Pessoal.",
      image: CantinhoDoUniversoImage
    },
    {
      title: "Ecos Da Realidade",
      type: "Site para mestres e jogadores de RPG",
      image: ecosRealidadeImage
    }
  ];

  const pricingPlans = [
    {
      name: "Site Básico",
      price: "R$ 950",
      features: ["Até 5 páginas", "Design responsivo", "Formulário de contato", "Otimização básica SEO"],
      popular: false
    },
    {
      name: "Site Profissional",
      price: "R$ 1.500",
      features: ["Até 15 páginas", "Painel administrativo", "Blog integrado", "SEO avançado", "Suporte 30 dias"],
      popular: true
    },
    {
      name: "Landing Page",
      price: "R$ 500",
      features: ["1 página otimizada", "Formulário de leads", "Design high-conversion", "Integração com redes sociais"],
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Qual o prazo médio de entrega?",
      answer: "Sites básicos em até 10-15 dias úteis, projetos complexos em até 15 dias. Landing pages em 5 dias úteis."
    },
    {
      question: "Vocês oferecem suporte pós-entrega?",
      answer: "Sim, todos os projetos incluem 30 dias de suporte gratuito. Após este período, oferecemos planos de manutenção mensal."
    },
    {
      question: "Posso fazer alterações no site depois?",
      answer: "Oferecemos painel administrativo para edições básicas em todos os nossos pacotes profissionais."
    },
    {
      question: "Qual a forma de pagamento?",
      answer: "Aceitamos parcelamento em até 12x no cartão, transferência bancária ou PIX (com desconto à vista)."
    },


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
              Soluções Digitais <span>que Impulsionam</span> seu Negócio
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
              <a href="/contato" className="cta-button primary">
                Solicite um orçamento
              </a>
              <a href="/servicos" className="cta-button secondary">
                Conheça nossos serviços <FaChevronDown />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hero-image"
          >
            <img src={profileImage} alt="Desenvolvimento Web" loading="lazy" />
          </motion.div>
        </div>

        <div className="scroll-indicator">
          <FaChevronDown className="bounce" />
        </div>
      </section>

      {/* Mini Bio */}
      <section className="bio-section">
        <div className="container">
          <div className="bio-card">
            <div className="bio-content">
              <h2>Sobre a Emannuel Dev</h2>
              <p>
                Na <strong>Emannuel Dev</strong>, transformamos ideias em presença digital de verdade. Criamos <strong>sites, bots e landing pages</strong> personalizadas, perfeitas para pequenos negócios, autônomos e prestadores de serviço que querem se destacar online sem complicação e sem gastar além da conta.
              </p>
              <p>
                Com uma abordagem prática, organizada e transparente, entregamos projetos com <strong>design funcional, comunicação clara e suporte de verdade</strong>. Aqui você encontra preços justos, atendimento humano e entrega rápida — sempre com a sua identidade em cada detalhe.
              </p>
              <a href="/sobre" className="bio-link">
                Conheça minha jornada <FaArrowRight />
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
            </div>
          </div>
        </div>
      </section>


      {/* Serviços */}
      <section id="servicos" className="services-section">
        <div className="container">
          <div className="section-header">
            <h2>Nossos Serviços</h2>
            <p>Soluções digitais personalizadas para suas necessidades</p>
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
                <a href={`/servicos#${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="service-link">
                  Saiba mais <FaArrowRight />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Por que escolher meus serviços?</h2>
            <p>Diferenciais que fazem a diferença no seu projeto digital</p>
          </div>

          <div className="features-grid">
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="feature-number">01</div>
              <h3>Design Centrado no Usuário</h3>
              <p>Interfaces intuitivas que proporcionam a melhor experiência para seus clientes</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="feature-number">02</div>
              <h3>Performance Otimizada</h3>
              <p>Sites rápidos que melhoram seu posicionamento no Google</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="feature-number">03</div>
              <h3>Tecnologia Moderna</h3>
              <p>Utilizo as ferramentas mais atuais do mercado para desenvolvimento</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfólio */}
      <section className="portfolio-section">
        <div className="container">
          <div className="section-header">
            <h2>Trabalhos Recentes</h2>
            <p>Confira alguns projetos que desenvolvi para clientes</p>
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
                  <div className="portfolio-overlay">
                    <h3>{item.title}</h3>
                    <span>{item.type}</span>
                    <a href={`/portfolio/${item.title.toLowerCase().replace(/\s+/g, '-')}`} className="portfolio-link">
                      Ver detalhes
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="portfolio-cta">
            <a href="/portfolio" className="cta-button secondary">
              Explorar portfólio completo
            </a>
          </div>
        </div>
      </section>

      {/* Preços */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-header">
            <h2>Planos e Investimento</h2>
            <p>Soluções para diferentes necessidades e orçamentos</p>
          </div>

          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {plan.popular && <div className="popular-badge">Mais escolhido</div>}
                <h3>{plan.name}</h3>
                <div className="pricing-value">
                  {plan.price}
                </div>
                <ul className="pricing-features">
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <a href="/contato" className="pricing-button">
                  Contratar agora
                </a>
              </motion.div>
            ))}
          </div>

          <div className="pricing-disclaimer">
            <p>Valores podem variar conforme complexidade do projeto. Entre em contato para um orçamento personalizado.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Perguntas Frequentes</h2>
            <p>Tire suas dúvidas sobre desenvolvimento web</p>
          </div>

          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeFaqIndex === index ? 'active' : ''}`}
              >
                <div
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <h3>{faq.question}</h3>
                  {activeFaqIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
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
              >
                <FaWhatsapp /> Falar no WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}