import { FaCode, FaPalette, FaRocket, FaHandshake, FaMedal, FaClock, FaLightbulb, FaCheckCircle, FaUserTie, FaMobileAlt, FaServer, FaFilePdf } from 'react-icons/fa';
import { SiJavascript, SiReact, SiNodedotjs, SiTypescript, SiHtml5, SiCss3, SiMongodb, SiExpress, SiGraphql, SiDocker, SiGit } from 'react-icons/si';
import { motion } from 'framer-motion';
import './About.css';
import profileImage from './IMG-20250323-WA0010.jpg';
import resumePDF from './Emannuel-Dev-CV.pdf';

const projectsData = [
  {
    id: 1,
    title: "Little Ideias",
    description: "Plataforma de compartilhamento de ideias criativas com sistema de votação e comentários.",
    techs: ["React", "Firebase", "CSS"],
    link: "https://little-ideias.vercel.app/",
    repo: "https://github.com/EmannuelMt/Little-Ideias",
    isFavorite: true,
    featured: true
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
    stars: 28
  },
  {
    id: 3,
    title: "EmannuelDev",
    description: "Meu portfólio profissional desenvolvido com React e Framer Motion para animações fluidas.",
    techs: ["React", "CSS", "Framer Motion"],
    link: "https://emannuel-dev.vercel.app/",
    repo: "https://github.com/EmannuelMt/Emannuel-Dev",
    isFavorite: true,
    lastUpdated: "2024-11-05",
    stars: 35
  },
  {
    id: 4,
    title: "Ecos da Realidade",
    description: "Site Para mestres e jogadores de RPG.",
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
    description: "Site Pessoal.",
    techs: ["React", "Node", "CSS"],
    link: "https://cantinho-do-universo.vercel.app/",
    repo: "https://github.com/EmannuelMt/Cantinho-Do-Universo",
    isFavorite: true,
    lastUpdated: "2025-05-18",
    stars: 31
  },
  {
    id: 6,
    title: "Studio Branding",
    description: "Redesign completo de identidade visual para estúdio criativo.",
    techs: ["Figma", "Design System"],
    link: "#",
    repo: "#",
    isFavorite: false,
    lastUpdated: "2024-07-12",
    stars: 24
  }
];

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
    { icon: <SiTypescript />, name: "TypeScript" }
  ];

  const stats = [
    { value: "50", label: "Projetos Entregues" },
    { value: "100%", label: "Clientes Satisfeitos" },
    { value: "1", label: "Ano de Experiência" },
    { value: "10", label: "Dias Prazo Médio" }
  ];

  const technicalSkills = {
    frontend: [
      { 
        name: "HTML5", 
        icon: <SiHtml5 />, 
        level: 75, 
        status: "Domino",
        description: "Linguagem de marcação fundamental para estruturar páginas web. Domínio de semântica HTML5, acessibilidade e integração com APIs modernas."
      },
      { 
        name: "CSS3", 
        icon: <SiCss3 />, 
        level: 75, 
        status: "Domino",
        description: "Estilização avançada com CSS3 incluindo Flexbox, Grid, animações, variáveis CSS e design responsivo para todos os dispositivos."
      },
      { 
        name: "JavaScript", 
        icon: <SiJavascript />, 
        level: 78, 
        status: "Domino",
        description: "Linguagem de programação para web com domínio de ES6+, manipulação de DOM, async/await, promises e programação funcional."
      },
      { 
        name: "React", 
        icon: <SiReact />, 
        level: 60, 
        status: "Domino",
        description: "Biblioteca JavaScript para construção de interfaces. Experiência com Hooks, Context API, Redux, e componentes reutilizáveis."
      }
    ],
    backend: [
      { 
        name: "Node.js", 
        icon: <SiNodedotjs />, 
        level: 25, 
        status: "Aprendendo",
        description: "Runtime JavaScript para backend. Conhecimento em criação de APIs REST, autenticação JWT e integração com bancos de dados."
      },
      { 
        name: "MongoDB", 
        icon: <SiMongodb />, 
        level: 30, 
        status: "Domino",
        description: "Banco de dados NoSQL com experiência em schemas, queries, agregações e integração com aplicações Node.js."
      },
      { 
        name: "Express", 
        icon: <SiExpress />, 
        level: 20, 
        status: "Aprendendo",
        description: "Framework para Node.js utilizado para construção de APIs RESTful e aplicações web server-side."
      },
      { 
        name: "REST APIs", 
        icon: <FaServer />, 
        level: 15, 
        status: "Aprendendo",
        description: "Desenvolvimento de APIs RESTful seguindo boas práticas com endpoints bem definidos, status codes apropriados e documentação."
      }
    ],
    tools: [
      { 
        name: "Git", 
        icon: <SiGit />, 
        level: 35, 
        status: "Aprendendo",
        description: "Sistema de controle de versão distribuído. Domínio de comandos básicos, branching strategy e workflows colaborativos."
      },
      { 
        name: "TypeScript", 
        icon: <SiTypescript />, 
        level: 15, 
        status: "Aprendendo",
        description: "Superset tipado de JavaScript que adiciona tipos estáticos para melhorar a qualidade e manutenibilidade do código."
      },
      { 
        name: "GraphQL", 
        icon: <SiGraphql />, 
        level: 10, 
        status: "Aprendendo",
        description: "Linguagem de consulta para APIs que permite solicitar dados específicos em uma única requisição."
      },
      { 
        name: "Docker", 
        icon: <SiDocker />, 
        level: 10, 
        status: "Aprendendo",
        description: "Plataforma para desenvolvimento, envio e execução de aplicações em containers isolados."
      }
    ]
  };

  const softSkills = [
    "Organização e atenção aos detalhes",
    "Comunicação clara e eficaz",
    "Proatividade e resolução de problemas",
    "Trabalho em equipe",
    "Aprendizado rápido",
    "Capacidade de adaptação",
    "Observação e foco nos detalhes"
  ];

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Emannuel-Dev-Curriculo.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="hero-buttons"
            >
              <motion.button
                onClick={downloadResume}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="resume-button"
              >
                <FaFilePdf /> Baixar Currículo
              </motion.button>
            </motion.div>
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
              <img src={profileImage} alt="Emannuel Dev" loading="lazy" />
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
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Trabalho com foco em agilidade, personalização e eficiência, aliando técnica, criatividade e suporte real. Cada projeto é construído como uma missão: com planejamento, dedicação e entrega pontual.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Além do desenvolvimento, sou uma pessoa que gosta de aprender sempre, buscando novas tecnologias e tendências para entregar o melhor aos meus clientes. Valorizo a comunicação transparente e o relacionamento direto, porque acredito que isso faz toda a diferença no resultado final.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
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

      {/* Technical Skills Section */}
      <section className="skills-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              <FaCode className="section-icon" /> Domínio Técnico
            </h2>
            <p className="section-subtitle">Tecnologias que aplico para criar soluções robustas</p>
          </motion.div>

          <div className="skills-container">
            {/* Frontend Skills */}
            <motion.div
              className="skill-category"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3>
                <FaPalette className="category-icon" /> Frontend
              </h3>
              <div className="skills-list">
                {technicalSkills.frontend.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="skill-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="skill-header">
                      <div className="skill-icon">{skill.icon}</div>
                      <span className="skill-name">{skill.name}</span>
                      <span className={`skill-status ${skill.status.toLowerCase()}`}>{skill.status}</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-description">
                      <p>{skill.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Backend Skills */}
            <motion.div
              className="skill-category"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3>
                <FaServer className="category-icon" /> Backend
              </h3>
              <div className="skills-list">
                {technicalSkills.backend.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="skill-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="skill-header">
                      <div className="skill-icon">{skill.icon}</div>
                      <span className="skill-name">{skill.name}</span>
                      <span className={`skill-status ${skill.status.toLowerCase()}`}>{skill.status}</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-description">
                      <p>{skill.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tools Skills */}
            <motion.div
              className="skill-category"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3>
                <FaCode className="category-icon" /> Ferramentas
              </h3>
              <div className="skills-list">
                {technicalSkills.tools.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="skill-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="skill-header">
                      <div className="skill-icon">{skill.icon}</div>
                      <span className="skill-name">{skill.name}</span>
                      <span className={`skill-status ${skill.status.toLowerCase()}`}>{skill.status}</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-description">
                      <p>{skill.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Soft Skills Section */}
          <motion.div
            className="soft-skills-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="soft-skills-title">
              <FaUserTie className="section-icon" /> Soft Skills
            </h3>
            <p className="section-subtitle">Habilidades interpessoais que complementam meu trabalho técnico</p>
            <div className="soft-skills-grid">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="soft-skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <FaCheckCircle className="soft-skill-icon" />
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              <FaRocket className="section-icon" /> Meus Projetos
            </h2>
            <p className="section-subtitle">Alguns dos trabalhos que desenvolvi com dedicação</p>
          </motion.div>

          <div className="projects-grid">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {project.isFavorite && (
                  <div className="project-favorite">
                    <FaMedal />
                  </div>
                )}
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-techs">
                  {project.techs.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="project-footer">
                  {project.lastUpdated && (
                    <span className="project-date">Atualizado: {project.lastUpdated}</span>
                  )}
                  {project.stars && (
                    <span className="project-stars">{project.stars} ★</span>
                  )}
                </div>
                
                <div className="project-links">
                  <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                    Ver Projeto
                  </a>
                  <a href={project.repo} className="project-link" target="_blank" rel="noopener noreferrer">
                    Código Fonte
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
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
              
              <motion.button
                onClick={downloadResume}
                className="cta-button tertiary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFilePdf /> Baixar CV
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}