import React, { useState } from 'react';
import { 
  FaGlobe, FaMobileAlt, FaServer, FaShoppingCart, FaRobot, 
  FaTools, FaChartLine, FaEnvelope, FaLink, FaPalette, 
  FaSearchDollar, FaCalendarAlt, FaCreditCard, FaCheck, 
  FaWhatsapp, FaChevronDown, FaChevronUp, FaRegClock,
  FaFileAlt, FaBoxOpen, FaTachometerAlt, FaPlug, FaHeadset,
  FaShieldAlt, FaCheckCircle, FaChevronRight
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Pricing.css'; 

const ServiceCard = ({ 
  icon, 
  title, 
  description, 
  features, 
  price, 
  deliveryTime,
  isPopular,
  animationDelay 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={`service-card ${isPopular ? 'popular' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay * 0.1, duration: 0.5 }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      }}
    >
      {isPopular && (
        <div className="popular-badge">
          <FaCheck /> Mais Popular
        </div>
      )}
      
      <div className="card-header">
        <div className="card-icon">
          {icon}
        </div>
        <h3>{title}</h3>
      </div>

      <p className="card-description">{description}</p>

      <div className="card-meta">
        <div className="meta-item">
          <FaRegClock className="meta-icon" />
          <span>{deliveryTime}</span>
        </div>
        <div className="meta-item price">
          <span>{price}</span>
        </div>
      </div>

      <button 
        className="expand-button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span>Recursos incluídos</span>
        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.ul
            className="features-list"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.2 }}
              >
                <FaCheck className="feature-icon" />
                {feature}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/5562984317595?text=Olá%20Emannuel%20Dev!%20Gostaria%20de%20adquirir%20o%20plano%20{Landing Page Express}."
        className="cta-button"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaWhatsapp /> Quero este plano
      </motion.a>
    </motion.div>
  );
};

const PricingSection = () => {
  const services = [
    {
      category: '🌐 Sites e Landing Pages',
      items: [
        {
          icon: <FaMobileAlt size={24} />,
          title: 'Landing Page Express',
          description: 'Página única de alta conversão para promoções e lançamentos',
          features: [
            'Design responsivo',
            'Formulário de contato',
            'Integração com WhatsApp',
            'Otimização básica SEO',
            'Entrega em 5 dias úteis'
          ],
          price: 'R$ 400,00',
          deliveryTime: '5-10 dias',
          isPopular: false
        },
        {
          icon: <FaGlobe size={24} />,
          title: 'Site Institucional',
          description: 'Presença digital profissional para seu negócio',
          features: [
            'Até 5 páginas',
            'Galeria de imagens',
            'Blog integrado',
            'SEO básico',
            'Suporte por 1 mês'
          ],
          price: 'R$ 950',
          deliveryTime: '10-15dias',
          isPopular: true
        },
        {
          icon: <FaPalette size={24} />,
          title: 'Portfólio Profissional',
          description: 'Mostre seu trabalho de forma elegante e moderna',
          features: [
            'Design personalizado',
            'Galeria de projetos',
            'Seção "Sobre mim"',
            'Contato integrado',
            'Otimizado para mobile'
          ],
          price: ' R$ 950,00',
          deliveryTime: '5-10 dias',
          isPopular: false
        }
      ]
    },
    {
      category: '🛒 E-commerce',
      items: [
        {
          icon: <FaShoppingCart size={24} />,
          title: 'Loja Básica',
          description: 'Comece a vender online com esta solução simples',
          features: [
            'Até 10 produtos',
            'Carrinho de compras',
            'Checkout básico',
            'Integração com PagSeguro',
            'Painel simples'
          ],
          price: ' R$ 1.500,00',
          deliveryTime: '30 dias',
          isPopular: false
        },
        {
          icon: <FaChartLine size={24} />,
          title: 'Loja Completa',
          description: 'Tudo que você precisa para vender online com profissionalismo',
          features: [
            'Produtos ilimitados',
            'Cupons de desconto',
            'Relatórios de vendas',
            'Frete calculado',
            'SEO otimizado'
          ],
          price: ' R$ 3.000,00',
          deliveryTime: '3 meses',
          isPopular: true
        }
      ]
    },
    {
      category: '🤖 Automações',
      items: [
        {
          icon: <FaRobot size={24} />,
          title: 'Chatbot WhatsApp',
          description: 'Automatize atendimento e vendas no WhatsApp',
          features: [
            'Respostas automáticas',
            'Menu interativo',
            'Integração com planilhas',
            'Segmentação de clientes',
            'Relatórios mensais'
          ],
          price: 'R$ 700',
          deliveryTime: '5-7 dias',
          isPopular: true
        },
        {
          icon: <FaLink size={24} />,
          title: 'Linktree Premium',
          description: 'Página de links profissional com seu domínio',
          features: [
            'Design personalizado',
            'Análise de cliques',
            'SEO otimizado',
            'Integração com redes',
            'Atualizações fáceis'
          ],
          price: 'R$ 350',
          deliveryTime: '3-5 dias',
          isPopular: false
        }
      ]
    }
  ];

  const additionalServices = {
    basic: [
      { name: "Página extra (em qualquer site)", price: "R$ 120", icon: <FaFileAlt /> },
      { name: "SEO básico", price: "R$ 180", icon: <FaSearchDollar /> },
      { name: "Cadastro de produtos extra", price: "R$ 12/unid", icon: <FaBoxOpen /> },
      { name: "Otimização de velocidade", price: "R$ 150", icon: <FaTachometerAlt /> },
      { name: "Integração com ferramentas externas", price: "R$ 200+", icon: <FaPlug /> },
      { name: "Suporte mensal", price: "R$ 160/mês", icon: <FaHeadset /> }
    ],
    premium: [
      {
        title: "Gestão de Sites Mensal",
        description: "Atualizações, backups e suporte técnico regular",
        price: "R$ 150-300/mês",
        icon: <FaShieldAlt />
      },
      {
        title: "Linktree Personalizado",
        description: "Página de links profissional com design exclusivo",
        price: "R$ 149+",
        icon: <FaLink />
      },
      {
        title: "E-mail Profissional",
        description: "Configuração com seu domínio (Google Workspace/Zoho)",
        price: "R$ 120-200",
        icon: <FaEnvelope />
      },
      {
        title: "Painel Administrativo",
        description: "Sistema personalizado para gestão do seu negócio",
        price: "R$ 900-1.500",
        icon: <FaChartLine />
      }
    ],
    packages: [
      {
        name: "Site + Identidade Visual",
        items: ["Site institucional", "Logo profissional", "Manual de marca"],
        price: "R$ 2.200,00"
      },
      {
        name: "Combo Completo",
        items: ["Site + Bot WhatsApp", "Linktree Premium", "E-mail profissional"],
        price: "R$ 3.800,00"
      },
      {
        name: "Pacote Vendas Online",
        items: ["Landing Page", "Checkout personalizado", "Integração com Pix"],
        price: "R$ 4.500,00"
      }
    ]
  };

  return (
    <section className="pricing-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Planos e Serviços Digitais</h2>
        <p>Soluções completas para impulsionar seu negócio online</p>
      </motion.div>

      <div className="services-container">
        {services.map((serviceGroup, groupIndex) => (
          <div key={groupIndex} className="service-group">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              viewport={{ once: true }}
            >
              {serviceGroup.category}
            </motion.h3>
            
            <div className="cards-grid">
              {serviceGroup.items.map((service, index) => (
                <ServiceCard
                  key={index}
                  {...service}
                  animationDelay={groupIndex + index}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Seção de Serviços Adicionais */}
      <div className="extras-section">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="extras-title"
        >
          🛠️ Serviços Adicionais
        </motion.h3>
        
        <div className="extras-grid">
          {/* Serviços Básicos */}
          <div className="extras-group">
            <h4>Melhorias e Ajustes</h4>
            <ul className="extras-list">
              {additionalServices.basic.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="extra-icon">{item.icon}</div>
                  <span className="extra-name">{item.name}</span>
                  <span className="extra-price">{item.price}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Serviços Premium */}
          <div className="extras-group">
            <h4>Serviços Premium</h4>
            <div className="premium-extras">
              {additionalServices.premium.map((item, index) => (
                <motion.div 
                  key={index}
                  className="premium-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="premium-icon">{item.icon}</div>
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                  <div className="premium-price">{item.price}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Pacotes Combinados */}
        <div className="packages-section">
          <h4>💡 Pacotes Combinados</h4>
          <div className="packages-grid">
            {additionalServices.packages.map((pkg, index) => (
              <motion.div
                key={index}
                className="package-card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h5>{pkg.name}</h5>
                <ul>
                  {pkg.items.map((item, i) => (
                    <li key={i}>
                      <FaCheckCircle /> {item}
                    </li>
                  ))}
                </ul>
                <div className="package-price">{pkg.price}</div>
                <button className="package-cta">
                  <FaWhatsapp /> Saber mais
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="section-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      >
        <p>Precisa de algo personalizado ou tem dúvidas?</p>
        <motion.a
          href="https://wa.me/5562984317595?text=Olá%20Emannuel%20Dev!%20Gostaria%20de%20um%20serviço%20personalizado%20os%20."
          className="whatsapp-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaWhatsapp /> Fale comigo no WhatsApp
        </motion.a>
      </motion.div>
    </section>
  );
};

export default PricingSection;