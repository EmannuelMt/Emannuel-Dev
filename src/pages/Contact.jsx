import { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaGithub, FaInstagram, FaPaperPlane, FaUser, FaPhone, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!formData.projectType) newErrors.projectType = 'Selecione um tipo de projeto';
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Mensagem deve ter pelo menos 20 caracteres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Envia para o FormSubmit.co
      const emailResponse = await fetch('https://formsubmit.co/ajax/emannuelmatosdeoliveira@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          message: formData.message,
          _subject: 'Novo contato do site - ' + formData.projectType,
          _template: 'table' // Formato organizado em tabela
        })
      });

      const result = await emailResponse.json();
      
      if (result.success) {
        // Prepara mensagem para WhatsApp
        const whatsappMessage = `Olá Emannuel, tenho interesse em um projeto!%0A%0A` +
          `*Nome:* ${formData.name}%0A` +
          `*E-mail:* ${formData.email}%0A` +
          `*Telefone:* ${formData.phone || 'Não informado'}%0A` +
          `*Tipo de Projeto:* ${formData.projectType}%0A` +
          `*Mensagem:* ${formData.message}`;

        // Abre WhatsApp em nova aba
        window.open(`https://wa.me/5562984317595?text=${whatsappMessage}`, '_blank');

        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          message: ''
        });

        // Limpa o sucesso após 5 segundos
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        throw new Error('Falha no envio do formulário');
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">Vamos trabalhar juntos!</h1>
            <p className="hero-subtitle">
              Entre em contato para discutir seu projeto ou tirar qualquer dúvida
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <motion.div 
            className="contact-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Form */}
            <motion.div 
              className="contact-form"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h2>
                <FaPaperPlane className="section-icon" /> Envie uma mensagem
              </h2>
              
              {submitSuccess && (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Mensagem enviada com sucesso! Em breve entrarei em contato.
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">
                    <FaUser className="input-icon" /> Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope className="input-icon" /> E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <FaPhone className="input-icon" /> Telefone (opcional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="project-type">Tipo de Projeto</label>
                  <select
                    id="project-type"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className={errors.projectType ? 'error' : ''}
                  >
                    <option value="">Selecione...</option>
                    <option value="Site Simples">Site Simples</option>
                    <option value="Site Completo">Site Completo</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Bot Discord">Bot Discord</option>
                    <option value="Outro">Outro</option>
                  </select>
                  {errors.projectType && <span className="error-message">{errors.projectType}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensagem</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <motion.button
                  type="submit"
                  className="submit-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="spinner" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar Mensagem'
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <div className="contact-info">
              <h2>
                <FaWhatsapp className="section-icon" /> Informações de Contato
              </h2>
              
              <div className="contact-methods">
                <motion.div 
                  className="contact-method"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="contact-icon-container">
                    <FaWhatsapp className="contact-icon" />
                  </div>
                  <div>
                    <h3>WhatsApp</h3>
                    <a hhref="https://wa.me/5562984317595?text=Olá%20Emannuel%20Dev!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços."  target="_blank" rel="noopener noreferrer">
                      (62) 98431-7595
                    </a>
                    <p>Resposta rápida em horário comercial</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="contact-method"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="contact-icon-container">
                    <FaEnvelope className="contact-icon" />
                  </div>
                  <div>
                    <h3>E-mail</h3>
                    <a href="mailto:emannuelmatosdeoliveira@gmail.com">
                      emannuelmatosdeoliveira@gmail.com
                    </a>
                    <p>Resposta em até 24 horas</p>
                  </div>
                </motion.div>

                <div className="social-section">
                  <h3>Redes Sociais</h3>
                  <div className="social-links">
                    <motion.a
                      href="https://www.instagram.com/emannuel_mt/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      whileHover={{ y: -3 }}
                    >
                      <FaInstagram className="social-icon" />
                      <span>Instagram</span>
                    </motion.a>

                    <motion.a
                      href="https://github.com/EmannuelMt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      whileHover={{ y: -3 }}
                    >
                      <FaGithub className="social-icon" />
                      <span>GitHub</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}