import { FaCode, FaPalette, FaRocket, FaHandshake, FaMedal, FaClock, FaLightbulb, FaCheckCircle, FaUserTie, FaMobileAlt, FaServer } from 'react-icons/fa';
import { SiJavascript, SiReact, SiNodedotjs, SiTypescript } from 'react-icons/si';
import { motion } from 'framer-motion';
import './About.css';
<<<<<<< HEAD
=======
import profileImage from './IMG-20250323-WA0010.jpg';
>>>>>>> aefe7df (Corrige carregamento de imagem e atualiza seção About)

export default function About() {
  const values = [
    {
      icon: <FaHandshake className="value-icon" />,
      title: "Transparência Radical",
      description: "Processo claro desde o primeiro contato, com orçamentos detalhados e comunicação honesta sobre prazos e possibilidades."
    },
    {
      icon: <FaMedal className="value-icon" />,
      title: "Excelência Técnica",
      description: "Código limpo, bem documentado e arquitetura pensada para evolução futura. Uso das melhores práticas do mercado."
    },
    {
      icon: <FaClock className="value-icon" />,
      title: "Compromisso Total",
      description: "Entrega dentro do prazo combinado com suporte pós-entrega incluso. Seu sucesso é minha prioridade."
    }
  ];

  const differentiators = [
    {
      icon: <FaUserTie />,
      title: "Atendimento Personalizado",
      text: "Dedicação exclusiva ao seu projeto com reuniões semanais de alinhamento"
    },
    {
      icon: <FaMobileAlt />,
      title: "Design Responsivo",
      text: "Sites que se adaptam perfeitamente a qualquer dispositivo"
    },
    {
      icon: <FaServer />,
      title: "Performance Otimizada",
      text: "Carga ultrarrápida e otimização para motores de busca"
    },
    {
      icon: <FaLightbulb />,
      title: "Soluções Criativas",
      text: "Ideias inovadoras para resolver seus desafios digitais"
    }
  ];

  const techStack = [
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiReact />, name: "React" },
    { icon: <SiNodedotjs />, name: "Node.js" },
    { icon: <SiTypescript />, name: "JavaScript" }
  ];

  const stats = [
    { value: "50", label: "Projetos Entregues" },
    { value: "100%", label: "Clientes Satisfeitos" },
    { value: "1", label: "Ano de Experiência" },
    { value: "10", label: "Dias Prazo Médio" }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Transformando Ideias em
              </motion.span>
              <motion.span 
                className="highlight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Realidade Digital
              </motion.span>
            </h1>
            
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Desenvolvedor Fullstack especializado em criar experiências web excepcionais
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="profile-section">
        <div className="container">
          <motion.div 
            className="profile-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="profile-image"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
<<<<<<< HEAD
              <img src="/Screenshot_2025-03-23-14-20-05-255_com.instagram.android.jpg" alt="Emannuel Dev" />
=======
              <img src={profileImage} alt="Emannuel Dev" />
>>>>>>> aefe7df (Corrige carregamento de imagem e atualiza seção About)
              <div className="image-overlay">
                <div className="tech-stack">
                  {techStack.map((tech, index) => (
                    <motion.div 
                      key={index}
                      className="tech-item"
                      whileHover={{ scale: 1.2 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {tech.icon}
                      <span>{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <div className="profile-content">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <FaCode className="section-icon" /> Minha Jornada
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
             Sou Emannuel, tenho 20 anos e sou desenvolvedor web focado em transformar ideias em experiências digitais únicas, rápidas e acessíveis. Crio sites modernos, bots automatizados e landing pages estratégicas para pequenos negócios, criadores de conteúdo e empreendedores que querem se destacar online — sem complicação, enrolação ou promessas vazias.

Trabalho com foco em agilidade, personalização e eficiência, aliando técnica, criatividade e suporte real. Cada projeto é construído como uma missão: com planejamento, dedicação e entrega pontual.

Além do desenvolvimento, sou uma pessoa que gosta de aprender sempre, buscando novas tecnologias e tendências para entregar o melhor aos meus clientes. Valorizo a comunicação transparente e o relacionamento direto, porque acredito que isso faz toda a diferença no resultado final.

Seja um portfólio, uma landing page que converte, um site com painel de controle ou até um bot para Discord — aqui você tem transparência, suporte direto comigo e resultado de verdade.
              </motion.p>
              
              <motion.div 
                className="stats-grid"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <motion.div
                      className="stat-value"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              <FaMedal className="section-icon" /> Meus Princípios
            </h2>
            <p className="section-subtitle">Os valores que guiam cada projeto que entrego</p>
          </motion.div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="value-icon-container">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="diff-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              <FaRocket className="section-icon" /> O Que Me Diferencia
            </h2>
            <p className="section-subtitle">Excelência em cada detalhe do seu projeto</p>
          </motion.div>
          
          <div className="diff-grid">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                className="diff-card"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="diff-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Pronto para levar seu projeto ao próximo nível?</h2>
            <p>Vamos conversar sobre como posso ajudar a transformar sua visão em realidade</p>
            <div className="cta-buttons">
              <motion.a
                href="/contato"
                className="cta-button primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Iniciar Projeto
              </motion.a>
              <motion.a
                href="/portfolio"
                className="cta-button secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Portfólio
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}