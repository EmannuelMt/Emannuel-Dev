import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <header className="privacy-header">
        <h1 className="privacy-title">POLÍTICA DE PRIVACIDADE</h1>
        <p className="last-updated">Última atualização: 15 de setembro de 2025</p>
      </header>
      
      <div className="section">
        <h2 className="section-title">Controlador e Contato</h2>
        <div className="contact-info">
          <p><strong>Controlador:</strong> Emannuel Dev — [inserir nome/razão social completa, CPF/CNPJ, endereço]</p>
          <p><strong>Contato para privacidade / Encarregado (DPO):</strong> [nome do Encarregado / e-mail / telefone]</p>
          <p><em>(Preencha esses campos antes de publicar.)</em></p>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">1. Escopo e finalidade</h2>
        <p>Esta Política descreve como o controlador acima indicado coleta, utiliza, armazena, compartilha e protege dados pessoais por meio do site <span className="highlight">https://emannueldev.netlify.app/</span> e serviços relacionados, e informa os direitos dos titulares. Ela segue a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018) e as orientações da Autoridade Nacional de Proteção de Dados (ANPD).</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">2. Definições rápidas</h2>
        <div className="subsection">
          <h3 className="subsection-title">Dados pessoais</h3>
          <p>qualquer informação relacionada a pessoa natural identificada ou identificável.</p>
        </div>
        <div className="subsection">
          <h3 className="subsection-title">Dados sensíveis</h3>
          <p>categoria especial (origem racial, convicções, saúde, biometria etc.) com proteção reforçada. Tratamento só com hipóteses legais específicas.</p>
        </div>
        <div className="subsection">
          <h3 className="subsection-title">Controlador</h3>
          <p>quem decide as finalidades e meios do tratamento.</p>
        </div>
        <div className="subsection">
          <h3 className="subsection-title">Operador</h3>
          <p>quem executa o tratamento em nome do controlador.</p>
        </div>
        <div className="subsection">
          <h3 className="subsection-title">Titular</h3>
          <p>você, dono dos dados.</p>
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">3. Que dados coletamos (categorias)</h2>
        <p>Podemos coletar, dependendo do uso:</p>
        <ul>
          <li><strong>Identificação e contato:</strong> nome, e-mail, telefone, país, cidade.</li>
          <li><strong>Acesso e autenticação:</strong> e-mail de login, hash de senha (quando aplicável).</li>
          <li><strong>Dados de pagamento/faturamento:</strong> quando você compra serviços (token de pagamento, CPF/CNPJ, endereço, comprovante fiscal) — somente via provedores de pagamento.</li>
          <li><strong>Dados de navegação e dispositivo:</strong> endereço IP, user-agent, tipo de dispositivo, sistema operacional, horário de acesso, páginas visitadas, tempo de permanência, erros (logs).</li>
          <li><strong>Cookies e identificadores online:</strong> identificadores armazenados em navegador/dispositivo (veja seção de cookies).</li>
          <li><strong>Conteúdo gerado pelo usuário:</strong> mensagens enviadas via formulário ou comentários.</li>
          <li><strong>Dados sensíveis:</strong> não coletamos dados sensíveis por padrão; se precisar (ex.: suporte médico), será pedido consentimento explícito e destacado.</li>
        </ul>
      </div>
      
      <div className="section">
        <h2 className="section-title">4. Bases legais para o tratamento</h2>
        <p>Tratamos dados com bases legais previstas na LGPD, conforme a finalidade:</p>
        <ul>
          <li><strong>Consentimento</strong> — quando você concorda livremente (ex.: newsletter).</li>
          <li><strong>Execução de contrato</strong> — quando necessário para prestar um serviço que você contratou.</li>
          <li><strong>Cumprimento de obrigação legal/regulatória</strong> — por exemplo, guarda fiscal.</li>
          <li><strong>Legítimo interesse</strong> — para segurança, prevenção a fraudes, melhorias de produto e análise de uso, sempre avaliando balanceamento com seus direitos. (Aplicável somente quando não houver prevalência dos direitos do titular.)</li>
        </ul>
      </div>
      
      <div className="section">
        <h2 className="section-title">5. Propósitos do uso (exemplos práticos)</h2>
        <ul>
          <li><strong>Operação do site e infraestrutura:</strong> hospedagem, logs, segurança. (base: execução de contrato / legítimo interesse)</li>
          <li><strong>Atendimento e suporte:</strong> responder mensagens, resolver problemas. (base: execução de contrato / consentimento)</li>
          <li><strong>Marketing:</strong> envio de e-mail promocional se autorizado. (base: consentimento)</li>
          <li><strong>Cobrança e faturamento:</strong> processamento de pagamentos, obrigações fiscais. (base: execução de contrato / obrigação legal)</li>
          <li><strong>Análise e melhoria do produto:</strong> métricas e analytics (anonimizadas quando possível). (base: legítimo interesse / consentimento para analytics não essenciais)</li>
        </ul>
      </div>
      
      <div className="section">
        <h2 className="section-title">6. Retenção de dados — por quanto tempo guardamos</h2>
        <p>Guardamos dados pelo tempo necessário para cumprir a finalidade. Exemplos práticos (ajuste conforme seu caso):</p>
        <ul>
          <li><strong>Contas e dados de perfil:</strong> enquanto a conta existir + período residual para cumprimento de obrigações legais.</li>
          <li><strong>Logs e dados de navegação:</strong> até 6–24 meses para analytics e segurança (depende do risco).</li>
          <li><strong>Marketing (lista de e-mails):</strong> enquanto houver consentimento; até revogação/opt-out.</li>
          <li><strong>Dados fiscais e contábeis:</strong> mínimo de 5 anos quando aplicável por obrigação tributária (Código Tributário Nacional).</li>
          <li><strong>Dados de cobrança e contratos:</strong> enquanto vigorar obrigação contratual + prazo legal aplicável.</li>
        </ul>
        <p>Obs.: quando possível, anonimizamos dados para manter histórico estatístico sem identificação.</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">7. Como protegemos seus dados (medidas de segurança)</h2>
        <p>Adotamos medidas técnicas e administrativas compatíveis com a natureza do tratamento: TLS/HTTPS, hashing para senhas, backups, controle de acesso por privilégios mínimos, políticas internas, atualização de softwares, logs de acesso e avaliações periódicas de vulnerabilidade. Essas medidas seguem o dever de segurança da LGPD (art. 46) e boas práticas de privacidade desde a concepção.</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">8. Incidentes de segurança / vazamento</h2>
        <p>Se houver um incidente de segurança que possa acarretar risco ou dano relevante aos titulares, será feita avaliação e, quando aplicável, comunicação à ANPD e aos titulares, nos termos do art. 48 da LGPD e do regulamento da ANPD sobre comunicação de incidentes. A ANPD e a jurisprudência orientam procedimentos ágeis; práticas de mercado recomendam notificar a autoridade e titulares tão logo seja possível, compatível com a investigação (a ANPD regulou procedimentos para isso).</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">9. Compartilhamento de dados com terceiros</h2>
        <p>Podemos compartilhar dados com:</p>
        <ul>
          <li>Operadores e provedores de serviço (hospedagem, e-mail, CDN, gateways de pagamento, ferramentas de analytics) mediante contratos que exigem confidencialidade e segurança.</li>
          <li>Autoridades públicas quando exigido por lei ou ordem judicial.</li>
          <li>Parceiros comerciais quando necessário e com garantias contratuais.</li>
        </ul>
        <p>Para transferências internacionais, adotamos mecanismos previstos na LGPD (decisão de adequação, cláusulas contratuais, normas corporativas globais etc.) conforme regulamentação da ANPD sobre transferências internacionais.</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">10. Cookies e tecnologias semelhantes</h2>
        <p>Usamos cookies para: funcionamento do site (essenciais), preferências, análise (analytics) e, se houver, publicidade. Você pode gerenciar them via banner/consentimento e pelas configurações do navegador. Para orientações aplicáveis e exemplos de boas práticas sobre cookies, consulte a ANPD.</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">11. Direitos do titular e como exercê-los</h2>
        <p>Na forma da LGPD, você tem direito a:</p>
        <ul>
          <li>confirmação da existência de tratamento;</li>
          <li>acesso aos dados;</li>
          <li>correção de dados incompletos/inexatos;</li>
          <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados irregularmente;</li>
          <li>portabilidade;</li>
          <li>eliminação de dados tratados com base em consentimento;</li>
          <li>informação sobre compartilhamento;</li>
          <li>revogação do consentimento;</li>
          <li>oposição ao tratamento baseado em legítimo interesse;</li>
          <li>revisão de decisões automatizadas.</li>
        </ul>
        <p><strong>Prazo de resposta:</strong> respostas em formato simplificado devem ser imediatas; respostas completas (declaração clara e completa) serão fornecidas em até 15 (quinze) dias, a contar do requerimento, conforme art. 19 da LGPD.</p>
        <p><strong>Como solicitar:</strong> envie pedido para [email@seudominio] ou via formulário de contato em [URL do formulário]. Para segurança, podemos solicitar documentos para confirmar identidade.</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">12. Tratamento de dados de crianças e adolescentes</h2>
        <p>O tratamento de dados de crianças deve respeitar o melhor interesse da criança; quando aplicável, será obtido consentimento específico e destacado dos pais/responsáveis, com verificações razoáveis de autenticidade, conforme art. 14 da LGPD e enunciados da ANPD.</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">13. Responsabilidades do controlador e do encarregado</h2>
        <p>O controlador é responsável por adotar medidas de conformidade e segurança; o encarregado (DPO), quando indicado, funciona como canal entre o controlador, titulares e ANPD e deve ter identidade e contato públicos (art. 41 da LGPD). Para agentes de pequeno porte existem regras simplificadas previstas pela ANPD.</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">14. Transferências internacionais (detalhes)</h2>
        <p>Quando transferimos dados para fora do Brasil adotamos mecanismos autorizados pela LGPD (decisão de adequação, cláusulas contratuais, normas corporativas globais, etc.) e seguimos o regulamento da ANPD sobre transferências internacionais (Resolução/Regulamento aplicável). Você será informado quando houver transferência e quais garantias contratuais existem.</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">15. Registros e prestação de contas</h2>
        <p>Mantemos registro das operações de tratamento conforme exigido pelo art. 37 da LGPD; esse inventário documenta finalidades, bases legais, categorias de dados, fluxos e medidas de segurança. Esses registros apoiam auditoria e pedidos da ANPD.</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">16. Mineração e decisões automatizadas / perfilamento</h2>
        <p>Caso haja uso de processamento automatizado que gere decisão sobre você ou perfilamento para fins comerciais, informaremos finalidade, lógica envolvida e forneceremos meios para revisão humana, quando aplicável. Você pode solicitar revisão ou contestar decisões automatizadas.</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">17. Alterações desta Política</h2>
        <p>Podemos atualizar esta Política. Publicaremos a data da última atualização. Mudanças substanciais serão comunicadas por e-mail quando possível e/ou por aviso no site.</p>
      </div>
      
      <div className="section">
        <h2 className="section-title">18. Reclamações e ANPD</h2>
        <p>Se você não estiver satisfeito com nossa resposta, pode apresentar reclamação à ANPD nos canais oficiais. Também é possível recorrer aos órgãos de defesa do consumidor e ao Judiciário.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;