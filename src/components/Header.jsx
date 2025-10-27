import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaTimes, 
  FaChevronDown, 
  FaUser, 
  FaSignInAlt, 
  FaSignOutAlt, 
  FaTachometerAlt,
  FaHome,
  FaDollarSign,
  FaInfoCircle,
  FaEnvelope,
  FaTools,
  FaRocket
} from 'react-icons/fa';
import { 
  FiUser, 
  FiSettings, 
  FiCreditCard, 
  FiHelpCircle,
  FiStar
} from 'react-icons/fi';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import './Header.css';

// Hook personalizado para detectar cliques fora do elemento
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// Componente de Avatar reutilizável
function UserAvatar({ user, userData, size = 'default' }) {
  const getInitials = useCallback(() => {
    if (userData?.name) {
      return userData.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    }
    return user?.email ? user.email.charAt(0).toUpperCase() : 'U';
  }, [userData, user]);

  const [imgError, setImgError] = useState(false);
  const avatarSizeClass = size === 'small' ? 'user-avatar-sm' : 'user-avatar';
  const placeholderSizeClass = size === 'small' ? 'user-avatar-placeholder-sm' : 'user-avatar-placeholder';

  if (userData?.photoURL && !imgError) {
    return (
      <img
        src={userData.photoURL}
        alt="Foto de perfil"
        className={avatarSizeClass}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className={placeholderSizeClass}>
      {getInitials()}
    </div>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  // Fechar menu de perfil ao clicar fora
  useClickOutside(profileMenuRef, () => {
    setProfileMenuOpen(false);
  });

  // Efeito de scroll otimizado
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Observar mudanças de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Fechar menus ao navegar
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: "/", name: "Home", icon: <FaHome size={16} /> },
    { path: "/servicos", name: "Serviços", icon: <FaTools size={16} /> },
    { path: "/precos", name: "Preços", icon: <FaDollarSign size={16} />, highlight: true },
    { path: "/sobre", name: "Sobre", icon: <FaInfoCircle size={16} /> },
    { path: "/contato", name: "Contato", icon: <FaEnvelope size={16} /> }
  ];

  const profileMenuItems = [
    { path: "/perfil", name: "Meu Perfil", icon: <FiUser size={16} /> },

  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setProfileMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const getUserName = () => {
    return userData?.name || user?.email?.split('@')[0] || 'Usuário';
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo com efeito melhorado */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="logo-container"
        >
          <Link to="/" className="logo" onClick={closeMobileMenu} aria-label="Página inicial">
            <div className="logo-icon">
              <FiStar className="logo-icon-star" />
            </div>
            <div className="logo-text-container">
              <span className="logo-text">Emannuel</span>
              <span className="logo-dev">Dev</span>
            </div>
            <div className="logo-highlight" />
          </Link>
        </motion.div>

        {/* Menu Desktop com animações melhoradas */}
        <nav className="nav-desktop">
          <ul>
            {navItems.map((item) => (
              <motion.li
                key={item.path}
                whileHover={{ y: -2 }}
                className={`nav-item ${item.highlight ? 'highlight' : ''}`}
              >
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.name}</span>
                  {item.highlight && (
                    <motion.span 
                      className="highlight-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      Novo
                    </motion.span>
                  )}
                  {location.pathname === item.path && (
                    <motion.div 
                      className="nav-indicator"
                      layoutId="nav-indicator"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Área de usuário Desktop */}
        <div className="header-actions">
          <div className="user-area">
            {user ? (
              <motion.div
                className="user-profile-container"
                whileHover={{ scale: 1.02 }}
                ref={profileMenuRef}
              >
                <motion.button
                  className="user-profile-btn"
                  onClick={toggleProfileMenu}
                  aria-label="Menu do usuário"
                  aria-expanded={profileMenuOpen}
                  aria-haspopup="true"
                  whileTap={{ scale: 0.98 }}
                >
                  <UserAvatar user={user} userData={userData} />
                  <span className="user-name">
                    {getUserName()}
                  </span>
                  <motion.span
                    animate={{ rotate: profileMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaChevronDown className="profile-chevron" />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {profileMenuOpen && (
                    <motion.div
                      className="profile-menu"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <div className="profile-menu-header">
                        <UserAvatar user={user} userData={userData} size="small" />
                        <div className="profile-menu-info">
                          <h4>{getUserName()}</h4>
                          <p>{user.email}</p>
                        </div>
                      </div>

                      <div className="profile-menu-items">
                        {profileMenuItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="profile-menu-item"
                            onClick={() => setProfileMenuOpen(false)}
                            role="menuitem"
                          >
                            <span className="menu-item-icon">{item.icon}</span>
                            <span>{item.name}</span>
                          </Link>
                        ))}
                        
                        <div className="profile-menu-divider" />
                        
                        <button
                          className="profile-menu-item logout-btn"
                          onClick={handleLogout}
                          role="menuitem"
                        >
                          <span className="menu-item-icon"><FaSignOutAlt size={16} /></span>
                          <span>Sair</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="auth-buttons">
                <motion.div
                  className="login-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/login" className="login-link">
                    <FaSignInAlt />
                    <span>Entrar</span>
                  </Link>
                </motion.div>
                <motion.div
                  className="register-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/registro" className="register-link">
                    <FaUser />
                    <span>Cadastrar</span>
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Menu Mobile com animações melhoradas */}
        <motion.button
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaTimes className="toggle-icon" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaBars className="toggle-icon" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Overlay e Menu Mobile */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                className="menu-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMobileMenu}
                aria-hidden="true"
              />

              <motion.nav
                className="nav-mobile"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                aria-label="Menu mobile"
                id="mobile-navigation"
              >
                <div className="mobile-header">
                  <div className="mobile-logo-container">
                    <Link to="/" className="mobile-logo" onClick={closeMobileMenu}>
                      <span className="logo-text">Emannuel</span>
                      <span className="logo-dev">Dev</span>
                    </Link>
                  </div>
                  <button
                    className="mobile-close-btn"
                    onClick={closeMobileMenu}
                    aria-label="Fechar menu"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="mobile-user-area">
                  {user ? (
                    <div className="mobile-user-profile">
                      <UserAvatar user={user} userData={userData} />
                      <div className="mobile-user-info">
                        <div className="mobile-user-name">
                          {getUserName()}
                        </div>
                        <div className="mobile-user-email">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mobile-auth-buttons">
                      <Link
                        to="/login"
                        className="mobile-login-button"
                        onClick={closeMobileMenu}
                      >
                        <FaSignInAlt />
                        <span>Entrar</span>
                      </Link>
                      <Link
                        to="/registro"
                        className="mobile-register-button"
                        onClick={closeMobileMenu}
                      >
                        <FaUser />
                        <span>Cadastrar</span>
                      </Link>
                    </div>
                  )}
                </div>

                <ul className="mobile-nav-list">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                    >
                      <Link
                        to={item.path}
                        className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                        onClick={closeMobileMenu}
                        aria-current={location.pathname === item.path ? 'page' : undefined}
                      >
                        <span className="mobile-nav-icon">{item.icon}</span>
                        <span className="mobile-nav-text">{item.name}</span>
                        {item.highlight && <span className="mobile-highlight-badge">Novo</span>}
                        {location.pathname === item.path && (
                          <motion.div 
                            className="mobile-nav-indicator"
                            layoutId="mobile-nav-indicator"
                          />
                        )}
                      </Link>
                    </motion.li>
                  ))}

                  {/* Menu do usuário mobile */}
                  {user && (
                    <>
                      <div className="mobile-menu-divider" />
                      <div className="mobile-menu-section">Minha Conta</div>
                      
                      {profileMenuItems.map((item, index) => (
                        <motion.li
                          key={item.path}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (navItems.length + index) * 0.05 + 0.2 }}
                        >
                          <Link
                            to={item.path}
                            className="mobile-nav-link"
                            onClick={closeMobileMenu}
                          >
                            <span className="mobile-nav-icon">{item.icon}</span>
                            <span className="mobile-nav-text">{item.name}</span>
                          </Link>
                        </motion.li>
                      ))}
                      
                      <motion.li
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (navItems.length + profileMenuItems.length) * 0.05 + 0.2 }}
                      >
                        <button
                          className="mobile-nav-link logout-btn-mobile"
                          onClick={handleLogout}
                        >
                          <span className="mobile-nav-icon"><FaSignOutAlt /></span>
                          <span className="mobile-nav-text">Sair</span>
                        </button>
                      </motion.li>
                    </>
                  )}
                </ul>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}