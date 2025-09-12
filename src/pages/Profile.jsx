import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../config/firebase';
import { onAuthStateChanged, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaCamera, 
  FaSave, 
  FaTimes, 
  FaArrowLeft,
  FaEdit,
  FaCalendarAlt,
  FaShieldAlt,
  FaTrash,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import {
  FiUser,
  FiMail,
  FiLock,
  FiCamera,
  FiSave,
  FiX,
  FiArrowLeft,
  FiEdit,
  FiCalendar,
  FiShield,
  FiTrash2,
  FiCheckCircle,
  FiAlertTriangle,
  FiEye,
  FiEyeOff,
  FiSettings   // 👈 adiciona aqui
} from "react-icons/fi";

import { motion, AnimatePresence } from 'framer-motion';
import './Profile.css';
export default function Profile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  // Dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Observar autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await fetchUserData(user);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchUserData = async (user) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        setFormData(prev => ({
          ...prev,
          name: data.name || '',
          email: user.email
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setError('Erro ao carregar perfil');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione uma imagem válida');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter menos de 5MB');
      return;
    }

    setLoading(true);
    try {
      // Upload da nova imagem
      const storageRef = ref(storage, `profile-photos/${user.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      // Atualizar no Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        photoURL,
        updatedAt: new Date()
      });

      // Atualizar estado local
      setUserData(prev => ({ ...prev, photoURL }));
      setMessage('Foto de perfil atualizada com sucesso!');

    } catch (error) {
      console.error('Erro ao upload da imagem:', error);
      setError('Erro ao atualizar foto');
    } finally {
      setLoading(false);
    }
  };

  const removeProfilePhoto = async () => {
    if (!userData?.photoURL) return;

    setLoading(true);
    try {
      // Deletar imagem do storage
      const storageRef = ref(storage, `profile-photos/${user.uid}`);
      await deleteObject(storageRef);

      // Atualizar no Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        photoURL: null,
        updatedAt: new Date()
      });

      // Atualizar estado local
      setUserData(prev => ({ ...prev, photoURL: null }));
      setMessage('Foto de perfil removida com sucesso!');

    } catch (error) {
      console.error('Erro ao remover foto:', error);
      setError('Erro ao remover foto');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      // Atualizar nome no Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        updatedAt: new Date()
      });

      setUserData(prev => ({ ...prev, name: formData.name }));
      setMessage('Perfil atualizado com sucesso!');
      setEditing(false);

    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setError('Erro ao atualizar perfil');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    // Validações
    if (formData.newPassword !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setSaving(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres');
      setSaving(false);
      return;
    }

    try {
      // Reautenticar o usuário
      const credential = EmailAuthProvider.credential(user.email, formData.currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Atualizar senha
      await updatePassword(user, formData.newPassword);

      // Limpar formulário
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

      setMessage('Senha atualizada com sucesso!');
      setShowPasswords({ current: false, new: false, confirm: false });

    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      
      switch (error.code) {
        case 'auth/wrong-password':
          setError('Senha atual incorreta');
          break;
        case 'auth/weak-password':
          setError('A senha é muito fraca');
          break;
        default:
          setError('Erro ao atualizar senha');
      }
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Header */}
      <motion.header 
        className="profile-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="back-button">
          <FiArrowLeft />
          Voltar para Home
        </Link>
        
        <div className="header-title">
          <h1>Meu Perfil</h1>
          <p>Gerencie suas informações pessoais</p>
        </div>
      </motion.header>

      <div className="profile-container">
        {/* Sidebar */}
        <motion.aside 
          className="profile-sidebar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="sidebar-header">
            <div className="profile-avatar-section">
              <div className="avatar-container">
                {userData?.photoURL ? (
                  <img src={userData.photoURL} alt="Foto de perfil" className="profile-avatar" />
                ) : (
                  <div className="avatar-placeholder">
                    {userData?.name ? userData.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </div>
                )}
                <label htmlFor="avatar-upload" className="avatar-upload-btn">
                  <FiCamera />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={loading}
                  />
                </label>
              </div>
              
              <div className="profile-info">
                <h2>{userData?.name || 'Usuário'}</h2>
                <p>{user.email}</p>
                {userData?.createdAt && (
                  <span className="member-since">
                    <FiCalendar />
                    Membro desde {userData.createdAt.toDate().toLocaleDateString('pt-BR')}
                  </span>
                )}
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FiUser />
              Informações Pessoais
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <FiShield />
              Segurança
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              <FiSettings />
              Preferências
            </button>
          </nav>
        </motion.aside>

        {/* Conteúdo Principal */}
        <motion.main 
          className="profile-content"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="tab-content"
              >
                <div className="tab-header">
                  <h2>Informações Pessoais</h2>
                  {!editing ? (
                    <button 
                      className="edit-btn"
                      onClick={() => setEditing(true)}
                    >
                      <FiEdit />
                      Editar
                    </button>
                  ) : (
                    <button 
                      className="cancel-btn"
                      onClick={() => setEditing(false)}
                    >
                      <FiX />
                      Cancelar
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {message && (
                    <motion.div
                      className="alert alert-success"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <FiCheckCircle />
                      {message}
                    </motion.div>
                  )}
                  
                  {error && (
                    <motion.div
                      className="alert alert-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <FiAlertTriangle />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleProfileUpdate} className="profile-form">
                  <div className="form-group">
                    <label>
                      <FiUser />
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!editing || saving}
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FiMail />
                      Email
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="disabled"
                    />
                    <small>O email não pode ser alterado</small>
                  </div>

                  {editing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="form-actions"
                    >
                      <button 
                        type="submit" 
                        disabled={saving}
                        className="save-btn"
                      >
                        {saving ? (
                          <div className="loading-spinner"></div>
                        ) : (
                          <FiSave />
                        )}
                        {saving ? 'Salvando...' : 'Salvar Alterações'}
                      </button>
                    </motion.div>
                  )}
                </form>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="tab-content"
              >
                <div className="tab-header">
                  <h2>Segurança da Conta</h2>
                </div>

                <AnimatePresence>
                  {message && (
                    <motion.div
                      className="alert alert-success"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <FiCheckCircle />
                      {message}
                    </motion.div>
                  )}
                  
                  {error && (
                    <motion.div
                      className="alert alert-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <FiAlertTriangle />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handlePasswordUpdate} className="security-form">
                  <div className="form-group">
                    <label>
                      <FiLock />
                      Senha Atual
                    </label>
                    <div className="password-input">
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        disabled={saving}
                        placeholder="Digite sua senha atual"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="password-toggle"
                      >
                        {showPasswords.current ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      <FiLock />
                      Nova Senha
                    </label>
                    <div className="password-input">
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        disabled={saving}
                        placeholder="Digite a nova senha"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="password-toggle"
                      >
                        {showPasswords.new ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      <FiLock />
                      Confirmar Nova Senha
                    </label>
                    <div className="password-input">
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        disabled={saving}
                        placeholder="Confirme a nova senha"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="password-toggle"
                      >
                        {showPasswords.confirm ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      type="submit" 
                      disabled={saving}
                      className="save-btn"
                    >
                      {saving ? (
                        <div className="loading-spinner"></div>
                      ) : (
                        <FiSave />
                      )}
                      {saving ? 'Atualizando...' : 'Atualizar Senha'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeTab === 'preferences' && (
              <motion.div
                key="preferences"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="tab-content"
              >
                <div className="tab-header">
                  <h2>Preferências</h2>
                </div>
                
                <div className="preferences-list">
                  <div className="preference-item">
                    <h3>Notificações por Email</h3>
                    <p>Receber atualizações e novidades</p>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="preference-item">
                    <h3>Modo Escuro</h3>
                    <p>Interface com tema escuro</p>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="preference-item">
                    <h3>Idioma</h3>
                    <p>Português (Brasil)</p>
                    <select className="language-select">
                      <option value="pt-BR">Português (BR)</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>
    </div>
  );
}