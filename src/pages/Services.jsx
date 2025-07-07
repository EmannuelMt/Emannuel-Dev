import { FaDiscord, FaLaptopCode, FaMobileAlt, FaServer, FaWhatsapp } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import './Services.css'; // Import your CSS styles

export default function Services() {
  const services = [
    {
      title: "Bots Automatizados (Discord)",
      description: "Crio bots personalizados para seu servidor Discord com as funcionalidades que você precisa. Desde bots simples de moderação até sistemas complexos de rankeamento e economia virtual.",
      price: "A partir de R$ 300,00",
      icon: <FaDiscord className="service-icon" />,
      process: [
        "1. Briefing detalhado para entender suas necessidades",
        "2. Definição de funcionalidades e comandos",
        "3. Desenvolvimento do bot com Node.js e Discord.js",
        "4. Testes em ambiente controlado",
        "5. Implementação no seu servidor",
        "6. Documentação e treinamento"
      ]
    },
    {
      title: "Sites Institucionais / Portfólios",
      description: "Desenvolvo sites responsivos e modernos para apresentar seu negócio ou trabalho. Design clean, navegação intuitiva e otimizado para dispositivos móveis.",
      price: "A partir de R$ 800,00",
      icon: <FaLaptopCode className="service-icon" />,
      process: [
        "1. Análise de requisitos e objetivos",
        "2. Criação de wireframes e aprovação",
        "3. Desenvolvimento com React/Next.js",
        "4. Design responsivo e otimização",
        "5. Integração com CMS (opcional)",
        "6. Lançamento e configuração de hospedagem"
      ]
    },
    {
      title: "Landing Pages Estratégicas",
      description: "Páginas focadas em conversão com call-to-action claro, formulários otimizados e integração direta com WhatsApp para captação de leads.",
      price: "A partir de R$ 600,00",
      icon: <FaMobileAlt className="service-icon" />,
      process: [
        "1. Definição da proposta de valor",
        "2. Criação de fluxo de conversão",
        "3. Design high-conversion",
        "4. Desenvolvimento otimizado para SEO",
        "5. Integração com ferramentas de analytics",
        "6. Testes A/B (opcional)"
      ]
    },
    {
      title: "Painel Administrativo",
      description: "Sistema para você gerenciar o conteúdo do seu site sem precisar de conhecimento técnico. Atualize textos, imagens e seções facilmente.",
      price: "A partir de R$ 400,00",
      icon: <FaServer className="service-icon" />,
      process: [
        "1. Mapeamento de conteúdo editável",
        "2. Desenvolvimento do painel com autenticação",
        "3. Criação de interface intuitiva",
        "4. Integração com banco de dados",
        "5. Testes de usabilidade",
        "6. Treinamento para uso"
      ]
    }
  ];

  return (
    <motion.div 
      className="services-page"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      {/* Hero Section */}
      <section className="intro-section">
        <div className="container">
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
            className="intro-content"
          >
            <h1 className="section-title">Nossos Serviços</h1>
            <p className="section-subtitle">
              Soluções digitais personalizadas para atender suas necessidades específicas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="services-section">
        <div className="container">
          <motion.div 
            className="services-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 'tween', index * 0.1, 1)}
                className="service-card"
                whileHover={{ y: -10 }}
              >
                <div className="service-icon-container">
                  {service.icon}
                </div>
                <h2 className="service-title">{service.title}</h2>
                <p className="service-description">{service.description}</p>
                <div className="service-price">{service.price}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            <h2 className="section-title">Como Funciona Nosso Processo</h2>
            <p className="section-subtitle">Etapas detalhadas para cada tipo de projeto</p>
          </motion.div>

          <div className="process-tabs">
            {services.map((service, index) => (
              <div key={index} className="process-tab-content">
                <h3 className="process-service-title">
                  <FiExternalLink className="tab-icon" />
                  {service.title}
                </h3>
                <ul className="process-steps">
                  {service.process.map((step, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="process-step"
                    >
                      {step}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
            className="cta-content"
          >
            <h2 className="cta-title">Não encontrou o que precisa?</h2>
            <p className="cta-text">Entre em contato para um orçamento personalizado!</p>
            <motion.a
              href="/contato"
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp className="button-icon" />
              Solicitar Orçamento
            </motion.a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}