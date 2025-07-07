export default function Portfolio() {
  const projects = [
    {
      name: "Loja Virtual - Moda Esportiva",
      description: "E-commerce completo com catálogo de produtos, carrinho e integração com pagamentos.",
      image: "/placeholder-project1.jpg"
    },
    {
      name: "Bot de Música - Discord",
      description: "Bot para reprodução de música em servidores Discord com fila e controles intuitivos.",
      image: "/placeholder-project2.jpg"
    },
    {
      name: "Landing Page - Consultoria",
      description: "Página de captação de leads para empresa de consultoria financeira.",
      image: "/placeholder-project3.jpg"
    },
    {
      name: "Site Institucional - Advogados",
      description: "Site profissional para escritório de advocacia com blog integrado.",
      image: "/placeholder-project4.jpg"
    }
  ];

  return (
    <div className="portfolio-page">
      <section className="intro">
        <div className="container">
          <h1>Portfólio</h1>
          <p>Conheça alguns dos projetos que desenvolvi para clientes reais</p>
        </div>
      </section>

      <section className="projects-grid">
        <div className="container">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.name} />
              </div>
              <div className="project-info">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="case-study">
        <div className="container">
          <h2>Caso de Sucesso: Bot de Atendimento</h2>
          <p>Desenvolvi um bot automatizado para um servidor Discord com mais de 5.000 membros, reduzindo em 70% o tempo de resposta às dúvidas frequentes e automatizando o processo de boas-vindas.</p>
          <div className="results">
            <div className="result-item">
              <span>+300%</span>
              <p>Engajamento</p>
            </div>
            <div className="result-item">
              <span>-70%</span>
              <p>Tempo de resposta</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}