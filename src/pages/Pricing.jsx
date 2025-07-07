export default function Pricing() {
  const plans = [
    {
      name: "Site Básico",
      price: "800",
      features: [
        "Até 5 páginas",
        "Design responsivo",
        "Formulário de contato",
        "Suporte por 1 mês"
      ],
      recommended: false
    },
    {
      name: "Site Completo",
      price: "1.500",
      features: [
        "Até 10 páginas",
        "Painel administrativo",
        "Blog integrado",
        "SEO básico",
        "Suporte por 3 meses"
      ],
      recommended: true
    },
    {
      name: "Landing Page",
      price: "600",
      features: [
        "1 página otimizada",
        "Formulário de captação",
        "Integração com WhatsApp",
        "Design high-conversion"
      ],
      recommended: false
    }
  ];

  const extras = [
    { name: "Domínio (.com.br)", price: "90/ano" },
    { name: "Hospedagem", price: "30/mês" },
    { name: "SEO Avançado", price: "400" },
    { name: "Integração com Redes Sociais", price: "200" }
  ];

  return (
    <div className="pricing-page">
      <section className="intro">
        <div className="container">
          <h1>Planos e Preços</h1>
          <p>Escolha o plano ideal para seu projeto, com ou sem domínio e hospedagem.</p>
        </div>
      </section>

      <section className="plans">
        <div className="container">
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <div key={index} className={`plan-card ${plan.recommended ? 'recommended' : ''}`}>
                {plan.recommended && <div className="recommended-badge">Recomendado</div>}
                <h3>{plan.name}</h3>
                <div className="price">R$ {plan.price}</div>
                <ul>
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <a href="/contato" className="cta-button">Contratar</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="extras">
        <div className="container">
          <h2>Extras e Adicionais</h2>
          <div className="extras-grid">
            {extras.map((extra, index) => (
              <div key={index} className="extra-item">
                <span>{extra.name}</span>
                <span>R$ {extra.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="container">
          <h2>Perguntas Frequentes</h2>
          <div className="faq-item">
            <h3>Qual o prazo de entrega?</h3>
            <p>O prazo varia conforme a complexidade do projeto, mas sites básicos são entregues em até 10 dias úteis.</p>
          </div>
          <div className="faq-item">
            <h3>Posso fazer alterações depois?</h3>
            <p>Sim, ofereço pacotes de manutenção ou você pode solicitar alterações avulsas.</p>
          </div>
          <div className="faq-item">
            <h3>Como funciona o suporte?</h3>
            <p>O suporte é realizado via WhatsApp ou e-mail, com resposta em até 24h úteis.</p>
          </div>
        </div>
      </section>
    </div>
  );
}