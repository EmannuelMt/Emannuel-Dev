import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification,
  AuthErrorCodes
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaGithub,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationTriangle,
  FaRocket,
  FaPalette,
  FaShieldAlt,
  FaSignInAlt,
  FaUserPlus,
  FaKey,
  FaUser,
  FaSpinner,
  FaTimes,
  FaRegPaperPlane
} from 'react-icons/fa';
import {
  FiMail,
  FiLock,
  FiUser,
  FiArrowLeft,
  FiCheckCircle,
  FiAlertTriangle,
  FiArrowRight,
  FiHelpCircle
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './AIDrawing_250911_d80e2d99-024a-4ae2-bd8e-9c4422800165_0_MiriCanvas.png';
import './auth.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [securityTipIndex, setSecurityTipIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const securityTips = [
    "Use senhas fortes com combinações de letras, números e símbolos",
    "Ative a autenticação de dois fatores para maior segurança",
    "Nunca compartilhe suas credenciais de login com ninguém",
    "Verifique sempre o URL do site antes de inserir suas informações",
    "Mantenha seu navegador e sistema operacional atualizados"
  ];

  // Carregar dados salvos do localStorage ao inicializar
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }

    // Rotacionar dicas de segurança
    const tipInterval = setInterval(() => {
      setSecurityTipIndex(prev => (prev + 1) % securityTips.length);
    }, 5000);

    return () => clearInterval(tipInterval);
  }, []);

  // Verificar se há mensagem de redirecionamento
  useEffect(() => {
    if (location.state?.message) {
      setMessage({ text: location.state.message, type: 'success' });
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro específico do campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    if (message.text) {
      setMessage({ text: '', type: '' });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Salvar email se "Lembrar-me" estiver marcado
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // Verificar se o email foi confirmado
      if (!userCredential.user.emailVerified) {
        setMessage({ 
          text: 'Por favor, verifique seu email antes de fazer login. Um novo email de verificação foi enviado.', 
          type: 'warning' 
        });
        await sendEmailVerification(userCredential.user);
        setLoading(false);
        return;
      }

      // Atualizar informações do usuário no Firestore
      const userRef = doc(db, 'users', userCredential.user.uid);
      const userDoc = await getDoc(userRef);

      const userData = {
        lastLogin: serverTimestamp(),
        loginCount: (userDoc.data()?.loginCount || 0) + 1,
        emailVerified: userCredential.user.emailVerified
      };

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: userCredential.user.displayName || formData.email.split('@')[0],
          photoURL: userCredential.user.photoURL || '',
          provider: 'email',
          emailVerified: userCredential.user.emailVerified,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          loginCount: 1
        });
      } else {
        await updateDoc(userRef, userData);
      }

      setMessage({ 
        text: 'Login realizado com sucesso! Redirecionando...', 
        type: 'success' 
      });
      
      // Registrar tentativa de login bem-sucedida
      await setDoc(doc(db, 'loginAttempts', `${userCredential.user.uid}_${Date.now()}`), {
        uid: userCredential.user.uid,
        email: formData.email,
        success: true,
        timestamp: serverTimestamp(),
        ip: await getClientIP()
      });

      setTimeout(() => navigate('/dashboard', { 
        replace: true,
        state: { message: 'Login realizado com sucesso!' }
      }), 1500);

    } catch (error) {
      console.error('Erro no login:', error);
      
      // Registrar tentativa de login malsucedida
      if (auth.currentUser) {
        await setDoc(doc(db, 'loginAttempts', `${auth.currentUser.uid}_${Date.now()}`), {
          uid: auth.currentUser.uid,
          email: formData.email,
          success: false,
          errorCode: error.code,
          timestamp: serverTimestamp(),
          ip: await getClientIP()
        });
      }
      
      handleLoginError(error);
    } finally {
      setLoading(false);
    }
  };

  const getClientIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  };

  const handleLoginError = (error) => {
    switch (error.code) {
      case AuthErrorCodes.USER_DELETED:
        setErrors({ email: 'Usuário não encontrado' });
        break;
      case AuthErrorCodes.INVALID_PASSWORD:
        setErrors({ password: 'Senha incorreta' });
        break;
      case AuthErrorCodes.INVALID_EMAIL:
        setErrors({ email: 'Email inválido' });
        break;
      case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
        setMessage({ 
          text: 'Muitas tentativas de login. Sua conta foi temporariamente bloqueada por segurança. Tente novamente mais tarde ou redefina sua senha.', 
          type: 'error' 
        });
        break;
      case AuthErrorCodes.USER_DISABLED:
        setMessage({ 
          text: 'Esta conta foi desativada. Entre em contato com o suporte para mais informações.', 
          type: 'error' 
        });
        break;
      case AuthErrorCodes.NETWORK_REQUEST_FAILED:
        setMessage({ 
          text: 'Erro de conexão. Verifique sua internet e tente novamente.', 
          type: 'error' 
        });
        break;
      default:
        setMessage({ 
          text: 'Erro ao fazer login. Verifique suas credenciais e tente novamente.', 
          type: 'error' 
        });
    }
  };

  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);
    setMessage({ text: '', type: '' });

    try {
      let result;
      if (provider === 'google') {
        result = await signInWithPopup(auth, googleProvider);
      } else {
        result = await signInWithPopup(auth, githubProvider);
      }

      const userRef = doc(db, 'users', result.user.uid);
      const userDoc = await getDoc(userRef);

      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName || result.user.email.split('@')[0],
        photoURL: result.user.photoURL || '',
        provider: provider,
        emailVerified: result.user.emailVerified,
        lastLogin: serverTimestamp(),
        loginCount: (userDoc.data()?.loginCount || 0) + 1
      };

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          ...userData,
          createdAt: serverTimestamp()
        });
      } else {
        await updateDoc(userRef, userData);
      }

      // Registrar tentativa de login
      await setDoc(doc(db, 'loginAttempts', `${result.user.uid}_${Date.now()}`), {
        uid: result.user.uid,
        email: result.user.email,
        success: true,
        provider: provider,
        timestamp: serverTimestamp(),
        ip: await getClientIP()
      });

      setMessage({ 
        text: `Login com ${provider === 'google' ? 'Google' : 'GitHub'} realizado com sucesso!`, 
        type: 'success' 
      });
      
      setTimeout(() => navigate('/dashboard', { 
        replace: true,
        state: { message: 'Login realizado com sucesso!' }
      }), 1500);

    } catch (error) {
      console.error(`Erro no login com ${provider}:`, error);
      
      if (error.code === AuthErrorCodes.EXPIRED_POPUP_REQUEST) {
        setMessage({ 
          text: 'A janela de login foi fechada. Tente novamente.', 
          type: 'warning' 
        });
      } else if (error.code === AuthErrorCodes.POPUP_CLOSED_BY_USER) {
        setMessage({ 
          text: 'Login cancelado.', 
          type: 'info' 
        });
      } else {
        setMessage({ 
          text: `Erro ao fazer login com ${provider === 'google' ? 'Google' : 'GitHub'}.`, 
          type: 'error' 
        });
      }
    } finally {
      setSocialLoading(null);
    }
  };

  const handlePasswordReset = async (email) => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage({ 
        text: 'Por favor, insira um email válido.', 
        type: 'error' 
      });
      return;
    }

    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage({ 
        text: 'Email de redefinição de senha enviado! Verifique sua caixa de entrada e pasta de spam.', 
        type: 'success' 
      });
      setShowResetModal(false);
      setResetEmail('');
    } catch (error) {
      console.error('Erro ao enviar email de redefinição:', error);
      if (error.code === AuthErrorCodes.USER_DELETED) {
        setMessage({ 
          text: 'Nenhuma conta encontrada com este email.', 
          type: 'error' 
        });
      } else {
        setMessage({ 
          text: 'Erro ao enviar email de redefinição. Tente novamente.', 
          type: 'error' 
        });
      }
    } finally {
      setResetLoading(false);
    }
  };

  const openResetModal = () => {
    setResetEmail(formData.email);
    setShowResetModal(true);
    setMessage({ text: '', type: '' });
  };

  const closeResetModal = () => {
    setShowResetModal(false);
    setResetEmail('');
  };

  return (
    <div className="auth-container">
      {/* Background com animação */}
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
              Emannuel Dev
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              Soluções em desenvolvimento web e design
            </motion.p>

            <motion.div
              className="features-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.div 
                className="feature-card"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <FaRocket className="feature-icon" />
                <h4>Desenvolvimento Ágil</h4>
                <p>Soluções rápidas e eficientes</p>
              </motion.div>
              <motion.div 
                className="feature-card"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <FaPalette className="feature-icon" />
                <h4>Design Moderno</h4>
                <p>Interfaces intuitivas e bonitas</p>
              </motion.div>
              <motion.div 
                className="feature-card"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <FaShieldAlt className="feature-icon" />
                <h4>Segurança</h4>
                <p>Proteção de dados garantida</p>
              </motion.div>
            </motion.div>

            <motion.div 
              className="security-tips"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              <div className="tip-header">
                <FiHelpCircle className="tip-icon" />
                <span>Dica de Segurança</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={securityTipIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="tip-content"
                >
                  {securityTips[securityTipIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Card de Login */}
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
            <h2>Bem-vindo de volta!</h2>
            <p>Entre na sua conta para continuar</p>
          </motion.div>

          <AnimatePresence>
            {message.text && (
              <motion.div
                className={`auth-message ${message.type}`}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {message.type === 'success' || message.type === 'info' ? (
                  <FiCheckCircle className="message-icon" />
                ) : (
                  <FiAlertTriangle className="message-icon" />
                )}
                <span>{message.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form
            onSubmit={handleEmailLogin}
            className="auth-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="form-group">
              <label htmlFor="email">
                <FiMail className="label-icon" />
                Email
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
                  autoComplete="email"
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
                  placeholder="Sua senha"
                  className={errors.password ? 'error' : ''}
                  disabled={loading}
                  autoComplete="current-password"
                />
                <motion.button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  disabled={loading}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </motion.button>
              </div>
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

            <div className="form-options">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading} 
                />
                <span className="checkmark"></span>
                Lembrar-me
              </label>
              <motion.button
                type="button"
                className="forgot-password-btn"
                onClick={openResetModal}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaKey className="forgot-icon" />
                Esqueci a senha
              </motion.button>
            </div>

            <motion.button
              type="submit"
              className="auth-button primary"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="button-loading">
                  <FaSpinner className="spinner" />
                  Entrando...
                </div>
              ) : (
                <>
                  <FaSignInAlt className="button-icon" />
                  Entrar
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
            <span>Ou continue com</span>
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
              onClick={() => handleSocialLogin('google')}
              disabled={loading || socialLoading}
              whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(219, 68, 55, 0.3)" }}
              whileTap={{ y: 0 }}
            >
              {socialLoading === 'google' ? (
                <FaSpinner className="spinner" />
              ) : (
                <FaGoogle className="social-icon" />
              )}
              Google
            </motion.button>

            <motion.button
              type="button"
              className="social-button github"
              onClick={() => handleSocialLogin('github')}
              disabled={loading || socialLoading}
              whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(36, 41, 46, 0.3)" }}
              whileTap={{ y: 0 }}
            >
              {socialLoading === 'github' ? (
                <FaSpinner className="spinner" />
              ) : (
                <FaGithub className="social-icon" />
              )}
              GitHub
            </motion.button>
          </motion.div>

          <motion.div
            className="auth-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p>
              Não tem uma conta?{' '}
              <Link to="/registro" className="auth-link">
                <FaUserPlus className="link-icon" />
                Cadastre-se agora
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modal de Recuperação de Senha */}
      <AnimatePresence>
        {showResetModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeResetModal}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Recuperar Senha</h3>
                <button className="modal-close" onClick={closeResetModal}>
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body">
                <p>Digite seu email para receber instruções de recuperação de senha:</p>
                <div className="form-group">
                  <div className="input-container">
                    <FiMail className="input-icon" />
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="seu@email.com"
                      disabled={resetLoading}
                      autoFocus
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="auth-button secondary"
                  onClick={closeResetModal}
                  disabled={resetLoading}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="auth-button primary"
                  onClick={() => handlePasswordReset(resetEmail)}
                  disabled={resetLoading || !resetEmail}
                >
                  {resetLoading ? (
                    <div className="button-loading">
                      <FaSpinner className="spinner" />
                      Enviando...
                    </div>
                  ) : (
                    <>
                      <FaRegPaperPlane className="button-icon" />
                      Enviar Email
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}