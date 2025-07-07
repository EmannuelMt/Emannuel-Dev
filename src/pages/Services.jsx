export default function Services() {
  const services = [
    {
      title: "Bots Automatizados (Discord)",
      description: "Crio bots personalizados para seu servidor Discord com as funcionalidades que você precisa. Desde bots simples de moderação até sistemas complexos de rankeamento e economia virtual.",
      price: "A partir de R$ 300,00"
    },
    {
      title: "Sites Institucionais / Portfólios",
      description: "Desenvolvo sites responsivos e modernos para apresentar seu negócio ou trabalho. Design clean, navegação intuitiva e otimizado para dispositivos móveis.",
      price: "A partir de R$ 800,00"
    },
    {
      title: "Landing Pages Estratégicas",
      description: "Páginas focadas em conversão com call-to-action claro, formulários otimizados e integração direta com WhatsApp para captação de leads.",
      price: "A partir de R$ 600,00"
    },
    {
      title: "Painel Administrativo",
      description: "Sistema para você gerenciar o conteúdo do seu site sem precisar de conhecimento técnico. Atualize textos, imagens e seções facilmente.",
      price: "A partir de R$ 400,00"
    }
  ];

  return (
    <div className="services-page">
      <section className="intro">
        <div className="container">
          <h1>Nossos Serviços</h1>
          <p className="subtitle">Soluções digitais personalizadas para atender suas necessidades específicas</p>
        </div>
      </section>

      <section className="services-list">
        <div className="container">
          {services.map((service, index) => (
            <div key={index} className="service-item">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <div className="price">{service.price}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="custom-service">
        <div className="container">
          <h2>Não encontrou o que precisa?</h2>
          <p>Entre em contato para um orçamento personalizado!</p>
          <a href="/contato" className="cta-button">Solicitar Orçamento</a>
        </div>
      </section>
    </div>
  );
}