import { useState } from 'react';
import { FaWhatsapp, FaCheck, FaRocket, FaShieldAlt, FaCog, FaChartLine, FaMobileAlt, FaServer, FaGlobe, FaCreditCard, FaQuestionCircle, FaRegClock, FaRegCalendarAlt, FaRegHandshake, FaRegLightbulb, FaRegFileAlt, FaRegComments, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import './Pricing.css';

const PricingTabs = ({ activeTab, setActiveTab }) => (
  <div className="pricing-tab-container">
    {['Pagamento Único', 'Parcelado'].map((tab, index) => (
      <button
        key={index}
        className={`pricing-tab ${activeTab === index ? 'pricing-tab-active' : ''}`}
        onClick={() => setActiveTab(index)}
      >
        {tab}
        {activeTab === index && (
          <motion.div 
            className="pricing-tab-indicator" 
            layoutId="tabIndicator"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </button>
    ))}
  </div>
);

const PlanCard = ({ plan, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={fadeIn('up', 'tween', index * 0.2, 1)}
      className={`pricing-plan-card ${plan.recommended ? 'pricing-recommended' : ''}`}
      whileHover={{ y: -10 }}
    >
      {plan.recommended && (
        <motion.div 
          className="pricing-recommended-badge"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ 
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5
          }}
        >
          <FaCheck className="pricing-badge-icon" /> Mais Popular
        </motion.div>
      )}
      
      <div className="pricing-plan-header">
        <div className="pricing-plan-icon-container">
          {plan.icon}
        </div>
        <h3 className="pricing-plan-name">{plan.name}</h3>
        <p className="pricing-ideal-for">{plan.idealFor}</p>
      </div>
      
      <div className="pricing-price-options">
        <div className="pricing-price-option">
          <span className="pricing-option-label">Com Domínio/Hospedagem:</span>
          <span className="pricing-price">R$ {plan.priceWithHosting}</span>
        </div>
        <div className="pricing-price-option">
          <span className="pricing-option-label">Sem Domínio/Hospedagem:</span>
          <span className="pricing-price">R$ {plan.priceWithoutHosting}</span>
        </div>
      </div>
      
      <div 
        className="pricing-features-toggle" 
        onClick={() => setExpanded(!expanded)}
      >
        <span>Recursos incluídos</span>
        {expanded ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.ul
            className="pricing-features"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {plan.features.map((feature, i) => (
              <motion.li 
                key={i}
                className="pricing-feature-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <FaCheck className="pricing-feature-check" /> {feature}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      
      <motion.a 
        href="https://wa.me/seunumerodewhatsapp" 
        className="pricing-cta-button"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaWhatsapp className="pricing-whatsapp-icon" /> Quero este plano
      </motion.a>
    </motion.div>
  );
};

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      variants={fadeIn('up', 'tween', index * 0.1, 1)}
      className={`pricing-faq-item ${isOpen ? 'open' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="pricing-faq-question-container">
        <div className="pricing-faq-icon">{faq.icon}</div>
        <h3 className="pricing-faq-question">{faq.question}</h3>
        <div className="pricing-faq-chevron">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.p
            className="pricing-faq-answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {faq.answer}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProcessStep = ({ step, index }) => (
  <motion.div 
    key={index}
    variants={fadeIn('up', 'tween', index * 0.1, 1)}
    className="pricing-process-step"
    whileHover={{ y: -5 }}
  >
    <div className="pricing-step-number">{step.step}</div>
    <div className="pricing-step-icon">{step.icon}</div>
    <h3 className="pricing-step-title">{step.title}</h3>
    <p className="pricing-step-description">{step.description}</p>
  </motion.div>
);

export default function Pricing() {
  const [activeTab, setActiveTab] = useState(0);

  const plans = [
    {
      name: "Landing Page Pro",
      priceWithHosting: "600",
      priceWithoutHosting: "450",
      features: [
        "Página única otimizada",
        "Design high-conversion",
        "Formulário inteligente",
        "Integração WhatsApp/Email",
        "SEO básico incluído",
        "Entrega em 5 dias úteis"
      ],
      idealFor: "Lançamentos e promoções",
      recommended: false,
      icon: <FaMobileAlt className="pricing-plan-icon" />
    },
    {
      name: "Site Corporativo",
      priceWithHosting: "950",
      priceWithoutHosting: "750",
      features: [
        "Até 7 páginas",
        "Design responsivo premium",
        "Blog integrado",
        "SEO avançado",
        "Galeria de mídia",
        "Estatísticas básicas",
        "Suporte 1 mês"
      ],
      idealFor: "Negócios estabelecidos",
      recommended: true,
      icon: <FaGlobe className="pricing-plan-icon" />
    },
    {
      name: "Sistema Web",
      priceWithHosting: "1.300",
      priceWithoutHosting: "1.100",
      features: [
        "Painel administrativo completo",
        "Até 15 páginas",
        "Banco de dados integrado",
        "Formulários avançados",
        "Relatórios personalizados",
        "Suporte prioritário 3 meses",
        "Treinamento incluso"
      ],
      idealFor: "Operações complexas",
      recommended: false,
      icon: <FaServer className="pricing-plan-icon" />
    }
  ];

  const addons = [
    { 
      category: "Funcionalidades",
      icon: <FaCog className="pricing-addon-icon" />,
      items: [
        { name: "SEO Avançado", price: "+120", icon: <FaChartLine className="pricing-feature-icon" /> },
        { name: "Integração com WhatsApp", price: "+50", icon: <FaWhatsapp className="pricing-feature-icon" /> },
        { name: "E-mail profissional", price: "+60", icon: <FaCheck className="pricing-feature-icon" /> },
        { name: "Versão multilíngue", price: "+200", icon: <FaGlobe className="pricing-feature-icon" /> }
      ]
    },
    {
      category: "Suporte",
      icon: <FaShieldAlt className="pricing-addon-icon" />,
      items: [
        { name: "Suporte estendido (30 dias)", price: "+100", icon: <FaCheck className="pricing-feature-icon" /> },
        { name: "Entrega expressa (até 3 dias)", price: "+100", icon: <FaRocket className="pricing-feature-icon" /> },
        { name: "Manutenção mensal", price: "+80/mês", icon: <FaCog className="pricing-feature-icon" /> }
      ]
    }
  ];

  const featuresComparison = [
    { feature: "Layout personalizado", landingPage: true, professional: true, adminPanel: true },
    { feature: "Formulário de contato", landingPage: false, professional: true, adminPanel: true },
    { feature: "Painel administrativo", landingPage: false, professional: false, adminPanel: true },
    { feature: "Blog integrado", landingPage: false, professional: true, adminPanel: true },
    { feature: "SEO básico", landingPage: false, professional: true, adminPanel: true },
    { feature: "Suporte inicial", landingPage: "7 dias", professional: "1 mês", adminPanel: "3 meses" }
  ];

  const guarantees = [
    { text: "Suporte gratuito pós-entrega", icon: <FaShieldAlt className="pricing-guarantee-icon" /> },
    { text: "Revisões básicas incluídas", icon: <FaCheck className="pricing-guarantee-icon" /> },
    { text: "Código limpo e responsivo", icon: <FaCog className="pricing-guarantee-icon" /> },
    { text: "Transparência no processo", icon: <FaChartLine className="pricing-guarantee-icon" /> },
    { text: "Garantia de satisfação", icon: <FaCheck className="pricing-guarantee-icon" /> }
  ];

  const faqs = [
    {
      question: "Posso parcelar o valor?",
      answer: "Sim, oferecemos opções de parcelamento em até 3x sem juros via PIX ou boleto.",
      icon: <FaCreditCard className="pricing-faq-icon" />
    },
    {
      question: "O domínio fica no meu nome?",
      answer: "Sim, todo domínio registrado é de propriedade do cliente e pode ser transferido a qualquer momento.",
      icon: <FaGlobe className="pricing-faq-icon" />
    },
    {
      question: "Se eu quiser atualizar depois, como funciona?",
      answer: "Oferecemos pacotes de manutenção mensal ou você pode solicitar atualizações avulsas com valores diferenciados.",
      icon: <FaCog className="pricing-faq-icon" />
    },
    {
      question: "O que está incluso no valor?",
      answer: "Todos os planos incluem desenvolvimento, hospedagem inicial (opcional), layout responsivo e suporte pós-entrega conforme plano escolhido.",
      icon: <FaQuestionCircle className="pricing-faq-icon" />
    }
  ];

  const stats = [
    { value: "100%", label: "Clientes Satisfeitos", icon: <FaCheck className="pricing-stat-icon" /> },
    { value: "24h", label: "Suporte Rápido", icon: <FaShieldAlt className="pricing-stat-icon" /> },
    { value: "5-15", label: "Dias para Entrega", icon: <FaRocket className="pricing-stat-icon" /> },
    { value: "3x", label: "Sem Juros", icon: <FaCreditCard className="pricing-stat-icon" /> }
  ];

  const paymentMethods = [
    { name: "PIX", description: "Pagamento à vista com 5% de desconto", icon: <FaCreditCard className="pricing-payment-icon" /> },
    { name: "Boleto", description: "Pagamento em até 3x sem juros", icon: <FaCreditCard className="pricing-payment-icon" /> },
    { name: "Cartão de Crédito", description: "Parcelamento em até 12x (com juros)", icon: <FaCreditCard className="pricing-payment-icon" /> },
    { name: "Transferência", description: "Pagamento à vista via TED/DOC", icon: <FaCreditCard className="pricing-payment-icon" /> }
  ];

  const developmentProcess = [
    { 
      step: "1",
      title: "Briefing",
      description: "Entendemos suas necessidades através de um questionário detalhado e reunião inicial.",
      icon: <FaRegComments className="pricing-process-icon" />
    },
    { 
      step: "2",
      title: "Proposta",
      description: "Criamos um plano personalizado com cronograma e orçamento transparente.",
      icon: <FaRegFileAlt className="pricing-process-icon" />
    },
    { 
      step: "3",
      description: "Transformamos ideias em código com atualizações periódicas sobre o progresso.",
      title: "Desenvolvimento",
      icon: <FaRegLightbulb className="pricing-process-icon" />
    },
    { 
      step: "4",
      title: "Revisão",
      description: "Ajustamos até a perfeição com até 2 rodadas de revisões inclusas.",
      icon: <FaRegHandshake className="pricing-process-icon" />
    },
    { 
      step: "5",
      title: "Entrega",
      description: "Lançamento do projeto com treinamento e documentação técnica.",
      icon: <FaRegCalendarAlt className="pricing-process-icon" />
    }
  ];

  const siteTypes = [
    {
      type: "Landing Page",
      description: "Páginas únicas focadas em conversão, ideais para lançamentos, promoções ou captação de leads. Desenvolvimento rápido com foco em alta performance.",
      process: "5-7 dias úteis",
      icon: <FaMobileAlt className="pricing-site-type-icon" />
    },
    {
      type: "Site Institucional",
      description: "Sites com múltiplas páginas para apresentar sua empresa, serviços e equipe. Ideal para estabelecer credibilidade online.",
      process: "10-15 dias úteis",
      icon: <FaGlobe className="pricing-site-type-icon" />
    },
    {
      type: "Sistema Web",
      description: "Aplicações completas com painel administrativo, banco de dados e funcionalidades complexas. Soluções sob medida para operações específicas.",
      process: "15-30 dias úteis",
      icon: <FaServer className="pricing-site-type-icon" />
    }
  ];

  return (
    <motion.div 
      className="pricing-page"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      {/* Seção Hero */}
      <section className="pricing-hero-section">
        <div className="pricing-hero-bg" />
        <div className="pricing-container">
          <motion.div
            variants={fadeIn('right', 'tween', 0.2, 1)}
            className="pricing-hero-content"
          >
            <motion.h1 
              className="pricing-title"
              variants={fadeIn('up', 'tween', 0.3, 1)}
            >
              Planos <span>Sob Medida</span>
            </motion.h1>
            <motion.p 
              className="pricing-lead"
              variants={fadeIn('up', 'tween', 0.4, 1)}
            >
              Escolha a melhor opção para seu projeto com qualidade premium e suporte dedicado.
            </motion.p>
            
            <PricingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <motion.div
              variants={fadeIn('up', 'tween', 0.5, 1)}
              className="pricing-guarantees"
            >
              {guarantees.map((guarantee, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn('up', 'tween', index * 0.1, 1)}
                  className="pricing-guarantee-badge"
                  whileHover={{ y: -3 }}
                >
                  <span className="pricing-guarantee-icon">{guarantee.icon}</span>
                  <span>{guarantee.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Estatísticas */}
      <section className="pricing-stats-section">
        <div className="pricing-container">
          <motion.div 
            className="pricing-stats-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={fadeIn('up', 'tween', index * 0.1, 1)}
                className="pricing-stat-card"
              >
                <div className="pricing-stat-icon">{stat.icon}</div>
                <div className="pricing-stat-value">{stat.value}</div>
                <div className="pricing-stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seção de Planos */}
      <section className="pricing-plans-section">
        <div className="pricing-container">
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            <h2 className="pricing-section-title">Escolha o plano ideal para seu projeto</h2>
            <p className="pricing-section-subtitle">Todos incluem domínio e hospedagem opcionais</p>
          </motion.div>
          
          <motion.div 
            className="pricing-plans-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {plans.map((plan, index) => (
              <PlanCard key={index} plan={plan} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seção de Processo de Trabalho */}
      <section className="pricing-process-section">
        <div className="pricing-container">
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            <h2 className="pricing-section-title">Nosso Processo de Trabalho</h2>
            <p className="pricing-section-subtitle">Transparência e qualidade em cada etapa</p>
          </motion.div>
          
          <motion.div 
            className="pricing-process-steps"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {developmentProcess.map((step, index) => (
              <ProcessStep key={index} step={step} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seção de Tipos de Sites */}
      <section className="pricing-site-types-section">
        <div className="pricing-container">
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            <h2 className="pricing-section-title">Como Desenvolvemos Cada Tipo de Site</h2>
            <p className="pricing-section-subtitle">Entenda nosso fluxo de trabalho para diferentes projetos</p>
          </motion.div>
          
          <motion.div 
            className="pricing-site-types-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {siteTypes.map((siteType, index) => (
              <motion.div 
                key={index}
                variants={fadeIn('up', 'tween', index * 0.2, 1)}
                className="pricing-site-type-card"
              >
                <div className="pricing-site-type-icon">{siteType.icon}</div>
                <h3 className="pricing-site-type-title">{siteType.type}</h3>
                <p className="pricing-site-type-description">{siteType.description}</p>
                <div className="pricing-process-time">
                  <FaRegClock className="pricing-clock-icon" /> Processo: {siteType.process}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seção de Comparativo */}
      <section className="pricing-comparison-section">
        <div className="pricing-container">
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            <h2 className="pricing-section-title">Compare os recursos</h2>
            <p className="pricing-section-subtitle">Veja a diferença entre cada tipo de projeto</p>
          </motion.div>
          
          <motion.div 
            className="pricing-comparison-table-container"
            variants={fadeIn('up', 'tween', 0.4, 1)}
          >
            <div className="pricing-comparison-table">
              <table className="pricing-feature-table">
                <thead>
                  <tr>
                    <th className="pricing-table-header">Recurso</th>
                    <th className="pricing-table-header">Landing Page</th>
                    <th className="pricing-table-header">Site Profissional</th>
                    <th className="pricing-table-header">Com Painel</th>
                  </tr>
                </thead>
                <tbody>
                  {featuresComparison.map((item, index) => (
                    <motion.tr 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="pricing-table-row"
                    >
                      <td className="pricing-table-feature">{item.feature}</td>
                      <td className="pricing-table-value">
                        {item.landingPage === true ? <FaCheck className="pricing-check-icon" /> : item.landingPage === false ? <span className="pricing-x-icon">✕</span> : item.landingPage}
                      </td>
                      <td className="pricing-table-value">
                        {item.professional === true ? <FaCheck className="pricing-check-icon" /> : item.professional === false ? <span className="pricing-x-icon">✕</span> : item.professional}
                      </td>
                      <td className="pricing-table-value">
                        {item.adminPanel === true ? <FaCheck className="pricing-check-icon" /> : item.adminPanel === false ? <span className="pricing-x-icon">✕</span> : item.adminPanel}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Extras */}
      <section className="pricing-addons-section">
        <div className="pricing-container">
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            <h2 className="pricing-section-title">Personalize seu projeto</h2>
            <p className="pricing-section-subtitle">Adicione recursos extras para potencializar seu site</p>
          </motion.div>
          
          <motion.div 
            className="pricing-addons-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {addons.map((category, catIndex) => (
              <motion.div 
                key={catIndex}
                variants={fadeIn('up', 'tween', catIndex * 0.2, 1)}
                className="pricing-addon-category"
                whileHover={{ y: -5 }}
              >
                <div className="pricing-category-header">
                  <div className="pricing-category-icon">{category.icon}</div>
                  <h3 className="pricing-category-title">{category.category}</h3>
                </div>
                <ul className="pricing-addon-items">
                  {category.items.map((item, itemIndex) => (
                    <motion.li 
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="pricing-addon-item"
                    >
                      <div className="pricing-addon-icon">{item.icon}</div>
                      <span className="pricing-addon-name">{item.name}</span>
                      <span className="pricing-addon-price">R$ {item.price}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seção de Pagamentos */}
      <section className="pricing-payment-methods-section">
        <div className="pricing-container">
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            <h2 className="pricing-section-title">Formas de Pagamento</h2>
            <p className="pricing-section-subtitle">Opções flexíveis para seu orçamento</p>
          </motion.div>
          
          <motion.div 
            className="pricing-payment-methods-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {paymentMethods.map((method, index) => (
              <motion.div 
                key={index}
                variants={fadeIn('up', 'tween', index * 0.1, 1)}
                className="pricing-payment-method"
              >
                <div className="pricing-method-icon">{method.icon}</div>
                <h3 className="pricing-method-name">{method.name}</h3>
                <p className="pricing-method-description">{method.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seção FAQ */}
      <section className="pricing-faq-section">
        <div className="pricing-container">
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            <h2 className="pricing-section-title">Dúvidas frequentes</h2>
            <p className="pricing-section-subtitle">Encontre respostas para as perguntas mais comuns</p>
          </motion.div>
          
          <motion.div 
            className="pricing-faq-list"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="pricing-final-cta">
        <div className="pricing-cta-pattern" />
        <div className="pricing-container">
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
            className="pricing-cta-content"
          >
            <motion.h2 
              className="pricing-cta-title"
              whileInView={{ y: [10, 0], opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
            >
              Pronto para transformar sua ideia em realidade?
            </motion.h2>
            <motion.p 
              className="pricing-cta-text"
              whileInView={{ y: [10, 0], opacity: [0, 1] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Entre em contato agora mesmo para um orçamento personalizado!
            </motion.p>
            <motion.div
              whileInView={{ y: [10, 0], opacity: [0, 1] }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.a 
                href="https://wa.me/seunumerodewhatsapp" 
                className="pricing-cta-button pricing-cta-large"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp className="pricing-whatsapp-icon" /> Falar com Emannuel
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}