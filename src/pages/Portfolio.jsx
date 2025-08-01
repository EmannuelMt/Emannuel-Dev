import { 
  FiCode, FiLayers, FiSmartphone, FiDatabase, 
  FiServer, FiCpu, FiCloud, FiBarChart2,
  FiUserCheck, FiAward, FiGlobe, FiClock,
  FiMail, FiGithub, FiLinkedin
} from 'react-icons/fi';
import { 
  FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, 
  FaGitAlt, FaFigma, FaDocker, FaAws
} from 'react-icons/fa';
import { SiTypescript, SiGraphql, SiMongodb, SiJest } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  fadeIn, staggerContainer, textVariant, 
  zoomIn, slideIn, planetVariants 
} from '../utils/motion';
import './Portfolio.css';

export default function Portfolio() {
  const projects = [
    {
      name: "Plataforma de E-commerce",
      description: "Solução completa com dashboard analítico, integração de pagamentos e experiência mobile-first.",
      image: "/ecommerce-project.jpg",
      icon: <FiLayers />,
      tags: ["React", "JavaScript", "MongoDB"],
      link: "#",
      accentColor: "#4361ee"
    },
    {
      name: "Aplicativo Web",
      description: "Aplicativo responsivo com funcionalidades avançadas de UI/UX.",
      image: "/webapp-project.jpg",
      icon: <FiSmartphone />,
      tags: ["HTML5", "CSS3", "React"],
      link: "#",
      accentColor: "#f72585"
    },
    {
      name: "Sistema de Gerenciamento",
      description: "CRUD completo com autenticação e armazenamento no MongoDB.",
      image: "/management-project.jpg",
      icon: <FiDatabase />,
      tags: ["JavaScript", "MongoDB", "Node.js"],
      link: "#",
      accentColor: "#4cc9f0"
    }
  ];

  const stats = [
    { value: "30+", label: "Projetos entregues", icon: <FiAward /> },
    { value: "100%", label: "Satisfação do cliente", icon: <FiUserCheck /> },
    { value: "50k+", label: "Usuários impactados", icon: <FiGlobe /> },
    { value: "3+", label: "Anos de experiência", icon: <FiClock /> }
  ];

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "HTML5", level: 75, icon: <FaHtml5 />, color: "#E44D26", mastered: true },
        { name: "CSS3", level: 75, icon: <FaCss3Alt />, color: "#264DE4", mastered: true },
        { name: "JavaScript", level: 78, icon: <FaJs />, color: "#F7DF1E", mastered: true },
        { name: "React", level: 60, icon: <FaReact />, color: "#61DAFB", mastered: true }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 25, icon: <FaNodeJs />, color: "#68A063", mastered: false },
        { name: "MongoDB", level: 30, icon: <SiMongodb />, color: "#47A248", mastered: true },
        { name: "Express", level: 20, icon: <FiServer />, color: "#000000", mastered: false },
        { name: "REST APIs", level: 15, icon: <FiServer />, color: "#FF6B6B", mastered: false }
      ]
    },
    {
      title: "Ferramentas",
      skills: [
        { name: "Git", level: 35, icon: <FaGitAlt />, color: "#F05032", mastered: false },
        { name: "TypeScript", level: 15, icon: <SiTypescript />, color: "#3178C6", mastered: false },
        { name: "GraphQL", level: 10, icon: <SiGraphql />, color: "#E10098", mastered: false },
        { name: "Docker", level: 10, icon: <FaDocker />, color: "#2496ED", mastered: false }
      ]
    }
  ];

  const workflow = [
    {
      phase: "1. Discovery",
      title: "Imersão no Problema",
      description: "Workshops e entrevistas para entender profundamente as necessidades do negócio.",
      icon: <FiCode />,
      color: "#FF9F1C"
    },
    {
      phase: "2. Strategy",
      title: "Planejamento Estratégico",
      description: "Definição de roadmap, KPIs e arquitetura técnica do projeto.",
      icon: <FiDatabase />,
      color: "#2EC4B6"
    },
    {
      phase: "3. Execution",
      title: "Desenvolvimento Ágil",
      description: "Implementação iterativa com sprints quinzenais e revisões contínuas.",
      icon: <FiCpu />,
      color: "#4361EE"
    },
    {
      phase: "4. Delivery",
      title: "Entrega e Evolução",
      description: "Deploy progressivo e plano de evolução contínua do produto.",
      icon: <FiCloud />,
      color: "#F72585"
    }
  ];

  return (
    <motion.div 
      className="portfolio-page"
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {/* Hero Section */}
      <motion.section 
        className="portfolio-hero"
        variants={planetVariants('left')}
      >
        <div className="hero-overlay" />
        <div className="container">
          <motion.div
            variants={textVariant(0.3)}
            className="hero-content"
          >
            <motion.div
              className="hero-badge"
              whileHover={{ rotate: 5, scale: 1.05 }}
            >
              <FiCode className="badge-icon" />
              <span>Desenvolvedor Front-end com experiência em MongoDB</span>
            </motion.div>
            
            <motion.h1 
              className="hero-title"
              variants={textVariant(0.5)}
              whileHover={{ 
                scale: 1.02,
                textShadow: "0 5px 15px rgba(0,0,0,0.2)"
              }}
            >
              Transformando <motion.span 
                className="text-highlight"
                animate={{ 
                  color: ['#4361ee', '#f72585', '#4cc9f0', '#4361ee'],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              >ideias</motion.span> em realidade digital
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle"
              variants={textVariant(0.7)}
            >
              Soluções tecnológicas sob medida para impulsionar seu negócio
            </motion.p>
            
            <motion.div
              variants={fadeIn('up', 'spring', 0.9, 1)}
              className="hero-cta"
            >
              <motion.a
                href="#projects"
                className="cta-button"
                whileHover={{ 
                  y: -5,
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(67, 97, 238, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Projetos
              </motion.a>
              <motion.a
                href="#contact"
                className="cta-button secondary"
                whileHover={{ 
                  y: -5,
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(247, 37, 133, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Contato
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="hero-tech-stack"
            variants={fadeIn('left', 'spring', 1.2, 1)}
          >
            <div className="tech-icons">
              {[<FaHtml5 />, <FaCss3Alt />, <FaJs />, <FaReact />, <SiMongodb />].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="tech-icon"
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 5 + index,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {Icon}
                </motion.div>
              ))}
            </div>
            <p>Tecnologias que domino e utilizo diariamente</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        id="skills"
        className="skills-section"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="container">
          <motion.div
            variants={textVariant(0.2)}
            className="section-header"
          >
            <motion.span
              className="section-label"
              whileHover={{ scale: 1.1 }}
            >
              Habilidades
            </motion.span>
            <h2 className="section-title">Domínio Técnico</h2>
            <p className="section-subtitle">Tecnologias que aplico para criar soluções robustas</p>
          </motion.div>
          
          <motion.div 
            className="skills-categories"
            variants={staggerContainer}
          >
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                className="skill-category"
                variants={fadeIn('up', 'spring', catIndex * 0.15, 0.75)}
              >
                <motion.h3 
                  className="category-title"
                  whileHover={{ x: 10 }}
                >
                  {category.title}
                </motion.h3>
                
                <div className="skills-grid">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="skill-card"
                      variants={fadeIn('right', 'spring', skillIndex * 0.1, 0.5)}
                      whileHover={{ 
                        y: -10,
                        boxShadow: `0 15px 30px ${skill.color}33`
                      }}
                    >
                      <motion.div
                        className="skill-icon-container"
                        style={{ color: skill.color }}
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 8 + skillIndex,
                          ease: "easeInOut"
                        }}
                      >
                        {skill.icon}
                      </motion.div>
                      
                      <div className="skill-info">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <h4>{skill.name}</h4>
                          {skill.mastered ? (
                            <span className="skill-badge mastered">Domino</span>
                          ) : (
                            <span className="skill-badge learning">Aprendendo</span>
                          )}
                        </div>
                        
                        <div className="skill-progress">
                          <motion.div 
                            className="skill-progress-bar"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ 
                              duration: 1.5,
                              delay: skillIndex * 0.1,
                              type: 'spring'
                            }}
                            style={{ backgroundColor: skill.color }}
                          />
                          <span>{skill.level}%</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Workflow Section */}
      <motion.section 
        className="workflow-section"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.div
            variants={textVariant(0.2)}
            className="section-header"
          >
            <motion.span
              className="section-label"
              whileHover={{ scale: 1.1 }}
            >
              Metodologia
            </motion.span>
            <h2 className="section-title">Processo de Trabalho</h2>
            <p className="section-subtitle">Abordagem sistemática para resultados excepcionais</p>
          </motion.div>
          
          <motion.div 
            className="workflow-steps"
            variants={staggerContainer}
          >
            <AnimatePresence>
              {workflow.map((step, index) => (
                <motion.div
                  key={step.phase}
                  className="workflow-step"
                  variants={slideIn(index % 2 === 0 ? 'left' : 'right', 'spring', index * 0.15, 0.75)}
                  whileHover={{ 
                    y: -15,
                    scale: 1.03,
                    boxShadow: `0 20px 40px ${step.color}33`
                  }}
                  style={{ borderColor: step.color }}
                >
                  <motion.div
                    className="step-phase"
                    style={{ color: step.color }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {step.phase}
                  </motion.div>
                  
                  <motion.div
                    className="step-icon"
                    style={{ backgroundColor: step.color }}
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 8 + index,
                      ease: "easeInOut"
                    }}
                  >
                    {step.icon}
                  </motion.div>
                  
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                  
                  <motion.div 
                    className="step-connector"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects"
        className="projects-section"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container">
          <motion.div
            variants={textVariant(0.2)}
            className="section-header"
          >
            <motion.span
              className="section-label"
              whileHover={{ scale: 1.1 }}
            >
              Portfólio
            </motion.span>
            <h2 className="section-title">Projetos Recentes</h2>
            <p className="section-subtitle">Soluções reais para desafios complexos</p>
          </motion.div>
          
          <motion.div 
            className="projects-grid"
            variants={staggerContainer}
          >
            <AnimatePresence>
              {projects.map((project, index) => (
                <motion.div
                  key={project.name}
                  className="project-card"
                  variants={fadeIn('up', 'spring', index * 0.15, 0.75)}
                  whileHover={{ 
                    y: -15,
                    boxShadow: `0 25px 50px ${project.accentColor}33`
                  }}
                  exit={{ opacity: 0 }}
                  layout
                >
                  <motion.div
                    className="project-image-container"
                    style={{ backgroundColor: project.accentColor }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.img 
                      src={project.image} 
                      alt={project.name} 
                      className="project-image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div 
                      className="project-icon-container"
                      style={{ color: project.accentColor }}
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 6 + index,
                        ease: "easeInOut"
                      }}
                    >
                      {project.icon}
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="project-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="project-title">{project.name}</h3>
                    <p className="project-description">{project.description}</p>
                    
                    <motion.div 
                      className="project-tags"
                      variants={staggerContainer}
                    >
                      {project.tags.map((tag, i) => (
                        <motion.span 
                          key={i}
                          className="project-tag"
                          variants={fadeIn('right', 'spring', i * 0.1, 0.5)}
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: project.accentColor,
                            color: 'white'
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>
                    
                    <motion.div className="project-actions">
                      <motion.a 
                        href={project.link} 
                        className="project-link"
                        whileHover={{ 
                          x: 5,
                          color: project.accentColor
                        }}
                      >
                        Ver detalhes
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            repeat: Infinity,
                            duration: 2
                          }}
                        >
                          →
                        </motion.span>
                      </motion.a>
                      
                      <motion.a 
                        href="#contact" 
                        className="project-link secondary"
                        whileHover={{ 
                          x: 5,
                          color: project.accentColor
                        }}
                      >
                        Projeto similar?
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="stats-section"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.div 
            className="stats-grid"
            variants={staggerContainer}
          >
            <AnimatePresence>
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-card"
                  variants={zoomIn(index * 0.1, 0.5)}
                  whileHover={{ 
                    y: -10,
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)"
                  }}
                >
                  <motion.div
                    className="stat-icon"
                    animate={{ 
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 8 + index,
                      ease: "easeInOut"
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div 
                    className="stat-value"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 100,
                      delay: index * 0.1
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact"
        className="contact-section"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.div
            variants={textVariant(0.2)}
            className="section-header"
          >
            <motion.span
              className="section-label"
              whileHover={{ scale: 1.1 }}
            >
              Contato
            </motion.span>
            <h2 className="section-title">Vamos Conversar</h2>
            <p className="section-subtitle">Pronto para transformar sua ideia em realidade?</p>
          </motion.div>
          
          <motion.div 
            className="contact-content"
            variants={fadeIn('up', 'spring', 0.3, 1)}
          >
            <motion.form
              className="contact-form"
              whileHover={{ 
                boxShadow: "0 15px 40px rgba(67, 97, 238, 0.15)"
              }}
            >
              <motion.div 
                className="form-group"
                whileHover={{ x: 5 }}
              >
                <label>Nome</label>
                <input type="text" placeholder="Seu nome completo" />
              </motion.div>
              
              <motion.div 
                className="form-group"
                whileHover={{ x: 5 }}
              >
                <label>Email</label>
                <input type="email" placeholder="seu@email.com" />
              </motion.div>
              
              <motion.div 
                className="form-group"
                whileHover={{ x: 5 }}
              >
                <label>Mensagem</label>
                <textarea placeholder="Descreva seu projeto..."></textarea>
              </motion.div>
              
              <motion.button
                type="submit"
                className="submit-button"
                whileHover={{ 
                  y: -3,
                  scale: 1.03,
                  boxShadow: "0 10px 25px rgba(67, 97, 238, 0.4)"
                }}
                whileTap={{ scale: 0.97 }}
              >
                Enviar Mensagem
              </motion.button>
            </motion.form>
            
            <motion.div 
              className="contact-info"
              variants={fadeIn('left', 'spring', 0.5, 1)}
            >
              <motion.div 
                className="info-item"
                whileHover={{ x: 10 }}
              >
                <FiMail className="info-icon" />
                <div>
                  <h4>Email</h4>
                  <p>emannuelmatosdeoliveira@gmail.com</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="info-item"
                whileHover={{ x: 10 }}
              >
                <FiLinkedin className="info-icon" />
                <div>
                  <h4>LinkedIn</h4>
                  <p>Emannuel Matos</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="info-item"
                whileHover={{ x: 10 }}
              >
                <FiGithub className="info-icon" />
                <div>
                  <h4>GitHub</h4>
                  <p>EmannuelMt</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}