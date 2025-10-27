import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { auth, db } from '../config/firebase';
import { 
  onAuthStateChanged, 
  signOut 
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
  FaShoppingCart, 
  FaDollarSign, 
  FaCheckCircle, 
  FaClock,
  FaTruck,
  FaBoxOpen,
  FaSignOutAlt,
  FaUser,
  FaCog,
  FaBell,
  FaSearch,
  FaFilter,
  FaChartLine,
  FaHome
} from 'react-icons/fa';
import { 
  FiArrowLeft,
  FiSettings,
  FiEye
} from 'react-icons/fi';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showOrderDetails, setShowOrderDetails] = useState(null);
  const navigate = useNavigate();

  // Configurações do gráfico
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Histórico de Compras (Últimos 6 meses)',
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribuição por Status',
      },
    },
  };

  // Dados para os gráficos (serão preenchidos dinamicamente)
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Valor Gasto',
        data: [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Pedidos',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  // Observar autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await fetchUserData(user.uid);
        await fetchOrders(user.uid);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setUserData({ id: userDoc.id, ...userDoc.data() });
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  const fetchOrders = async (userId) => {
    setLoading(true);
    try {
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
      setFilteredOrders(ordersData);
      updateCharts(ordersData);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCharts = (ordersData) => {
    // Preparar dados para o gráfico de barras (histórico de compras)
    const last6Months = getLast6Months();
    const monthlyData = {};
    
    last6Months.forEach(month => {
      monthlyData[month] = 0;
    });

    ordersData.forEach(order => {
      const orderMonth = order.createdAt.toLocaleString('pt-BR', { month: 'short', year: 'numeric' });
      if (monthlyData.hasOwnProperty(orderMonth)) {
        monthlyData[orderMonth] += order.total;
      }
    });

    // Preparar dados para o gráfico de pizza (distribuição por status)
    const statusCount = {
      'pending': 0,
      'paid': 0,
      'shipped': 0,
      'delivered': 0
    };

    ordersData.forEach(order => {
      if (statusCount.hasOwnProperty(order.status)) {
        statusCount[order.status] += 1;
      }
    });

    // Atualizar gráfico de barras
    setBarChartData({
      labels: last6Months,
      datasets: [
        {
          label: 'Valor Gasto (R$)',
          data: last6Months.map(month => monthlyData[month]),
          backgroundColor: 'rgba(67, 97, 238, 0.8)',
        },
      ],
    });

    // Atualizar gráfico de pizza
    setPieChartData({
      labels: ['Pendente', 'Pago', 'Enviado', 'Entregue'],
      datasets: [
        {
          label: 'Quantidade de Pedidos',
          data: [
            statusCount.pending,
            statusCount.paid,
            statusCount.shipped,
            statusCount.delivered
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  const getLast6Months = () => {
    const months = [];
    const date = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(date.getFullYear(), date.getMonth() - i, 1);
      months.push(monthDate.toLocaleString('pt-BR', { month: 'short', year: 'numeric' }));
    }
    
    return months;
  };

  const filterOrders = (status) => {
    setSelectedStatus(status);
    
    if (status === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === status));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FaClock className="status-icon pending" />;
      case 'paid': return <FaDollarSign className="status-icon paid" />;
      case 'shipped': return <FaTruck className="status-icon shipped" />;
      case 'delivered': return <FaCheckCircle className="status-icon delivered" />;
      default: return <FaBoxOpen className="status-icon" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'paid': return 'Pago';
      case 'shipped': return 'Enviado';
      case 'delivered': return 'Entregue';
      default: return status;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const viewOrderDetails = (order) => {
    setShowOrderDetails(order);
  };

  const closeOrderDetails = () => {
    setShowOrderDetails(null);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Carregando seus pedidos...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Painel de Compras</h2>
        </div>

        <div className="user-info">
          <div className="user-avatar">
            {userData?.photoURL ? (
              <img src={userData.photoURL} alt={userData.name} />
            ) : (
              <div className="avatar-placeholder">
                {userData?.name?.[0]?.toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <div className="user-details">
            <h3>{userData?.name || 'Usuário'}</h3>
            <p>{userData?.email}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active">
            <FaShoppingCart />
            Meus Pedidos
          </button>
          <button className="nav-item" onClick={() => navigate('/perfil')}>
            <FaUser />
            Meu Perfil
          </button>
          <button className="nav-item" onClick={() => navigate('/perfil')}>
            <FaCog />
            Configurações
          </button>
          <button className="nav-item" onClick={() => navigate('/')}>
            <FaHome />
            Voltar ao Site
          </button>
          <button className="nav-item logout" onClick={handleLogout}>
            <FaSignOutAlt />
            Sair
          </button>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="dashboard-content">
        <header className="content-header">
          <h1>Meus Pedidos</h1>
          <div className="header-actions">
            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Buscar pedidos..." />
            </div>
            <button className="notification-btn">
              <FaBell />
              <span className="notification-badge">3</span>
            </button>
          </div>
        </header>

        {/* Estatísticas Rápidas */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FaShoppingCart />
            </div>
            <div className="stat-content">
              <h3>Total de Pedidos</h3>
              <p className="stat-value">{orders.length}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaDollarSign />
            </div>
            <div className="stat-content">
              <h3>Valor Total Gasto</h3>
              <p className="stat-value">
                {formatCurrency(orders.reduce((total, order) => total + order.total, 0))}
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>
            <div className="stat-content">
              <h3>Pedidos Entregues</h3>
              <p className="stat-value">
                {orders.filter(order => order.status === 'delivered').length}
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaClock />
            </div>
            <div className="stat-content">
              <h3>Pedidos Pendentes</h3>
              <p className="stat-value">
                {orders.filter(order => order.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="filters-section">
          <div className="section-header">
            <h2>Filtrar Pedidos</h2>
            <FaFilter />
          </div>
          <div className="filter-buttons">
            <button 
              className={selectedStatus === 'all' ? 'active' : ''}
              onClick={() => filterOrders('all')}
            >
              Todos
            </button>
            <button 
              className={selectedStatus === 'pending' ? 'active' : ''}
              onClick={() => filterOrders('pending')}
            >
              Pendentes
            </button>
            <button 
              className={selectedStatus === 'paid' ? 'active' : ''}
              onClick={() => filterOrders('paid')}
            >
              Pagos
            </button>
            <button 
              className={selectedStatus === 'shipped' ? 'active' : ''}
              onClick={() => filterOrders('shipped')}
            >
              Enviados
            </button>
            <button 
              className={selectedStatus === 'delivered' ? 'active' : ''}
              onClick={() => filterOrders('delivered')}
            >
              Entregues
            </button>
          </div>
        </div>

        {/* Gráficos */}
        <div className="charts-section">
          <div className="chart-container">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
          <div className="chart-container">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>

        {/* Lista de Pedidos */}
        <div className="orders-section">
          <div className="section-header">
            <h2>Seus Pedidos</h2>
            <span>{filteredOrders.length} pedido(s) encontrado(s)</span>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <FaBoxOpen size={48} />
              <h3>Nenhum pedido encontrado</h3>
              <p>Quando você fizer pedidos, eles aparecerão aqui.</p>
            </div>
          ) : (
            <div className="orders-list">
              {filteredOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3>Pedido #{order.id.slice(-6).toUpperCase()}</h3>
                      <span className="order-date">{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="order-status">
                      {getStatusIcon(order.status)}
                      <span>{getStatusText(order.status)}</span>
                    </div>
                  </div>

                  <div className="order-details">
                    <div className="order-items">
                      <span>
                        {order.items.length} item(s) - {formatCurrency(order.total)}
                      </span>
                    </div>
                    <button 
                      className="view-details-btn"
                      onClick={() => viewOrderDetails(order)}
                    >
                      <FiEye />
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal de Detalhes do Pedido */}
      {showOrderDetails && (
        <div className="modal-overlay">
          <div className="order-details-modal">
            <div className="modal-header">
              <h2>Detalhes do Pedido #{showOrderDetails.id.slice(-6).toUpperCase()}</h2>
              <button className="close-btn" onClick={closeOrderDetails}>×</button>
            </div>

            <div className="modal-content">
              <div className="order-info">
                <div className="info-item">
                  <span>Data do Pedido:</span>
                  <span>{formatDate(showOrderDetails.createdAt)}</span>
                </div>
                <div className="info-item">
                  <span>Status:</span>
                  <span className={`status ${showOrderDetails.status}`}>
                    {getStatusIcon(showOrderDetails.status)}
                    {getStatusText(showOrderDetails.status)}
                  </span>
                </div>
                <div className="info-item">
                  <span>Total:</span>
                  <span>{formatCurrency(showOrderDetails.total)}</span>
                </div>
              </div>

              <div className="items-list">
                <h3>Itens do Pedido</h3>
                {showOrderDetails.items.map((item, index) => (
                  <div key={index} className="item-row">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">Qtd: {item.quantity}</span>
                    </div>
                    <span className="item-price">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="order-actions">
                <button className="btn-secondary" onClick={closeOrderDetails}>
                  Fechar
                </button>
                {showOrderDetails.status === 'pending' && (
                  <button className="btn-primary">
                    Realizar Pagamento
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}