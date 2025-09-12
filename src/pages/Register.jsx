import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaGoogle, 
  FaGithub, 
  FaEye, 
  FaEyeSlash,
  FaArrowLeft,
  FaCheck,
  FaRocket,
  FaPalette,
  FaShieldAlt,
  FaUserPlus,
  FaSignInAlt,
  FaStar
} from 'react-icons/fa';
import { 
  FiMail, 
  FiLock, 
  FiUser,
  FiArrowLeft,
  FiCheckCircle,
  FiAlertTriangle,
  FiAward
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './AIDrawing_250911_d80e2d99-024a-4ae2-bd8e-9c4422800165_0_MiriCanvas.png'; 
import './auth.css'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setMessage('');
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Senha deve conter letras maiúsculas, minúsculas e números';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Você deve aceitar os termos e condições';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setMessage('');
    
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.name
      });

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: formData.email,
        name: formData.name,
        photoURL: '',
        provider: 'email',
        newsletter: formData.newsletter,
        createdAt: new Date(),
        lastLogin: new Date(),
        emailVerified: false,
        profileComplete: false
      });

      setMessage('Conta criada com sucesso! Redirecionando...');
      setTimeout(() => navigate('/dashboard'), 1500);
      
    } catch (error) {
      console.error('Erro no cadastro:', error);
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrors({ email: 'Este email já está em uso' });
          break;
        case 'auth/invalid-email':
          setErrors({ email: 'Email inválido' });
          break;
        case 'auth/weak-password':
          setErrors({ password: 'Senha muito fraca' });
          break;
        default:
          setMessage('Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = async (provider) => {
    setLoading(true);
    setMessage('');
    
    try {
      let result;
      if (provider === 'google') {
        result = await signInWithPopup(auth, googleProvider);
      } else {
        result = await signInWithPopup(auth, githubProvider);
      }

      const userDoc = await doc(db, 'users', result.user.uid);
      
      await setDoc(userDoc, {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName || '',
        photoURL: result.user.photoURL || '',
        provider: provider,
        newsletter: true,
        createdAt: new Date(),
        lastLogin: new Date(),
        emailVerified: result.user.emailVerified,
        profileComplete: !!result.user.displayName
      }, { merge: true });

      setMessage(`Conta criada com ${provider} com sucesso!`);
      setTimeout(() => navigate('/dashboard'), 1000);
      
    } catch (error) {
      console.error(`Erro no cadastro com ${provider}:`, error);
      setMessage(`Erro ao criar conta com ${provider}.`);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    if (!formData.password) return { strength: 0, label: '' };
    
    let strength = 0;
    if (formData.password.length >= 6) strength++;
    if (/(?=.*[a-z])/.test(formData.password)) strength++;
    if (/(?=.*[A-Z])/.test(formData.password)) strength++;
    if (/(?=.*\d)/.test(formData.password)) strength++;
    if (/(?=.*[!@#$%^&*])/.test(formData.password)) strength++;

    const labels = ['Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte'];
    return { strength, label: labels[strength - 1] || '' };
  };

  const strength = passwordStrength();

  return (
    <div className="auth-container">
      {/* Background */}
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
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Junte-se à Nossa Comunidade
            </motion.h2>
            
            <motion.div 
              className="benefits-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="benefit-card">
                <FiAward className="benefit-icon" />
                <h4>Projetos de Qualidade</h4>
                <p>Desenvolvimento com excelência</p>
              </div>
              <div className="benefit-card">
                <FaStar className="benefit-icon" />
                <h4>Suporte Premium</h4>
                <p>Atendimento personalizado</p>
              </div>
              <div className="benefit-card">
                <FaRocket className="benefit-icon" />
                <h4>Inovação Constante</h4>
                <p>Tecnologias modernas</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Card de Cadastro */}
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
          <Link to="/" className="back-button">
            <FiArrowLeft className="back-icon" />
            Voltar para home
          </Link>

          <div className="auth-logo">
            <motion.img 
              src={Logo} 
              alt="Emannuel Dev" 
              className="logo-image"
              whileHover={{ scale: 1.05, rotate: 2 }}
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
            <h2>Crie sua conta</h2>
            <p>Junte-se à nossa comunidade de desenvolvimento</p>
          </motion.div>

          <AnimatePresence>
            {message && (
              <motion.div
                className={`auth-message ${message.includes('sucesso') ? 'success' : 'error'}`}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {message.includes('sucesso') ? (
                  <FiCheckCircle className="message-icon" />
                ) : (
                  <FiAlertTriangle className="message-icon" />
                )}
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form 
            onSubmit={handleEmailRegister} 
            className="auth-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="form-group">
              <label htmlFor="name">
                <FiUser className="label-icon" />
                Nome completo
              </label>
              <div className="input-container">
                <FiUser className="input-icon" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  className={errors.name ? 'error' : ''}
                  disabled={loading}
                />
              </div>
              {errors.name && (
                <motion.span 
                  className="error-message"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiAlertTriangle className="error-icon" />
                  {errors.name}
                </motion.span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <FiMail className="label-icon" />
                Email profissional
              </label>
              <div className="input-container">
                <FiMail className="input-icon" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className={errors.email ? 'error' : ''}
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <motion.span 
                  className="error-message"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiAlertTriangle className="error-icon" />
                  {errors.email}
                </motion.span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <FiLock className="label-icon" />
                Senha
              </label>
              <div className="input-container">
                <FiLock className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Crie uma senha segura"
                  className={errors.password ? 'error' : ''}
                  disabled={loading}
                />
                <motion.button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('password')}
                  disabled={loading}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </motion.button>
              </div>
              {formData.password && (
                <div className="password-strength">
                  <div className={`strength-bar strength-${strength.strength}`}>
                    <div className="strength-fill"></div>
                  </div>
                  <span className="strength-label">
                    <FiAlertTriangle className="strength-icon" />
                    {strength.label}
                  </span>
                </div>
              )}
              {errors.password && (
                <motion.span 
                  className="error-message"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiAlertTriangle className="error-icon" />
                  {errors.password}
                </motion.span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                <FiLock className="label-icon" />
                Confirmar senha
              </label>
              <div className="input-container">
                <FiLock className="input-icon" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirme sua senha"
                  className={errors.confirmPassword ? 'error' : ''}
                  disabled={loading}
                />
                <motion.button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('confirm')}
                  disabled={loading}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </motion.button>
              </div>
              {errors.confirmPassword && (
                <motion.span 
                  className="error-message"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiAlertTriangle className="error-icon" />
                  {errors.confirmPassword}
                </motion.span>
              )}
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span className="checkmark">
                  {formData.acceptTerms && <FaCheck className="check-icon" />}
                </span>
                Aceito os <Link to="/termos" className="terms-link">termos e condições</Link>
              </label>
              {errors.acceptTerms && (
                <motion.span 
                  className="error-message"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiAlertTriangle className="error-icon" />
                  {errors.acceptTerms}
                </motion.span>
              )}
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span className="checkmark">
                  {formData.newsletter && <FaCheck className="check-icon" />}
                </span>
                Desejo receber novidades e updates por email
              </label>
            </div>

            <motion.button 
              type="submit" 
              className="auth-button"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="button-loading">
                  <div className="loading-spinner"></div>
                  Criando conta...
                </div>
              ) : (
                <>
                  <FaUserPlus className="button-icon" />
                  Criar conta
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.div 
            className="auth-divider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <span>Ou cadastre-se com</span>
          </motion.div>

          <motion.div 
            className="social-auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.button 
              type="button" 
              className="social-button google"
              onClick={() => handleSocialRegister('google')}
              disabled={loading}
              whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(219, 68, 55, 0.3)" }}
              whileTap={{ y: 0 }}
            >
              <FaGoogle className="social-icon" />
              Google
            </motion.button>
          </motion.div>

          <motion.div 
            className="auth-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p>
              Já tem uma conta?{' '}
              <Link to="/login" className="auth-link">
                <FaSignInAlt className="link-icon" />
                Fazer login
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}