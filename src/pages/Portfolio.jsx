import { FaDiscord, FaShoppingCart, FaChartLine, FaBalanceScale, FaRegClock, FaRegSmile } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import './Portfolio.css'; // Import your CSS styles
export default function Portfolio() {
  const projects = [
    {
      name: "Loja Virtual - Moda Esportiva",
      description: "E-commerce completo com catálogo de produtos, carrinho de compras e integração com gateways de pagamento. Desenvolvido com Next.js e integração com API de fretes.",
      image: "/placeholder-project1.jpg",
      icon: <FaShoppingCart className="project-icon" />,
      tags: ["E-commerce", "Next.js", "Pagamentos"],
      link: "#"
    },
    {
      name: "Bot de Música - Discord",
      description: "Bot para reprodução de música em servidores Discord com fila inteligente, controles intuitivos e integração com Spotify/YouTube. Suporta até 100 servidores simultâneos.",
      image: "/placeholder-project2.jpg",
      icon: <FaDiscord className="project-icon" />,
      tags: ["Node.js", "Discord.js", "Música"],
      link: "#"
    },
    {
      name: "Landing Page - Consultoria",
      description: "Página de alta conversão para captação de leads com formulário otimizado, análise de dados em tempo real e integração direta com CRM. Taxa de conversão de 35%.",
      image: "/placeholder-project3.jpg",
      icon: <FaChartLine className="project-icon" />,
      tags: ["Conversão", "SEO", "Analytics"],
      link: "#"
    },
    {
      name: "Site Institucional - Advogados",
      description: "Plataforma profissional com blog jurídico integrado, área de clientes e agendamento online. Design clean e navegação intuitiva para melhor experiência do usuário.",
      image: "/placeholder-project4.jpg",
      icon: <FaBalanceScale className="project-icon" />,
      tags: ["WordPress", "Blog", "Agendamento"],
      link: "#"
    }
  ];

  const stats = [
    { value: "24+", label: "Projetos concluídos", icon: <FaRegSmile /> },
    { value: "100%", label: "Clientes satisfeitos", icon: <FaRegSmile /> },
    { value: "15k+", label: "Usuários impactados", icon: <FaRegSmile /> },
    { value: "40%", label: "Crescimento médio", icon: <FaChartLine /> }
  ];

  return (
    <motion.div 
      className="portfolio-page"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="container">
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
            className="hero-content"
          >
            <h1 className="hero-title">Portfólio</h1>
            <p className="hero-subtitle">Conheça alguns dos projetos que desenvolvi para clientes reais</p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-section">
        <div className="container">
          <motion.div 
            className="projects-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 'tween', index * 0.1, 1)}
                className="project-card"
                whileHover={{ y: -10 }}
              >
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="project-image"
                    loading="lazy"
                  />
                  <div className="project-icon-container">
                    {project.icon}
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <a 
                    href={project.link} 
                    className="project-link"
                    aria-label={`Ver detalhes do projeto ${project.name}`}
                  >
                    Ver detalhes →
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div 
            className="stats-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 'tween', index * 0.1, 1)}
                className="stat-card"
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="case-study-section">
        <div className="container">
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
            className="case-study-content"
          >
            <div className="case-study-header">
              <span className="case-study-badge">Caso de Sucesso</span>
              <h2 className="case-study-title">Bot de Atendimento Automatizado</h2>
              <p className="case-study-subtitle">Solução desenvolvida para servidor Discord com mais de 5.000 membros</p>
            </div>

            <div className="case-study-grid">
              <div className="case-study-text">
                <p>Desenvolvi um sistema completo de atendimento automatizado que reduziu em 70% o tempo de resposta às dúvidas frequentes e automatizou o processo de boas-vindas para novos membros.</p>
                <p>O bot integra FAQ inteligente, triagem de perguntas e encaminhamento para atendentes humanos quando necessário, melhorando significativamente a experiência da comunidade.</p>
                <ul className="case-study-features">
                  <li>Respostas automáticas para 85% das perguntas comuns</li>
                  <li>Sistema de tickets para questões complexas</li>
                  <li>Relatórios semanais de interações</li>
                  <li>Integração com banco de dados de conhecimentos</li>
                </ul>
              </div>

              <div className="case-study-results">
                <div className="result-card">
                  <span className="result-value">+300%</span>
                  <span className="result-label">Engajamento da comunidade</span>
                </div>
                <div className="result-card">
                  <span className="result-value">-70%</span>
                  <span className="result-label">Tempo de resposta</span>
                </div>
                <div className="result-card">
                  <span className="result-value">24/7</span>
                  <span className="result-label">Atendimento disponível</span>
                </div>
                <div className="result-card">
                  <span className="result-value">85%</span>
                  <span className="result-label">Perguntas resolvidas automaticamente</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}