import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
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
  FaKey
} from 'react-icons/fa';
import {
  FiMail,
  FiLock,
  FiUser,
  FiArrowLeft,
  FiCheckCircle,
  FiAlertTriangle
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './AIDrawing_250911_d80e2d99-024a-4ae2-bd8e-9c4422800165_0_MiriCanvas.png';
import './auth.css'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setMessage('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: userCredential.user.displayName || '',
          photoURL: userCredential.user.photoURL || '',
          createdAt: new Date(),
          lastLogin: new Date()
        });
      } else {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          lastLogin: new Date()
        }, { merge: true });
      }

      setMessage('Login realizado com sucesso!');
      setTimeout(() => navigate('/dashboard'), 1000);

    } catch (error) {
      console.error('Erro no login:', error);

      switch (error.code) {
        case 'auth/user-not-found':
          setErrors({ email: 'Usuário não encontrado' });
          break;
        case 'auth/wrong-password':
          setErrors({ password: 'Senha incorreta' });
          break;
        case 'auth/invalid-email':
          setErrors({ email: 'Email inválido' });
          break;
        case 'auth/too-many-requests':
          setMessage('Muitas tentativas. Tente novamente mais tarde.');
          break;
        default:
          setMessage('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setMessage('');

    try {
      let result;
      if (provider === 'google') {
        result = await signInWithPopup(auth, googleProvider);
      } else {
        result = await signInWithPopup(auth, githubProvider);
      }

      const userDoc = await getDoc(doc(db, 'users', result.user.uid));

      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', result.user.uid), {
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName || '',
          photoURL: result.user.photoURL || '',
          provider: provider,
          createdAt: new Date(),
          lastLogin: new Date()
        });
      } else {
        await setDoc(doc(db, 'users', result.user.uid), {
          lastLogin: new Date()
        }, { merge: true });
      }

      setMessage(`Login com ${provider} realizado com sucesso!`);
      setTimeout(() => navigate('/dashboard'), 1000);

    } catch (error) {
      console.error(`Erro no login com ${provider}:`, error);
      setMessage(`Erro ao fazer login com ${provider}.`);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!formData.email) {
      setErrors({ email: 'Digite seu email para redefinir a senha' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ email: 'Email inválido' });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, formData.email);
      setMessage('Email de redefinição de senha enviado!');
    } catch (error) {
      console.error('Erro ao enviar email de redefinição:', error);
      setMessage('Erro ao enviar email de redefinição.');
    }
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
              <div className="feature-card">
                <FaRocket className="feature-icon" />
                <h4>Desenvolvimento Ágil</h4>
                <p>Soluções rápidas e eficientes</p>
              </div>
              <div className="feature-card">
                <FaPalette className="feature-icon" />
                <h4>Design Moderno</h4>
                <p>Interfaces intuitivas e bonitas</p>
              </div>
              <div className="feature-card">
                <FaShieldAlt className="feature-icon" />
                <h4>Segurança</h4>
                <p>Proteção de dados garantida</p>
              </div>
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
                />
                <motion.button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  disabled={loading}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
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
                <input type="checkbox" disabled={loading} />
                <span className="checkmark"></span>
                Lembrar-me
              </label>
              <motion.button
                type="button"
                className="forgot-password-btn"
                onClick={handlePasswordReset}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/esqueci-senha" className="forgot-password-btn">
                  <FaKey className="forgot-icon" />
                  Esqueci a senha
                </Link>
              </motion.button>
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
              Não tem uma conta?{' '}
              <Link to="/registro" className="auth-link">
                <FaUserPlus className="link-icon" />
                Cadastre-se agora
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}