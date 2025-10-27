import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import { 
  FaEnvelope, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaPaperPlane,
  FaShieldAlt,
  FaClock,
  FaSyncAlt
} from 'react-icons/fa';
import { 
  FiMail, 
  FiArrowLeft, 
  FiCheckCircle, 
  FiAlertTriangle,
  FiLock,
  FiSend
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './AIDrawing_250911_d80e2d99-024a-4ae2-bd8e-9c4422800165_0_MiriCanvas.png'; 
import './auth.css'


export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
    setMessage('');
  };

  const validateEmail = () => {
    if (!email) {
      setError('Email é obrigatório');
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email inválido');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) return;

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await sendPasswordResetEmail(auth, email);
      
      setMessage('Email de redefinição enviado! Verifique sua caixa de entrada.');
      setTimeout(() => {
        navigate('/login');
      }, 5000);
      
    } catch (error) {
      console.error('Erro ao enviar email de redefinição:', error);
      
      switch (error.code) {
        case 'auth/user-not-found':
          setError('Nenhuma conta encontrada com este email');
          break;
        case 'auth/invalid-email':
          setError('Email inválido');
          break;
        case 'auth/too-many-requests':
          setError('Muitas tentativas. Tente novamente mais tarde.');
          break;
        default:
          setError('Erro ao enviar email de redefinição. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="auth-container">
      {/* Background side */}
      <motion.div 
        className="auth-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="background-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <motion.img 
              src={Logo} 
              alt="Emannuel Dev" 
              className="background-logo"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Recuperação de Senha
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              Vamos te ajudar a recuperar o acesso
            </motion.p>
            
            <motion.div 
              className="security-features"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="security-item">
                <FaShieldAlt className="security-icon" />
                <div>
                  <h4>Segurança Garantida</h4>
                  <p>Processo 100% seguro e criptografado</p>
                </div>
              </div>
              <div className="security-item">
                <FaClock className="security-icon" />
                <div>
                  <h4>Rápido e Eficiente</h4>
                  <p>Email enviado instantaneamente</p>
                </div>
              </div>
              <div className="security-item">
                <FaSyncAlt className="security-icon" />
                <div>
                  <h4>Redefinição Simples</h4>
                  <p>Siga os passos no email recebido</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Card de Recuperação */}
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.button 
            onClick={handleBackToLogin}
            className="back-button"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft className="back-icon" />
            Voltar para login
          </motion.button>

          <div className="auth-logo">
            <motion.img 
              src={Logo} 
              alt="Emannuel Dev" 
              className="logo-image"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.h1 
              className="logo-text"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Emannuel Dev
            </motion.h1>
          </div>

          <motion.div 
            className="auth-header"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="password-icon">
              <FiLock />
            </div>
            <h2>Recuperar Senha</h2>
            <p>Digite seu email para receber instruções de redefinição</p>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                className="auth-message error"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <FiAlertTriangle className="message-icon" />
                {error}
              </motion.div>
            )}

            {message && (
              <motion.div
                className="auth-message success"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <FiCheckCircle className="message-icon" />
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form 
            onSubmit={handleSubmit}
            className="auth-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="form-group">
              <label htmlFor="email">
                <FiMail className="label-icon" />
                Email cadastrado
              </label>
              <div className="input-container">
                <FiMail className="input-icon" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  disabled={loading}
                  className={error ? 'error' : ''}
                />
              </div>
            </div>

            <motion.button 
              type="submit" 
              className="auth-button"
              disabled={loading || !!message}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="button-loading">
                  <div className="loading-spinner"></div>
                  Enviando...
                </div>
              ) : message ? (
                <>
                  <FiCheckCircle className="button-icon" />
                  Email Enviado
                </>
              ) : (
                <>
                  <FiSend className="button-icon" />
                  Enviar Instruções
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.div 
            className="instructions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h4>📋 O que esperar:</h4>
            <ul>
              <li>Email com link de redefinição</li>
              <li>Link válido por 1 hora</li>
              <li>Instruções passo a passo</li>
              <li>Suporte em caso de problemas</li>
            </ul>
          </motion.div>

          <motion.div 
            className="support-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p>
              Não recebeu o email?{' '}
              <button 
                type="button" 
                onClick={handleSubmit}
                disabled={loading}
                className="resend-link"
              >
                Reenviar instruções
              </button>
            </p>
            <p className="support-contact">
              Problemas? <a href="mailto:emannueldevfullstacksolutions@gmail.com">emannueldevfullstacksolutions@gmail.com</a>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}