import { useState, useEffect, useRef } from 'react';
import { auth, db, storage } from '../config/firebase';
import { 
  onAuthStateChanged, 
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject 
} from 'firebase/storage';
import { 
  FiUser, 
  FiLock, 
  FiSettings, 
  FiShoppingCart, 
  FiMessageSquare, 
  FiHeart,
  FiGlobe,
  FiEdit,
  FiEye,
  FiLogOut,
  FiX,
  FiCheck,
  FiMail,
  FiPhone,
  FiCalendar,
  FiStar,
  FiExternalLink,
  FiShield,
  FiCreditCard,
  FiTruck,
  FiBell,
  FiMoon,
  FiGlobe as FiLanguage,
  FiSave,
  FiAward,
  FiTrendingUp,
  FiChevronRight,
  FiDatabase,
  FiActivity,
  FiBox,
  FiPlus,
  FiCamera,
  FiMapPin,
  FiBriefcase,
  FiUpload,
  FiTrash2,
  FiGitBranch
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [comments, setComments] = useState([]);
  const [landingPages, setLandingPages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [preferences, setPreferences] = useState({
    notifications: true,
    theme: 'light',
    language: 'pt-BR',
    emailUpdates: false,
    privacy: 'public'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const fileInputRef = useRef(null);

  // Observar autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setPhotoURL(user.photoURL || '');
        await fetchUserData(user.uid);
        await fetchAllUserData(user.uid);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData({ id: userDoc.id, ...data });
        
        // Carregar preferências se existirem
        if (data.preferences) {
          setPreferences(data.preferences);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  const fetchAllUserData = async (userId) => {
    setLoading(true);
    try {
      // Buscar pedidos
      const ordersQuery = query(
        collection(db, 'orders'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const ordersSnapshot = await getDocs(ordersQuery);
      const ordersData = ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));
      setOrders(ordersData);

      // Buscar comentários
      const commentsQuery = query(
        collection(db, 'comments'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const commentsSnapshot = await getDocs(commentsQuery);
      const commentsData = commentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      }));
      setComments(commentsData);

      // Buscar landing pages
      const pagesQuery = query(
        collection(db, 'landingPages'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const pagesSnapshot = await getDocs(pagesQuery);
      const pagesData = pagesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      }));
      setLandingPages(pagesData);

      // Buscar favoritos
      const favoritesQuery = query(
        collection(db, 'favorites'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const favoritesSnapshot = await getDocs(favoritesQuery);
      const favoritesData = favoritesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));
      setFavorites(favoritesData);

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditField = (field, value) => {
    setEditingField(field);
    setEditValue(value);
  };

  const saveFieldEdit = async () => {
    if (!user || !editingField) return;

    setIsSaving(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        [editingField]: editValue,
        updatedAt: new Date()
      });

      setUserData(prev => ({ ...prev, [editingField]: editValue }));
      setEditingField(null);
      setEditValue('');
    } catch (error) {
      console.error('Erro ao atualizar campo:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityForm(prev => ({ ...prev, [name]: value }));
  };

  const updateUserPassword = async () => {
    if (!user || !securityForm.currentPassword || !securityForm.newPassword) return;
    
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    setIsSaving(true);
    try {
      // Reautenticar o usuário
      const credential = EmailAuthProvider.credential(user.email, securityForm.currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Atualizar senha
      await updatePassword(user, securityForm.newPassword);
      
      alert('Senha atualizada com sucesso!');
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      alert('Erro ao atualizar senha. Verifique a senha atual.');
    } finally {
      setIsSaving(false);
    }
  };

  const resetPassword = async () => {
    if (!user?.email) return;
    
    try {
      await sendPasswordResetEmail(auth, user.email);
      alert('Email de redefinição de senha enviado! Verifique sua caixa de entrada.');
    } catch (error) {
      console.error('Erro ao enviar email de redefinição:', error);
      alert('Erro ao enviar email de redefinição. Tente novamente.');
    }
  };

  const updateUserPreferences = async (newPreferences) => {
    if (!user) return;

    setIsSaving(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        preferences: newPreferences,
        updatedAt: new Date()
      });

      setPreferences(newPreferences);
    } catch (error) {
      console.error('Erro ao atualizar preferências:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    // Verificar se é uma imagem
    if (!file.type.match('image.*')) {
      alert('Por favor, selecione um arquivo de imagem.');
      return;
    }

    // Verificar tamanho do arquivo (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.');
      return;
    }

    setUploadingPhoto(true);
    
    try {
      // Deletar foto anterior se existir
      if (user.photoURL) {
        try {
          const oldPhotoRef = ref(storage, user.photoURL);
          await deleteObject(oldPhotoRef);
        } catch (error) {
          console.log('Foto anterior não encontrada ou já excluída');
        }
      }

      // Fazer upload da nova foto
      const fileRef = ref(storage, `users/${user.uid}/profile/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      
      // Obter URL da nova foto
      const downloadURL = await getDownloadURL(fileRef);
      
      // Atualizar perfil do usuário
      await updateProfile(user, { photoURL: downloadURL });
      
      // Atualizar no Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        photoURL: downloadURL,
        updatedAt: new Date()
      });
      
      // Atualizar estado local
      setPhotoURL(downloadURL);
      setUserData(prev => ({ ...prev, photoURL: downloadURL }));
      
      alert('Foto de perfil atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer upload da foto:', error);
      alert('Erro ao atualizar a foto de perfil. Tente novamente.');
    } finally {
      setUploadingPhoto(false);
      // Limpar input de arquivo
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeProfilePhoto = async () => {
    if (!user || !user.photoURL) return;

    if (!window.confirm('Tem certeza que deseja remover sua foto de perfil?')) {
      return;
    }

    setUploadingPhoto(true);
    
    try {
      // Deletar foto do storage
      const photoRef = ref(storage, user.photoURL);
      await deleteObject(photoRef);
      
      // Atualizar perfil do usuário
      await updateProfile(user, { photoURL: null });
      
      // Atualizar no Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        photoURL: null,
        updatedAt: new Date()
      });
      
      // Atualizar estado local
      setPhotoURL('');
      setUserData(prev => ({ ...prev, photoURL: null }));
      
      alert('Foto de perfil removida com sucesso!');
    } catch (error) {
      console.error('Erro ao remover a foto:', error);
      alert('Erro ao remover a foto de perfil. Tente novamente.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'paid': return 'Pago';
      case 'shipped': return 'Enviado';
      case 'delivered': return 'Entregue';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <motion.div 
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        <p>Carregando seu perfil...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-not-auth">
        <motion.div 
          className="not-auth-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FiUser size={64} />
          <h2>Usuário não autenticado</h2>
          <p>Faça login para acessar seu perfil</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Cabeçalho do Perfil - MELHORADO */}
        <motion.header 
          className="profile-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="header-background"></div>
          
          <div className="user-profile-main">
            <div className="user-avatar-section">
              <div className="user-avatar-container">
                {photoURL ? (
                  <motion.img 
                    src={photoURL} 
                    alt={userData?.name || 'Usuário'}
                    whileHover={{ scale: 1.05 }}
                  />
                ) : (
                  <motion.div 
                    className="avatar-placeholder"
                    whileHover={{ scale: 1.05 }}
                  >
                    {userData?.name?.[0]?.toUpperCase() || 'U'}
                  </motion.div>
                )}
                
                <motion.button 
                  className="avatar-edit-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPhoto}
                >
                  {uploadingPhoto ? (
                    <div className="loading-spinner-small"></div>
                  ) : (
                    <FiCamera size={16} />
                  )}
                </motion.button>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                
                {photoURL && (
                  <motion.button 
                    className="avatar-remove-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={removeProfilePhoto}
                    disabled={uploadingPhoto}
                  >
                    <FiTrash2 size={14} />
                  </motion.button>
                )}
              </div>
              
              <div className="avatar-upload-info">
                <p>Clique no ícone para alterar sua foto</p>
                <span>Formatos: JPG, PNG • Máx: 5MB</span>
              </div>
              
              <motion.div 
                className="profile-score"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <div className="score-content">
                  <div className="score-value">4.8</div>
                  <div className="score-stars">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} size={14} fill={i < 4.8 ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <div className="score-label">Reputação</div>
                </div>
              </motion.div>
            </div>
            
            <div className="user-info-main">
              <div className="user-info-header">
                <h1>{userData?.name || 'Usuário'}</h1>
                <motion.button 
                  className="profile-edit-btn"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <FiEdit size={16} />
                  Editar Perfil
                </motion.button>
              </div>
              
              <div className="user-details">
                <div className="user-detail-item">
                  <FiMail size={18} className="detail-icon" />
                  <span className="detail-value">{user?.email}</span>
                </div>
                
                {userData?.phone && (
                  <div className="user-detail-item">
                    <FiPhone size={18} className="detail-icon" />
                    <span className="detail-value">{userData.phone}</span>
                  </div>
                )}
                
                <div className="user-detail-item">
                  <FiCalendar size={18} className="detail-icon" />
                  <span className="detail-value">
                    Membro desde {userData?.createdAt ? formatDate(userData.createdAt.toDate()) : 'data não disponível'}
                  </span>
                </div>

                {userData?.location && (
                  <div className="user-detail-item">
                    <FiMapPin size={18} className="detail-icon" />
                    <span className="detail-value">{userData.location}</span>
                  </div>
                )}

                {userData?.occupation && (
                  <div className="user-detail-item">
                    <FiBriefcase size={18} className="detail-icon" />
                    <span className="detail-value">{userData.occupation}</span>
                  </div>
                )}
              </div>
              
              <div className="user-stats-preview">
                <div className="stat-preview">
                  <span className="stat-number">{orders.length}</span>
                  <span className="stat-label">Pedidos</span>
                </div>
                <div className="stat-preview">
                  <span className="stat-number">{comments.length}</span>
                  <span className="stat-label">Comentários</span>
                </div>
                <div className="stat-preview">
                  <span className="stat-number">{landingPages.length}</span>
                  <span className="stat-label">Páginas</span>
                </div>
                <div className="stat-preview">
                  <span className="stat-number">{favorites.length}</span>
                  <span className="stat-label">Favoritos</span>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Dashboard Overview */}
        <div className="dashboard-overview">
          <motion.div 
            className="stat-card"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="stat-icon">
              <FiShoppingCart />
            </div>
            <div className="stat-content">
              <h3>{orders.length}</h3>
              <p>Pedidos Realizados</p>
            </div>
            <FiChevronRight className="stat-arrow" />
          </motion.div>
          
          <motion.div 
            className="stat-card"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="stat-icon">
              <FiMessageSquare />
            </div>
            <div className="stat-content">
              <h3>{comments.length}</h3>
              <p>Comentários</p>
            </div>
            <FiChevronRight className="stat-arrow" />
          </motion.div>
          
          <motion.div 
            className="stat-card"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="stat-icon">
              <FiGlobe />
            </div>
            <div className="stat-content">
              <h3>{landingPages.length}</h3>
              <p>Landing Pages</p>
            </div>
            <FiChevronRight className="stat-arrow" />
          </motion.div>
          
          <motion.div 
            className="stat-card"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="stat-icon">
              <FiHeart />
            </div>
            <div className="stat-content">
              <h3>{favorites.length}</h3>
              <p>Favoritos</p>
            </div>
            <FiChevronRight className="stat-arrow" />
          </motion.div>
        </div>

        {/* Navegação por Abas */}
        <nav className="profile-tabs">
          {[
            { id: 'personal', icon: FiUser, label: 'Pessoal' },
            { id: 'security', icon: FiLock, label: 'Segurança' },
            { id: 'preferences', icon: FiSettings, label: 'Preferências' },
            { id: 'orders', icon: FiShoppingCart, label: 'Compras' },
            { id: 'content', icon: FiDatabase, label: 'Conteúdo' },
            { id: 'billing', icon: FiCreditCard, label: 'Faturamento' }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                className={activeTab === tab.id ? 'active' : ''}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Icon />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div 
                    className="tab-indicator"
                    layoutId="tab-indicator"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Conteúdo das Abas */}
        <div className="tab-content">
          <AnimatePresence mode="wait">
            {/* Informações Pessoais */}
            {activeTab === 'personal' && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="tab-panel"
              >
                <div className="panel-header">
                  <h2><FiUser /> Informações Pessoais</h2>
                  <p>Gerencie suas informações de perfil</p>
                </div>
                
                <div className="personal-form">
                  <div className="form-section">
                    <h3>Dados Pessoais</h3>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">
                          <FiUser /> Nome Completo
                        </label>
                        {editingField === 'name' ? (
                          <div className="edit-field">
                            <input
                              id="name"
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              placeholder="Seu nome completo"
                              autoFocus
                            />
                            <div className="edit-actions">
                              <motion.button 
                                onClick={saveFieldEdit} 
                                className="save-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isSaving}
                              >
                                {isSaving ? (
                                  <div className="loading-spinner-small"></div>
                                ) : (
                                  <>
                                    <FiSave /> Salvar
                                  </>
                                )}
                              </motion.button>
                              <motion.button 
                                onClick={cancelEdit} 
                                className="cancel-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isSaving}
                              >
                                <FiX /> Cancelar
                              </motion.button>
                            </div>
                          </div>
                        ) : (
                          <div className="field-with-action">
                            <span className="field-value">{userData?.name || 'Não informado'}</span>
                            <motion.button 
                              onClick={() => handleEditField('name', userData?.name || '')}
                              className="edit-btn"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiEdit />
                            </motion.button>
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">
                          <FiMail /> E-mail
                        </label>
                        <span className="field-value">{user?.email}</span>
                        <div className="field-help">O e-mail não pode ser alterado</div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone">
                          <FiPhone /> Telefone
                        </label>
                        {editingField === 'phone' ? (
                          <div className="edit-field">
                            <input
                              id="phone"
                              type="tel"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              placeholder="Seu telefone"
                              autoFocus
                            />
                            <div className="edit-actions">
                              <motion.button 
                                onClick={saveFieldEdit} 
                                className="save-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isSaving}
                              >
                                {isSaving ? (
                                  <div className="loading-spinner-small"></div>
                                ) : (
                                  <>
                                    <FiSave /> Salvar
                                  </>
                                )}
                              </motion.button>
                              <motion.button 
                                onClick={cancelEdit} 
                                className="cancel-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isSaving}
                              >
                                <FiX /> Cancelar
                              </motion.button>
                            </div>
                          </div>
                        ) : (
                          <div className="field-with-action">
                            <span className="field-value">{userData?.phone || 'Não informado'}</span>
                            <motion.button 
                              onClick={() => handleEditField('phone', userData?.phone || '')}
                              className="edit-btn"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiEdit />
                            </motion.button>
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="joinDate">
                          <FiCalendar /> Data de Cadastro
                        </label>
                        <span className="field-value">
                          {userData?.createdAt ? formatDate(userData.createdAt.toDate()) : 'Não disponível'}
                        </span>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="location">
                          <FiMapPin /> Localização
                        </label>
                        {editingField === 'location' ? (
                          <div className="edit-field">
                            <input
                              id="location"
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              placeholder="Sua localização"
                              autoFocus
                            />
                            <div className="edit-actions">
                              <motion.button 
                                onClick={saveFieldEdit} 
                                className="save-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isSaving}
                              >
                                {isSaving ? (
                                  <div className="loading-spinner-small"></div>
                                ) : (
                                  <>
                                    <FiSave /> Salvar
                                  </>
                                )}
                              </motion.button>
                              <motion.button 
                                onClick={cancelEdit} 
                                className="cancel-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isSaving}
                              >
                                <FiX /> Cancelar
                              </motion.button>
                            </div>
                          </div>
                        ) : (
                          <div className="field-with-action">
                            <span className="field-value">{userData?.location || 'Não informado'}</span>
                            <motion.button 
                              onClick={() => handleEditField('location', userData?.location || '')}
                              className="edit-btn"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiEdit />
                            </motion.button>
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="occupation">
                          <FiBriefcase /> Profissão
                        </label>
                        {editingField === 'occupation' ? (
                          <div className="edit-field">
                            <input
                              id="occupation"
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              placeholder="Sua profissão"
                              autoFocus
                            />
                            <div className="edit-actions">
                              <motion.button 
                                onClick={saveFieldEdit} 
                                className="save-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isSaving}
                              >
                                {isSaving ? (
                                  <div className="loading-spinner-small"></div>
                                ) : (
                                  <>
                                    <FiSave /> Salvar
                                  </>
                                )}
                              </motion.button>
                              <motion.button 
                                onClick={cancelEdit} 
                                className="cancel-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isSaving}
                              >
                                <FiX /> Cancelar
                              </motion.button>
                            </div>
                          </div>
                        ) : (
                          <div className="field-with-action">
                            <span className="field-value">{userData?.occupation || 'Não informado'}</span>
                            <motion.button 
                              onClick={() => handleEditField('occupation', userData?.occupation || '')}
                              className="edit-btn"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiEdit />
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Biografia</h3>
                    <div className="form-group full-width">
                      <label htmlFor="bio">Sobre você</label>
                      {editingField === 'bio' ? (
                        <div className="edit-field">
                          <textarea
                            id="bio"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            placeholder="Conte um pouco sobre você, suas experiências e interesses..."
                            rows={4}
                            autoFocus
                          />
                          <div className="edit-actions">
                            <motion.button 
                              onClick={saveFieldEdit} 
                              className="save-btn"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              disabled={isSaving}
                            >
                              {isSaving ? (
                                <div className="loading-spinner-small"></div>
                              ) : (
                                <>
                                  <FiSave /> Salvar
                                </>
                              )}
                            </motion.button>
                            <motion.button 
                              onClick={cancelEdit} 
                              className="cancel-btn"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              disabled={isSaving}
                            >
                              <FiX /> Cancelar
                            </motion.button>
                          </div>
                        </div>
                      ) : (
                        <div className="field-with-action">
                          <span className="field-value">{userData?.bio || 'Nenhuma biografia adicionada'}</span>
                          <motion.button 
                            onClick={() => handleEditField('bio', userData?.bio || '')}
                            className="edit-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FiEdit />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
                       {/* Segurança */}
            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="tab-panel"
              >
                <div className="panel-header">
                  <h2><FiShield /> Segurança da Conta</h2>
                  <p>Proteja sua conta com essas configurações</p>
                </div>
                
                <div className="security-grid">
                  <div className="security-card">
                    <div className="security-icon">
                      <FiLock />
                    </div>
                    <div className="security-content">
                      <h3>Alterar Senha</h3>
                      <p>Atualize sua senha regularmente para manter sua conta segura</p>
                      
                      <div className="security-form">
                        <div className="form-group">
                          <label htmlFor="currentPassword">Senha Atual</label>
                          <input
                            id="currentPassword"
                            type="password"
                            name="currentPassword"
                            value={securityForm.currentPassword}
                            onChange={handleSecurityChange}
                            placeholder="Digite sua senha atual"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="newPassword">Nova Senha</label>
                          <input
                            id="newPassword"
                            type="password"
                            name="newPassword"
                            value={securityForm.newPassword}
                            onChange={handleSecurityChange}
                            placeholder="Digite a nova senha"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
                          <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={securityForm.confirmPassword}
                            onChange={handleSecurityChange}
                            placeholder="Confirme a nova senha"
                          />
                        </div>

                        <motion.button 
                          onClick={updateUserPassword}
                          className="update-password-btn"
                          disabled={!securityForm.currentPassword || !securityForm.newPassword || !securityForm.confirmPassword || isSaving}
                          whileHover={{ y: -2 }}
                          whileTap={{ y: 0 }}
                        >
                          {isSaving ? (
                            <div className="loading-spinner-small"></div>
                          ) : (
                            <>
                              <FiCheck /> Atualizar Senha
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <div className="security-card">
                    <div className="security-icon">
                      <FiMail />
                    </div>
                    <div className="security-content">
                      <h3>Redefinir Senha</h3>
                      <p>Receba um email com instruções para redefinir sua senha</p>
                      <motion.button 
                        onClick={resetPassword}
                        className="reset-password-btn"
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                      >
                        <FiMail /> Enviar Email de Redefinição
                      </motion.button>
                    </div>
                  </div>

                  <div className="security-card">
                    <div className="security-icon">
                      <FiActivity />
                    </div>
                    <div className="security-content">
                      <h3>Atividade Recente</h3>
                      <p>Monitoramento de acesso à sua conta</p>
                      <div className="activity-list">
                        <div className="activity-item">
                          <div className="activity-details">
                            <strong>Login realizado</strong>
                            <span>Salvador, BA • Agora</span>
                          </div>
                          <FiChevronRight className="activity-arrow" />
                        </div>
                        <div className="activity-item">
                          <div className="activity-details">
                            <strong>Alteração de senha</strong>
                            <span>São Paulo, SP • 2 dias atrás</span>
                          </div>
                          <FiChevronRight className="activity-arrow" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Preferências */}
            {activeTab === 'preferences' && (
              <motion.div
                key="preferences"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="tab-panel"
              >
                <div className="panel-header">
                  <h2><FiSettings /> Preferências</h2>
                  <p>Personalize sua experiência na plataforma</p>
                </div>
                
                <div className="preferences-grid">
                  <div className="preference-category">
                    <h3><FiBell /> Notificações</h3>
                    
                    <div className="preference-item">
                      <div className="preference-info">
                        <h4>Notificações por Email</h4>
                        <p>Receba atualizações importantes por email</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={preferences.notifications}
                          onChange={(e) => updateUserPreferences({ ...preferences, notifications: e.target.checked })}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="preference-item">
                      <div className="preference-info">
                        <h4>Atualizações de Produtos</h4>
                        <p>Receba novidades sobre produtos and serviços</p>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={preferences.emailUpdates}
                          onChange={(e) => updateUserPreferences({ ...preferences, emailUpdates: e.target.checked })}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="preference-category">
                    <h3><FiMoon /> Aparência</h3>
                    
                    <div className="preference-item">
                      <div className="preference-info">
                        <h4>Tema da Interface</h4>
                        <p>Escolha como a plataforma aparece para você</p>
                      </div>
                      <select
                        value={preferences.theme}
                        onChange={(e) => updateUserPreferences({ ...preferences, theme: e.target.value })}
                        className="theme-select"
                      >
                        <option value="light">Claro</option>
                        <option value="dark">Escuro</option>
                        <option value="auto">Automático (sistema)</option>
                      </select>
                    </div>
                  </div>

                  <div className="preference-category">
                    <h3><FiLanguage /> Idioma e Região</h3>
                    
                    <div className="preference-item">
                      <div className="preference-info">
                        <h4>Idioma</h4>
                        <p>Escolha seu idioma preferido</p>
                      </div>
                      <select
                        value={preferences.language}
                        onChange={(e) => updateUserPreferences({ ...preferences, language: e.target.value })}
                      >
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>
                  </div>

                  <div className="preference-category">
                    <h3><FiShield /> Privacidade</h3>
                    
                    <div className="preference-item">
                      <div className="preference-info">
                        <h4>Visibilidade do Perfil</h4>
                        <p>Quem pode ver seu perfil e atividades</p>
                      </div>
                      <select
                        value={preferences.privacy}
                        onChange={(e) => updateUserPreferences({ ...preferences, privacy: e.target.value })}
                      >
                        <option value="public">Público</option>
                        <option value="friends">Apenas Amigos</option>
                        <option value="private">Privado</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Histórico de Compras */}
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="tab-panel"
              >
                <div className="panel-header">
                  <h2><FiShoppingCart /> Histórico de Compras</h2>
                  <p>Veja todos os seus pedidos realizados</p>
                </div>
                
                {orders.length === 0 ? (
                  <div className="empty-state">
                    <FiShoppingCart size={48} />
                    <h3>Nenhum pedido encontrado</h3>
                    <p>Você ainda não realizou nenhuma compra em nossa plataforma</p>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map((order) => (
                      <motion.div 
                        key={order.id} 
                        className="order-card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="order-header">
                          <div className="order-title">
                            <h3>Pedido #{order.id.slice(-8).toUpperCase()}</h3>
                            <span className="order-date">{formatDate(order.createdAt)}</span>
                          </div>
                          <div className="order-status">
                            <span className={`status-badge status-${order.status}`}>
                              {getStatusText(order.status)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="order-info">
                          <div className="info-row">
                            <span>Total:</span>
                            <span className="order-total">{formatCurrency(order.totalAmount)}</span>
                          </div>
                          <div className="info-row">
                            <span>Itens:</span>
                            <span>{order.items?.length || 0} produto(s)</span>
                          </div>
                          <div className="info-row">
                            <span>Método de Pagamento:</span>
                            <span><FiCreditCard /> {order.paymentMethod || 'Cartão de Crédito'}</span>
                          </div>
                        </div>
                        
                        <div className="order-actions">
                          <motion.button 
                            className="view-invoice-btn"
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                          >
                            <FiEye /> Ver Detalhes
                          </motion.button>
                          <motion.button 
                            className="track-order-btn"
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                          >
                            <FiTruck /> Acompanhar
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Conteúdo */}
            {activeTab === 'content' && (
              <motion.div
                key="content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="tab-panel"
              >
                <div className="panel-header">
                  <h2><FiDatabase /> Meu Conteúdo</h2>
                  <p>Gerencie todo o conteúdo que você criou</p>
                </div>
                
                <div className="content-tabs">
                  <motion.button 
                    className={activeSubTab === 'overview' ? 'active' : ''}
                    onClick={() => setActiveSubTab('overview')}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <FiActivity /> Visão Geral
                  </motion.button>
                  <motion.button 
                    className={activeSubTab === 'comments' ? 'active' : ''}
                    onClick={() => setActiveSubTab('comments')}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <FiMessageSquare /> Comentários
                  </motion.button>
                  <motion.button 
                    className={activeSubTab === 'pages' ? 'active' : ''}
                    onClick={() => setActiveSubTab('pages')}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <FiGlobe /> Landing Pages
                  </motion.button>
                  <motion.button 
                    className={activeSubTab === 'favorites' ? 'active' : ''}
                    onClick={() => setActiveSubTab('favorites')}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <FiHeart /> Favoritos
                  </motion.button>
                </div>

                {/* Visão Geral do Conteúdo */}
                {activeSubTab === 'overview' && (
                  <motion.div
                    className="sub-tab-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="content-overview">
                      <div className="content-stats">
                        <div className="content-stat">
                          <div className="stat-icon">
                            <FiMessageSquare />
                          </div>
                          <div className="stat-info">
                            <h3>{comments.length}</h3>
                            <p>Comentários</p>
                          </div>
                        </div>
                        <div className="content-stat">
                          <div className="stat-icon">
                            <FiGlobe />
                          </div>
                          <div className="stat-info">
                            <h3>{landingPages.length}</h3>
                            <p>Landing Pages</p>
                          </div>
                        </div>
                        <div className="content-stat">
                          <div className="stat-icon">
                            <FiHeart />
                          </div>
                          <div className="stat-info">
                            <h3>{favorites.length}</h3>
                            <p>Favoritos</p>
                          </div>
                        </div>
                      </div>

                      <div className="recent-activity">
                        <h3>Atividade Recente</h3>
                        <div className="activity-timeline">
                          {comments.slice(0, 3).map((comment) => (
                            <div key={comment.id} className="timeline-item">
                              <div className="timeline-marker"></div>
                              <div className="timeline-content">
                                <h4>Novo comentário em {comment.pageTitle || 'Página sem título'}</h4>
                                <p>{comment.content.substring(0, 100)}...</p>
                                <span className="timeline-date">{formatDate(comment.createdAt)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Comentários */}
                {activeSubTab === 'comments' && (
                  <motion.div
                    className="sub-tab-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {comments.length === 0 ? (
                      <div className="empty-state">
                        <FiMessageSquare size={48} />
                        <h3>Nenhum comentário</h3>
                        <p>You ainda não fez nenhum comentário em nossa plataforma</p>
                      </div>
                    ) : (
                      <div className="comments-list">
                        {comments.map((comment) => (
                          <motion.div 
                            key={comment.id} 
                            className="comment-card"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="comment-header">
                              <div className="comment-title">
                                <h3>{comment.pageTitle || 'Página sem título'}</h3>
                                <div className="comment-rating">
                                  {comment.rating && (
                                    <div className="stars">
                                      {[...Array(5)].map((_, i) => (
                                        <FiStar 
                                          key={i} 
                                          size={16} 
                                          fill={i < comment.rating ? "currentColor" : "none"} 
                                        />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <span className="comment-date">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            
                            <div className="comment-content">
                              <p>{comment.content}</p>
                            </div>
                            
                            <div className="comment-actions">
                              <motion.button 
                                className="view-page-btn"
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 0 }}
                              >
                                <FiExternalLink /> Ver Página
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Landing Pages */}
                {activeSubTab === 'pages' && (
                  <motion.div
                    className="sub-tab-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {landingPages.length === 0 ? (
                      <div className="empty-state">
                        <FiGlobe size={48} />
                        <h3>Nenhuma landing page</h3>
                        <p>Você ainda não criou nenhuma landing page em nossa plataforma</p>
                      </div>
                    ) : (
                      <div className="pages-grid">
                        {landingPages.map((page) => (
                          <motion.div 
                            key={page.id} 
                            className="page-card"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="page-thumbnail">
                              {page.thumbnail ? (
                                <img src={page.thumbnail} alt={page.title} />
                              ) : (
                                <div className="thumbnail-placeholder">
                                  <FiGlobe />
                                </div>
                              )}
                              <div className="page-status">
                                <span className={`status-dot ${page.published ? 'published' : 'draft'}`}></span>
                                {page.published ? 'Publicado' : 'Rascunho'}
                              </div>
                            </div>
                            
                            <div className="page-info">
                              <h4>{page.title || 'Sem título'}</h4>
                              <p>{page.description || 'Sem descrição'}</p>
                              <span className="page-date">
                                Criada em {formatDate(page.createdAt)}
                              </span>
                            </div>
                            
                            <div className="page-actions">
                              <motion.button 
                                className="view-page-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <FiExternalLink /> Visualizar
                              </motion.button>
                              <motion.button 
                                className="analytics-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <FiTrendingUp /> Analytics
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Favoritos */}
                {activeSubTab === 'favorites' && (
                  <motion.div
                    className="sub-tab-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {favorites.length === 0 ? (
                      <div className="empty-state">
                        <FiHeart size={48} />
                        <h3>Nenhum favorito</h3>
                        <p>Você ainda não favoritou nenhum item em nossa plataforma</p>
                      </div>
                    ) : (
                      <div className="favorites-grid">
                        {favorites.map((favorite) => (
                          <motion.div 
                            key={favorite.id} 
                            className="favorite-card"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="favorite-image">
                              {favorite.itemImage ? (
                                <img src={favorite.itemImage} alt={favorite.itemName} />
                              ) : (
                                <div className="image-placeholder">
                                  <FiHeart />
                                </div>
                              )}
                            </div>
                            
                            <div className="favorite-info">
                              <h4>{favorite.itemName || 'Item sem nome'}</h4>
                              <p>{favorite.itemDescription || 'Sem descrição'}</p>
                              <span className="favorite-date">
                                Adicionado em {formatDate(favorite.createdAt)}
                              </span>
                            </div>
                            
                            <div className="favorite-actions">
                              <motion.button 
                                className="view-item-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <FiEye /> Ver
                              </motion.button>
                              <motion.button 
                                className="remove-favorite-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <FiHeart fill="currentColor" /> Remover
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Faturamento */}
            {activeTab === 'billing' && (
              <motion.div
                key="billing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="tab-panel"
              >
                <div className="panel-header">
                  <h2><FiCreditCard /> Faturamento</h2>
                  <p>Gerencie suas informações de pagamento</p>
                </div>
                
                <div className="billing-grid">
                  <div className="billing-card">
                    <div className="billing-icon">
                      <FiCreditCard />
                    </div>
                    <div className="billing-content">
                      <h3>Métodos de Pagamento</h3>
                      <p>Gerencie seus cartões e formas de pagamento</p>
                      <div className="payment-methods">
                        <div className="payment-method">
                          <div className="method-info">
                            <strong>Cartão de Crédito •••• 1234</strong>
                            <span>Visa - Expira em 12/2025</span>
                          </div>
                          <button className="method-edit">Editar</button>
                        </div>
                      </div>
                      <motion.button 
                        className="add-payment-btn"
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                      >
                        <FiPlus /> Adicionar Método de Pagamento
                      </motion.button>
                    </div>
                  </div>

                  <div className="billing-card">
                    <div className="billing-icon">
                      <FiBox />
                    </div>
                    <div className="billing-content">
                      <h3>Assinaturas</h3>
                      <p>Gerencie suas assinaturas ativas</p>
                      <div className="subscriptions-list">
                        <div className="subscription-item">
                          <div className="subscription-info">
                            <strong>Plano Premium</strong>
                            <span>R$ 99,90/mês • Renova em 12/09/2025</span>
                          </div>
                          <span className="subscription-status active">Ativa</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="billing-card">
                    <div className="billing-icon">
                      <FiActivity />
                    </div>
                    <div className="billing-content">
                      <h3>Histórico de Faturas</h3>
                      <p>Acompanhe seu histórico de pagamentos</p>
                      <div className="invoices-list">
                        <div className="invoice-item">
                          <div className="invoice-info">
                            <strong>Fatura #INV-2023-09-001</strong>
                            <span>12/09/2023 • R$ 99,90</span>
                          </div>
                          <button className="invoice-download">Download</button>
                        </div>
                        <div className="invoice-item">
                          <div className="invoice-info">
                            <strong>Fatura #INV-2023-08-001</strong>
                            <span>12/08/2023 • R$ 99,90</span>
                          </div>
                          <button className="invoice-download">Download</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Botão de Logout */}
        <motion.div 
          className="profile-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button 
            className="logout-btn"
            onClick={() => auth.signOut()}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <FiLogOut /> Sair da Conta
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
