import { FaWhatsapp, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  // Efeito de scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu ao navegar
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveSubmenu(null);
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
            <span className="logo-text">Emannuel</span>
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