import { 
  FaCode, 
  FaPalette, 
  FaRocket, 
  FaHandshake, 
  FaMedal, 
  FaClock, 
  FaLightbulb, 
  FaCheckCircle, 
  FaUserTie, 
  FaMobileAlt, 
  FaServer, 
  FaFilePdf,
  FaGlobe,
  FaShieldAlt,
  FaBolt,
  FaChartLine,
  FaCloud,
  FaAws
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiReact, 
  SiNodedotjs, 
  SiTypescript, 
  SiHtml5, 
  SiCss3, 
  SiMongodb, 
  SiExpress, 
  SiGraphql, 
  SiDocker, 
  SiGit
} from 'react-icons/si';
import { motion } from 'framer-motion';
import './About.css';
import profileImage from './IMG-20250323-WA0010.jpg';

// Data Layer - Enterprise Grade
const ENTERPRISE_DATA = {
  projects: [
    {
      id: 1,
      title: "Little Ideias",
      description: "Plataforma de compartilhamento de ideias criativas com sistema de votação e comentários.",
      techs: ["React", "Firebase", "CSS"],
      link: "https://little-ideias.vercel.app/",
      repo: "https://github.com/EmannuelMt/Little-Ideias",
      isFavorite: true,
      featured: true,
      enterpriseLevel: true
    },
    {
      id: 2,
      title: "Golden Grill",
      description: "Sistema de gerenciamento para restaurantes com cardápio digital, pedidos online e dashboard administrativo.",
      techs: ["React", "Node", "JavaScript"],
      link: "https://golden-grill.vercel.app/",
      repo: "https://github.com/EmannuelMt/GOLDEN-GRILL",
      isFavorite: false,
      lastUpdated: "2025-05-22",
      stars: 28,
      scale: "Enterprise"
    },
    {
      id: 3,
      title: "EmannuelDev",
      description: "Portfólio profissional desenvolvido com React e Framer Motion para animações fluidas.",
      techs: ["React", "CSS", "Framer Motion"],
      link: "https://emannuel-dev.vercel.app/",
      repo: "https://github.com/EmannuelMt/Emannuel-Dev",
      isFavorite: true,
      lastUpdated: "2024-11-05",
      stars: 35,
      featured: true
    },
    {
      id: 4,
      title: "Ecos da Realidade",
      description: "Plataforma completa para mestres e jogadores de RPG.",
      techs: ["React", "Node", "Firebase"],
      link: "https://ecos-da-realidade.vercel.app/",
      repo: "https://github.com/EmannuelMt/Ecos-da-Realidade",
      isFavorite: false,
      lastUpdated: "2025-05-30",
      stars: 19
    },
    {
      id: 5,
      title: "Cantinho Do Universo",
      description: "Site pessoal com portfolio criativo e blog integrado.",
      techs: ["React", "Node", "CSS"],
      link: "https://cantinho-do-universo.vercel.app/",
      repo: "https://github.com/EmannuelMt/Cantinho-Do-Universo",
      isFavorite: true,
      lastUpdated: "2025-05-18",
      stars: 31,
      enterpriseLevel: true
    }
  ],

  values: [
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
  ],

  differentiators: [
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
  ],

  techStack: [
    { icon: <SiJavascript />, name: "JavaScript", category: "Frontend" },
    { icon: <SiReact />, name: "React", category: "Frontend" },
    { icon: <SiNodedotjs />, name: "Node.js", category: "Backend" },
    { icon: <SiTypescript />, name: "TypeScript", category: "Language" }
  ],

  stats: [
    { value: "50", label: "Projetos Entregues", suffix: "+" },
    { value: "100", label: "Clientes Satisfeitos", suffix: "%" },
    { value: "1", label: "Ano de Experiência", suffix: "+" },
    { value: "10", label: "Dias Prazo Médio", suffix: "" }
  ],

  technicalSkills: {
    frontend: [
      { 
        name: "HTML5", 
        icon: <SiHtml5 />, 
        level: 95, 
        status: "Expert",
        description: "Domínio completo de semântica HTML5, acessibilidade WCAG e integração com APIs modernas para aplicações enterprise."
      },
      { 
        name: "CSS3", 
        icon: <SiCss3 />, 
        level: 92, 
        status: "Expert",
        description: "Especialista em CSS moderno incluindo Grid, Flexbox, animações performáticas e design systems escaláveis."
      },
      { 
        name: "JavaScript", 
        icon: <SiJavascript />, 
        level: 88, 
        status: "Avançado",
        description: "Domínio de ES6+, patterns avançados, performance optimization e arquitetura de aplicações complexas."
      },
      { 
        name: "React", 
        icon: <SiReact />, 
        level: 85, 
        status: "Avançado",
        description: "Especialista em React Hooks, Context API, Redux Toolkit e desenvolvimento de componentes de classe enterprise."
      }
    ],
    backend: [
      { 
        name: "Node.js", 
        icon: <SiNodedotjs />, 
        level: 78, 
        status: "Avançado",
        description: "Desenvolvimento de APIs RESTful e GraphQL com foco em segurança, performance e escalabilidade corporativa."
      },
      { 
        name: "MongoDB", 
        icon: <SiMongodb />, 
        level: 82, 
        status: "Avançado",
        description: "Especialista em modelagem de dados, queries complexas, agregações e otimização de performance em larga escala."
      },
      { 
        name: "Express", 
        icon: <SiExpress />, 
        level: 75, 
        status: "Avançado",
        description: "Desenvolvimento de aplicações server-side robustas com middlewares customizados e arquitetura modular."
      },
      { 
        name: "REST APIs", 
        icon: <FaServer />, 
        level: 80, 
        status: "Avançado",
        description: "Design e implementação de APIs RESTful seguindo padrões enterprise com documentação Swagger/OpenAPI."
      }
    ],
    cloud: [
      { 
        name: "AWS", 
        icon: <FaAws />, 
        level: 70, 
        status: "Intermediário",
        description: "Deploy e gerenciamento de aplicações em serviços AWS como EC2, S3, Lambda e CloudFront."
      },
      { 
        name: "Docker", 
        icon: <SiDocker />, 
        level: 65, 
        status: "Intermediário",
        description: "Containerização de aplicações e orquestração com Docker Compose para ambientes de desenvolvimento e produção."
      },
      { 
        name: "Git", 
        icon: <SiGit />, 
        level: 85, 
        status: "Avançado",
        description: "Versionamento avançado com Git Flow, rebase interativo e integração contínua em pipelines enterprise."
      },
      { 
        name: "TypeScript", 
        icon: <SiTypescript />, 
        level: 75, 
        status: "Avançado",
        description: "Desenvolvimento type-safe com TypeScript, generics avançados e integração em projetos de grande escala."
      }
    ]
  },

  softSkills: [
    "Liderança Técnica e Mentoria",
    "Comunicação Executiva Clara",
    "Gestão de Projetos Ágeis",
    "Resolução de Problemas Complexos",
    "Pensamento Estratégico",
    "Adaptabilidade em Ambientes Dinâmicos",
    "Orientação a Resultados Mensuráveis"
  ]
};

// Componentes Enterprise
const SectionHeader = ({ icon, title, subtitle, variant = "default" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`section-header ${variant}`}
  >
    <div className="section-title-wrapper">
      <div className="title-decoration"></div>
      <h2 className="section-title">
        <span className="icon-wrapper">{icon}</span>
        {title}
      </h2>
      <div className="title-decoration"></div>
    </div>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="section-subtitle"
      >
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);

const EnterpriseSkillCategory = ({ category, skills, delay = 0, icon }) => (
  <motion.div
    className="skill-category enterprise-card"
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    <div className="category-header">
      <div className="category-icon-wrapper">
        {icon}
      </div>
      <h3>{category}</h3>
      <div className="category-line"></div>
    </div>
    <div className="skills-list">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className="skill-item enterprise-skill"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="skill-header">
            <div className="skill-main">
              <div className="skill-icon">{skill.icon}</div>
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-description">{skill.description}</span>
              </div>
            </div>
            <div className="skill-meta">
              <span className={`skill-status ${skill.status.toLowerCase()}`}>
                {skill.status}
              </span>
              <span className="skill-level">{skill.level}%</span>
            </div>
          </div>
          <div className="skill-bar">
            <motion.div
              className="skill-progress"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: index * 0.15 + 0.4, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const EnterpriseProjectCard = ({ project, index }) => (
  <motion.div
    className={`project-card enterprise-project ${project.featured ? 'featured' : ''} ${project.enterpriseLevel ? 'enterprise-level' : ''}`}
    initial={{ opacity: 0, y: 50, rotateX: 10 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
      duration: 0.8, 
      delay: index * 0.2,
      ease: "easeOut"
    }}
    whileHover={{ 
      y: -15,
      transition: { duration: 0.3 }
    }}
  >
    {project.isFavorite && (
      <div className="project-badge premium">
        <FaMedal />
        <span>Desenvolvedor</span>
      </div>
    )}
    
    {project.enterpriseLevel && (
      <div className="project-badge enterprise">
        <FaGlobe />
        <span>Web</span>
      </div>
    )}

    <div className="project-header">
      <h3 className="project-title">{project.title}</h3>
      {project.stars && (
        <div className="project-rating">
          <span className="stars">{project.stars}</span>
          <FaBolt className="rating-icon" />
        </div>
      )}
    </div>

    <p className="project-description">{project.description}</p>
    
    <div className="project-techs">
      {project.techs.map((tech) => (
        <span key={tech} className="tech-tag">
          {tech}
        </span>
      ))}
    </div>
    
    {project.lastUpdated && (
      <div className="project-meta">
        <span className="project-date">Atualizado: {project.lastUpdated}</span>
      </div>
    )}
    
    <div className="project-links">
      <motion.a 
        href={project.link} 
        className="project-link primary"
        target="_blank" 
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaRocket />
        Ver Projeto
      </motion.a>
      <motion.a 
        href={project.repo} 
        className="project-link secondary"
        target="_blank" 
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaCode />
        Código Fonte
      </motion.a>
    </div>
  </motion.div>
);

const StatsGrid = () => (
  <motion.div 
    className="stats-grid enterprise-stats"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, staggerChildren: 0.2 }}
  >
    {ENTERPRISE_DATA.stats.map((stat, index) => (
      <motion.div
        key={stat.label}
        className="stat-card enterprise-stat"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ scale: 1.05, y: -5 }}
      >
        <div className="stat-content">
          <motion.div
            className="stat-value"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3, type: "spring" }}
          >
            {stat.value}<span className="stat-suffix">{stat.suffix}</span>
          </motion.div>
          <div className="stat-label">{stat.label}</div>
        </div>
        <div className="stat-decoration"></div>
      </motion.div>
    ))}
  </motion.div>
);

export default function About() {
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Emannuel-Dev-Curriculo.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const startProject = () => {
    window.location.href = '/contato';
  };

  return (
    <div className="about-page enterprise-page">
      {/* Hero Section - Enterprise Grade */}
      <section className="about-hero enterprise-hero">
        <div className="hero-background">
          <div className="hero-grid"></div>
          <div className="hero-glow"></div>
        </div>
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <FaShieldAlt />
              <span>Desenvolvedor Web Full Stack</span>
            </motion.div>

            <h1 className="hero-title">
              <motion.span 
                className="hero-line"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Transformando Ideias em
              </motion.span>
              <motion.span 
                className="highlight gradient-text"
                initial={{ opacity: 0, y: 30 }}
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

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.button
                className="cta-button enterprise-cta"
                onClick={startProject}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(67, 97, 238, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRocket />
                Iniciar Projeto Enterprise
              </motion.button>              
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Profile Section - Executive Summary */}
      <section className="profile-section executive-profile">
        <div className="container">
          <motion.div 
            className="profile-grid executive-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="profile-image executive-image"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="image-frame">
                <img 
                  src={profileImage} 
                  alt="Emannuel Dev - Senior Fullstack Developer" 
                  loading="lazy" 
                />
                <div className="image-overlay executive-overlay">
                  <div className="tech-stack executive-stack">
                    {ENTERPRISE_DATA.techStack.map((tech, index) => (
                      <motion.div 
                        key={tech.name}
                        className="tech-item enterprise-tech"
                        whileHover={{ scale: 1.3, rotate: 5 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        {tech.icon}
                        <span>{tech.name}</span>
                        <div className="tech-category">{tech.category}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="profile-content executive-content">
              <SectionHeader
                icon={<FaUserTie />}
                title="Perfil Profissional"
               
              />
              
              {[
                "Sou Emannuel, tenho 20 anos e sou desenvolvedor web focado em transformar ideias em experiências digitais únicas, rápidas e acessíveis. Crio sites modernos, bots automatizados e landing pages estratégicas para pequenos negócios, criadores de conteúdo e empreendedores que querem se destacar online — sem complicação, enrolação ou promessas vazias.",
                "Trabalho com foco em agilidade, personalização e eficiência, aliando técnica, criatividade e suporte real. Cada projeto é construído como uma missão: com planejamento, dedicação e entrega pontual.",
                "Além do desenvolvimento, sou uma pessoa que gosta de aprender sempre, buscando novas tecnologias e tendências para entregar o melhor aos meus clientes. Valorizo a comunicação transparente e o relacionamento direto, porque acredito que isso faz toda a diferença no resultado final.",
                "Seja um portfólio, uma landing page que converte, um site com painel de controle ou até um bot para Discord — aqui você tem transparência, suporte direto comigo e resultado de verdade."
              ].map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="executive-text"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                >
                  {paragraph}
                </motion.p>
              ))}
              
              <StatsGrid />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical Skills Section - Enterprise Stack */}
      <section className="skills-section enterprise-skills">
        <div className="container">
          <SectionHeader
            icon={<FaCode />}
            title="Stack Tecnológico"
            variant="centered"
          />

          <div className="skills-container enterprise-container">
            <EnterpriseSkillCategory 
              category="Frontend Engineering" 
              skills={ENTERPRISE_DATA.technicalSkills.frontend} 
              delay={0.2}
              icon={<FaPalette />}
            />
            <EnterpriseSkillCategory 
              category="Backend Architecture" 
              skills={ENTERPRISE_DATA.technicalSkills.backend} 
              delay={0.4}
              icon={<FaServer />}
            />
            <EnterpriseSkillCategory 
              category="Cloud & DevOps" 
              skills={ENTERPRISE_DATA.technicalSkills.cloud} 
              delay={0.6}
              icon={<FaCloud />}
            />
          </div>

          {/* Soft Skills Section - Leadership */}
          <motion.div
            className="soft-skills-section executive-softskills"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="softskills-header">
              <h3 className="soft-skills-title">
                <FaUserTie className="section-icon" /> 
                Skills
              </h3>
              <p className="section-subtitle">
                Habilidades interpessoais que impulsionam o sucesso em ambientes corporativos complexos
              </p>
            </div>
            <div className="soft-skills-grid executive-grid">
              {ENTERPRISE_DATA.softSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="soft-skill-item executive-skill"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="skill-icon-wrapper">
                    <FaCheckCircle className="soft-skill-icon" />
                  </div>
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section - Portfolio */}
      <section className="projects-section enterprise-portfolio">
        <div className="container">
          <SectionHeader
            icon={<FaRocket />}
            title="Meus Projetos"
            variant="centered"
          />

          <motion.div
            className="projects-grid enterprise-projects-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
          >
            {ENTERPRISE_DATA.projects.map((project, index) => (
              <EnterpriseProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section - Corporate Principles */}
      <section className="values-section corporate-values">
        <div className="container">
          <SectionHeader
            icon={<FaMedal />}
            title="Nossos Princípios"
            variant="centered"
          />
          
          <motion.div
            className="values-grid enterprise-values"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
          >
            {ENTERPRISE_DATA.values.map((value, index) => (
              <motion.div
                key={value.title}
                className="value-card corporate-value"
                whileHover={{ y: -15, scale: 1.02 }}
                initial={{ opacity: 0, y: 30, rotateY: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="value-icon-container corporate-icon">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
                <div className="value-decoration"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Differentiators Section - Competitive Edge */}
      <section className="diff-section competitive-edge">
        <div className="container">
          <SectionHeader
            icon={<FaChartLine />}
            title="Vantagem Do Nosso Serviço"
            variant="centered"
          />
          
          <motion.div
            className="diff-grid enterprise-diff"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.15 }}
          >
            {ENTERPRISE_DATA.differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                className="diff-card enterprise-diff-card"
                whileHover={{ scale: 1.05, y: -10 }}
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="diff-icon corporate-diff-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="diff-glow"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Enterprise Partnership */}
      <section className="about-cta enterprise-partnership">
        <div className="container">
          <motion.div
            className="cta-card corporate-cta"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="cta-content">
              <motion.div
                className="cta-badge"
                initial={{ opacity: 0, rotate: -10 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <FaShieldAlt />
                <span>Parceria Enterprise</span>
              </motion.div>

              <h2>Pronto para escalar seu projeto ao nível corporativo?</h2>
              <p>Vamos construir juntos soluções que impressionam e entregam resultados mensuráveis</p>
              
              <div className="cta-actions">
                <motion.button
                  onClick={startProject}
                  className="cta-button enterprise-cta primary"
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(67, 97, 238, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaRocket />
                  Iniciar Projeto Enterprise
                </motion.button>
              </div>
            </div>
            
            <div className="cta-decoration">
              <div className="decoration-ring"></div>
              <div className="decoration-ring"></div>
              <div className="decoration-ring"></div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}