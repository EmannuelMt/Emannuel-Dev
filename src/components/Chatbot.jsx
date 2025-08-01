import { useState, useRef, useEffect } from 'react';
import { 
  FaRobot, 
  FaTimes, 
  FaPaperPlane, 
  FaWhatsapp, 
  FaEnvelope, 
  FaLinkedin, 
  FaHeadset,
  FaRedo
} from 'react-icons/fa';
import { IoMdHelp, IoMdMail } from 'react-icons/io';
import { BsQuestionCircleFill, BsFillChatDotsFill } from 'react-icons/bs';
import { HiOutlineSupport } from 'react-icons/hi';
import { RiLiveFill } from 'react-icons/ri';
import './Chatbot.css';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showSupportOptions, setShowSupportOptions] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatbotMessages');
    return savedMessages 
      ? JSON.parse(savedMessages) 
      : [{ 
          text: "👋 Olá! Sou o assistente virtual do site EmannuelDev. Posso te ajudar com informações sobre o Emannuel ou sobre este site. (Este é um chatbot de demonstração)", 
          sender: 'bot' 
        }];
  });
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatbotRef = useRef(null);

  const commonQuestions = [
    "Quem é Emannuel?",
    "Quais tecnologias ele domina?",
    "Como entrar em contato?",
    "Quais projetos ele já desenvolveu?",
    "Quais serviços ele oferece?"
  ];

  const supportOptions = [
    { icon: <FaWhatsapp />, label: "WhatsApp", action: "https://wa.me/SEUNUMERO" },
    { icon: <IoMdMail />, label: "Email", action: "mailto:seu@email.com" },
    { icon: <FaLinkedin />, label: "LinkedIn", action: "https://linkedin.com/in/seuprofile" }
  ];

  useEffect(() => {
    localStorage.setItem('chatbotMessages', JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, showSupportOptions]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
      
      // Mostra opções de suporte se mencionar "contato" ou "suporte"
      if (inputValue.toLowerCase().includes('contato') || 
          inputValue.toLowerCase().includes('suporte')) {
        setTimeout(() => setShowSupportOptions(true), 500);
      }
    }, 1500);
  };

  const generateBotResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('quem é') || lowerQuestion.includes('emannuel')) {
      return "🤖 Emannuel é um desenvolvedor web full-stack especializado em criar soluções digitais modernas e eficientes. Com experiência em diversas tecnologias, ele transforma ideias em realidade digital.";
    } 
    else if (lowerQuestion.includes('tecnolog') || lowerQuestion.includes('habilidad') || lowerQuestion.includes('skill')) {
      return "💻 Principais tecnologias: React, Node.js, JavaScript, TypeScript, HTML5, CSS3, Git e muito mais. Confira a seção 'Habilidades' para detalhes completos!";
    }
    else if (lowerQuestion.includes('contato') || lowerQuestion.includes('email') || lowerQuestion.includes('linkedin')) {
      return "📩 Você pode falar diretamente com o Emannuel através das opções de contato abaixo ou me perguntar mais sobre o trabalho dele!";
    }
    else if (lowerQuestion.includes('projeto') || lowerQuestion.includes('portfólio')) {
      return "🛠️ Confira os projetos desenvolvidos na seção 'Portfólio'. Cada projeto tem detalhes sobre tecnologias usadas e desafios superados!";
    }
    else if (lowerQuestion.includes('serviço') || lowerQuestion.includes('preço')) {
      return "💰 Os serviços incluem desenvolvimento web, aplicações customizadas e consultoria. Valores variam conforme o projeto - veja mais em 'Serviços'!";
    }
    else {
      return "🤔 Não entendi completamente. Posso ajudar com informações sobre:\n\n- Quem é Emannuel\n- Tecnologias que ele domina\n- Projetos realizados\n- Formas de contato\n- Serviços oferecidos\n\nTente reformular ou escolha uma opção abaixo!";
    }
  };

  const handleQuickQuestion = (question) => {
    setInputValue(question);
    inputRef.current.focus();
    
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        handleSendMessage();
      }, 300);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([{ 
      text: "🔄 Conversa reiniciada. Como posso te ajudar hoje?", 
      sender: 'bot' 
    }]);
    setShowSupportOptions(false);
  };

  const handleSupportClick = (url) => {
    window.open(url, '_blank');
    setMessages(prev => [...prev, { 
      text: `Você está sendo redirecionado para nosso ${url.includes('wa.me') ? 'WhatsApp' : url.includes('mailto') ? 'Email' : 'LinkedIn'}...`, 
      sender: 'bot' 
    }]);
    setShowSupportOptions(false);
  };

  const triggerSupportOptions = () => {
    setShowSupportOptions(true);
    setMessages(prev => [...prev, { 
      text: "Você pode entrar em contato diretamente com o suporte através destas opções:", 
      sender: 'bot' 
    }]);
  };

  return (
    <div 
      className={`chatbot-container ${isOpen ? 'open' : ''}`}
      ref={chatbotRef}
    >
      {!isOpen && (
        <button 
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir chatbot de ajuda"
        >
          <div className="chatbot-toggle-inner">
            <BsFillChatDotsFill className="chatbot-icon" />
            <span>Precisa de ajuda?</span>
          </div>
          <div className="chatbot-pulse"></div>
        </button>
      )}
      
      {isOpen && (
        <div className="chatbot-content">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <div className="chatbot-avatar">
                <FaRobot />
              </div>
              <div>
                <h3>Assistente Virtual</h3>
                <p>EmannuelDev</p>
              </div>
            </div>
            <div className="chatbot-actions">
              <button 
                onClick={triggerSupportOptions}
                className="chatbot-action-btn"
                aria-label="Falar com suporte"
                title="Falar com suporte"
              >
                <HiOutlineSupport />
              </button>
              <button 
                onClick={clearConversation}
                className="chatbot-action-btn"
                aria-label="Reiniciar conversa"
                title="Reiniciar conversa"
              >
                <FaRedo />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="chatbot-action-btn close"
                aria-label="Fechar chatbot"
              >
                <FaTimes />
              </button>
            </div>
          </div>
          
          <div className="chatbot-messages">
            <div className="chatbot-disclaimer">
              <p><IoMdHelp /> Este é um chatbot de demonstração para tirar dúvidas sobre o Emannuel ou este site.</p>
            </div>
            
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            {showSupportOptions && (
              <div className="support-options-container">
                <div className="support-options">
                  <div className="support-header">
                    <RiLiveFill className="live-icon" />
                    <h4>Contato Direto</h4>
                  </div>
                  <div className="support-grid">
                    {supportOptions.map((option, i) => (
                      <button
                        key={i}
                        className="support-option"
                        onClick={() => handleSupportClick(option.action)}
                      >
                        <span className="support-icon">{option.icon}</span>
                        <span className="support-label">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-quick-questions">
            <p><BsQuestionCircleFill /> Perguntas frequentes:</p>
            <div className="quick-questions-grid">
              {commonQuestions.map((q, i) => (
                <button 
                  key={i} 
                  onClick={() => handleQuickQuestion(q)}
                  className="quick-question-btn"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          
          <div className="chatbot-input">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua mensagem..."
              onKeyPress={handleKeyPress}
              rows="1"
            />
            <button 
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ''}
              className="send-btn"
              aria-label="Enviar mensagem"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}