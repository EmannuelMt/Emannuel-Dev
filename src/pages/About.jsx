export default function About() {
  return (
    <div className="about-page">
      <section className="profile">
        <div className="container">
          <div className="profile-content">
            <div className="profile-image">
              <img src="/profile-placeholder.jpg" alt="Emannuel Dev" />
            </div>
            <div className="profile-text">
              <h1>Sobre Mim</h1>
              <p>Olá, sou Emannuel, desenvolvedor web especializado em criar soluções digitais eficientes e acessíveis.</p>
              <p>Com mais de 3 anos de experiência, já ajudei dezenas de clientes a estabelecerem sua presença online com sites rápidos, modernos e bots automatizados que realmente resolvem problemas.</p>
              <p>Minha abordagem é focada em entender suas necessidades específicas para entregar exatamente o que seu negócio precisa, sem complicações.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="container">
          <h2>Meus Valores</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Transparência</h3>
              <p>Preços justos e claros desde o início, sem surpresas.</p>
            </div>
            <div className="value-card">
              <h3>Qualidade</h3>
              <p>Código limpo, documentado e de fácil manutenção.</p>
            </div>
            <div className="value-card">
              <h3>Compromisso</h3>
              <p>Entrega no prazo combinado e suporte pós-entrega.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="different">
        <div className="container">
          <h2>O que me diferencia</h2>
          <ul>
            <li>Atendimento personalizado e direto</li>
            <li>Comunicação clara em todas as etapas</li>
            <li>Soluções sob medida, não templates genéricos</li>
            <li>Preços acessíveis para pequenos negócios</li>
          </ul>
        </div>
      </section>
    </div>
  );
}