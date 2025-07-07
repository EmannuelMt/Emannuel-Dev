import { FaArrowRight, FaCode, FaRobot, FaMobileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Partículas de fundo */}
      <div className="hero-particles">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [0, -100],
              x: [0, Math.random() * 100 - 50]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className="hero-content">
          {/* Badge de destaque */}
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span>Novo</span> Soluções 2025
          </motion.div>

          {/* Título com animação de letras */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Criação de Sites e Bots com{' '}
            <motion.span 
              className="highlight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Entrega Rápida e Preço Justo
            </motion.span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Soluções personalizadas para pequenos negócios, autônomos e criadores
          </motion.p>

          {/* Destaques com ícones */}
          <div className="hero-features">
            <motion.div
              className="feature"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="feature-icon">
                <FaCode />
              </div>
              <span>Sites Profissionais</span>
            </motion.div>

            <motion.div
              className="feature"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="feature-icon">
                <FaMobileAlt />
              </div>
              <span>Landing Pages</span>
            </motion.div>

            <motion.div
              className="feature"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="feature-icon">
                <FaRobot />
              </div>
              <span>Bots Discord</span>
            </motion.div>
          </div>

          {/* Botões CTA */}
          <motion.div
            className="cta-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.a
              href="/contato"
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Solicitar Orçamento <FaArrowRight className="arrow-icon" />
            </motion.a>

            <motion.a
              href="/portfolio"
              className="secondary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Portfólio
            </motion.a>
          </motion.div>
        </div>

        {/* Imagem Hero com efeito */}
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <img 
            src="/hero-illustration.png" 
            alt="Desenvolvimento Web" 
            loading="eager"
          />
          <div className="hero-image-glow" />
        </motion.div>
      </div>
    </section>
  );
}