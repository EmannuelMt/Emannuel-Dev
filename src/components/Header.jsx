import { FaWhatsapp, FaBars, FaTimes, FaChevronDown, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Efeito de scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Observar mudanças de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Buscar dados do usuário no Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fechar menu ao navegar
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveSubmenu(null);
    setProfileMenuOpen(false);
  }, [location]);

  const navItems = [
    {
      path: "/",
      name: "Home"
    },
    {
      path: "/servicos",
      name: "Serviços",
    },
    {
      path: "/precos",
      name: "Preços",
      highlight: true
    },
    {
      path: "/sobre",
      name: "Sobre"
    },
    {
      path: "/contato",
      name: "Contato"
    }
  ];

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

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
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="header-container">
        {/* Logo com animação */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="logo-container"
        >
          <Link to="/" className="logo">
            <span className="logo-text">Emannuel </span>
            <span className="logo-dev">Dev</span>
            <div className="logo-highlight" />
          </Link>
        </motion.div>

        {/* Menu Desktop */}
        <nav className="nav-desktop">
          <ul>
            {navItems.map((item, index) => (
              <motion.li
                key={item.path}
                whileHover={{ scale: 1.05 }}
                className={`nav-item ${item.highlight ? 'highlight' : ''}`}
              >
                {item.submenu ? (
                  <div
                    className="nav-link submenu-trigger"
                    onClick={() => toggleSubmenu(index)}
                  >
                    {item.name}
                    <FaChevronDown className={`submenu-icon ${activeSubmenu === index ? 'open' : ''}`} />

                    <AnimatePresence>
                      {activeSubmenu === index && (
                        <motion.ul
                          className="submenu"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.submenu.map(subItem => (
                            <motion.li
                              key={subItem.path}
                              whileHover={{ x: 5 }}
                            >
                              <Link
                                to={subItem.path}
                                className="submenu-link"
                              >
                                {subItem.name}
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    {item.name}
                    {item.highlight && <span className="highlight-badge">Novo</span>}
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Área de usuário Desktop */}
        <div className="user-area">
          {user ? (
            <motion.div
              className="user-profile-container"
              whileHover={{ scale: 1.05 }}
            >
              <button
                className="user-profile-btn"
                onClick={toggleProfileMenu}
                aria-label="Menu do usuário"
              >
                {userData?.photoURL ? (
                  <img
                    src={userData.photoURL}
                    alt="Foto de perfil"
                    className="user-avatar"
                  />
                ) : (
                  <div className="user-avatar-placeholder">
                    {userData?.name ? userData.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="user-name">
                  {userData?.name || user.email.split('@')[0]}
                </span>
                <FaChevronDown className={`profile-chevron ${profileMenuOpen ? 'open' : ''}`} />
              </button>

              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    className="profile-menu"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="profile-menu-header">
                      {userData?.photoURL ? (
                        <img
                          src={userData.photoURL}
                          alt="Foto de perfil"
                          className="profile-menu-avatar"
                        />
                      ) : (
                        <div className="profile-menu-avatar-placeholder">
                          {userData?.name ? userData.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="profile-menu-info">
                        <h4>{userData?.name || 'Usuário'}</h4>
                        <p>{user.email}</p>
                      </div>
                    </div>

                    <div className="profile-menu-items">
                      <Link
                        to="/perfil"
                        className="profile-menu-item"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <FaUser className="menu-item-icon" />
                        Meu Perfil
                      </Link>

                      <Link
                        to="/dashboard"
                        className="profile-menu-item"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <FaUser className="menu-item-icon" />
                        Dashboard
                      </Link>

                      <button
                        className="profile-menu-item logout-btn"
                        onClick={handleLogout}
                      >
                        <FaSignOutAlt className="menu-item-icon" />
                        Sair
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Botão WhatsApp Desktop */}
        <motion.a
          href="https://wa.me/5562984317595?text=Olá%20Emannuel%20Dev!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços."
          className="whatsapp-button desktop"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaWhatsapp className="whatsapp-icon" />
          <span>Fale Conosco</span>
        </motion.a>

        {/* Menu Mobile */}
        <button
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <FaTimes className="toggle-icon" />
          ) : (
            <FaBars className="toggle-icon" />
          )}
        </button>

        {/* Overlay e Menu Mobile */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                className="menu-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />

              <motion.nav
                className="nav-mobile"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="mobile-user-area">
                  {user ? (
                    <div className="mobile-user-profile">
                      {userData?.photoURL ? (
                        <img
                          src={userData.photoURL}
                          alt="Foto de perfil"
                          className="mobile-user-avatar"
                        />
                      ) : (
                        <div className="mobile-user-avatar-placeholder">
                          {userData?.name ? userData.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="mobile-user-info">
                        <div className="mobile-user-name">
                          {userData?.name || user.email.split('@')[0]}
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
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FaSignInAlt />
                        Entrar
                      </Link>
                      <Link
                        to="/registro"
                        className="mobile-register-button"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FaUser />
                        Cadastrar
                      </Link>
                    </div>
                  )}
                </div>

                <ul>
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                    >
                      {item.submenu ? (
                        <>
                          <div
                            className="mobile-nav-link"
                            onClick={() => toggleSubmenu(index)}
                          >
                            {item.name}
                            <FaChevronDown className={`mobile-submenu-icon ${activeSubmenu === index ? 'open' : ''}`} />
                          </div>

                          <AnimatePresence>
                            {activeSubmenu === index && (
                              <motion.ul
                                className="mobile-submenu"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.submenu.map(subItem => (
                                  <motion.li
                                    key={subItem.path}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                  >
                                    <Link
                                      to={subItem.path}
                                      className="mobile-submenu-link"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {subItem.name}
                                    </Link>
                                  </motion.li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          to={item.path}
                          className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.li>
                  ))}

                  {/* Menu do usuário mobile */}
                  {user && (
                    <>
                      <li>
                        <Link
                          to="/perfil"
                          className="mobile-nav-link"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <FaUser className="mobile-nav-icon" />
                          Meu Perfil
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard"
                          className="mobile-nav-link"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <FaUser className="mobile-nav-icon" />
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          className="mobile-nav-link logout-btn-mobile"
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt className="mobile-nav-icon" />
                          Sair
                        </button>
                      </li>
                    </>
                  )}
                </ul>

                <motion.a
                  href="https://wa.me/5562984317595?text=Olá%20Emannuel%20Dev!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços."
                  className="whatsapp-button mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05 + 0.3 }}
                >
                  <FaWhatsapp className="whatsapp-icon" />
                  <span>Fale no WhatsApp</span>
                </motion.a>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}