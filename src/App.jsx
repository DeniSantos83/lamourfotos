import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Heart,
  Menu,
  MessageCircle,
  Quote,
  X,
} from "lucide-react";

// Categorias exibidas nos filtros do portfólio.
const categorias = [
  "Todos",
  "Casamentos",
  "Aniversários",
  "15 anos",
  "Formaturas",
  "Batizados",
  "Corporativo",
  "Infantil",
];

// Fotografias exibidas no carrossel da capa.
// Coloque os cinco arquivos dentro de publicassets/hero.
// Para trocar uma fotografia depois, basta manter os mesmos nomes.
const fotosHero = [
  "assets/hero/hero-1.jpg",
  "assets/hero/hero-2.jpg",
  "assets/hero/hero-3.jpg",
  "assets/hero/hero-4.jpg",
  "assets/hero/hero-5.jpg",
];

// Fotos do portfólio. Para adicionar outra foto, copie uma linha e altere os dados.
// Cada categoria possui três fotografias.
// thumb: imagem menor usada na grade.
// src: imagem original aberta no lightbox.
const fotos = [
  // CASAMENTOS
  {
    thumb: "assets/thumbs/Casamento 1.jpg",
    src: "assets/Casamento 1.jpg",
    categoria: "Casamentos",
    titulo: "Detalhes que contam uma história",
  },
  {
    thumb: "assets/thumbs/Casamento 2.jpg",
    src: "assets/Casamento 2.jpg",
    categoria: "Casamentos",
    titulo: "Amor em cada instante",
  },
  {
    thumb: "assets/thumbs/Casamento 3.jpg",
    src: "assets/Casamento 3.jpg",
    categoria: "Casamentos",
    titulo: "Celebração a dois",
  },

  // ANIVERSÁRIOS
  {
    thumb: "assets/thumbs/Aniversário adulto 1.jpg",
    src: "assets/Aniversário adulto 1.jpg",
    categoria: "Aniversários",
    titulo: "Histórias que atravessam o tempo",
  },
  {
    thumb: "assets/thumbs/Aniversário adulto 2.jpg",
    src: "assets/Aniversário adulto 2.jpg",
    categoria: "Aniversários",
    titulo: "Alegria compartilhada",
  },
  {
    thumb: "assets/thumbs/Aniversário adulto 3.jpg",
    src: "assets/Aniversário adulto 3.jpg",
    categoria: "Aniversários",
    titulo: "Encontros que ficam",
  },

  // 15 ANOS
  {
    thumb: "assets/thumbs/15 anos 2.jpg",
    src: "assets/15 anos 2.jpg",
    categoria: "15 anos",
    titulo: "Um novo capítulo",
  },
  {
    thumb: "assets/thumbs/15 anos 3.jpg",
    src: "assets/15 anos 3.jpg",
    categoria: "15 anos",
    titulo: "Uma noite inesquecível",
  },
  {
    thumb: "assets/thumbs/15 anos 4.jpg",
    src: "assets/15 anos 4.jpg",
    categoria: "15 anos",
    titulo: "Brilho e personalidade",
  },

  // FORMATURAS
  {
    thumb: "assets/thumbs/Formatura 1.jpg",
    src: "assets/Formatura 1.jpg",
    categoria: "Formaturas",
    titulo: "A conquista nos detalhes",
  },
  {
    thumb: "assets/thumbs/Formatura 2.jpg",
    src: "assets/Formatura 2.jpg",
    categoria: "Formaturas",
    titulo: "O começo de novos caminhos",
  },
  {
    thumb: "assets/thumbs/Formatura 3.jpg",
    src: "assets/Formatura 3.jpg",
    categoria: "Formaturas",
    titulo: "Conquistas compartilhadas",
  },

  // BATIZADOS
  {
    thumb: "assets/thumbs/Batizado 1.jpg",
    src: "assets/Batizado 1.jpg",
    categoria: "Batizados",
    titulo: "Gestos de ternura",
  },
  {
    thumb: "assets/thumbs/Batizado 2.jpg",
    src: "assets/Batizado 2.jpg",
    categoria: "Batizados",
    titulo: "Memórias de fé",
  },
  {
    thumb: "assets/thumbs/Batizado 3.jpg",
    src: "assets/Batizado 3.jpg",
    categoria: "Batizados",
    titulo: "Um momento especial",
  },

  // CORPORATIVO
  {
    thumb: "assets/thumbs/Ensaio corporativo 1.jpg",
    src: "assets/Ensaio corporativo 1.jpg",
    categoria: "Corporativo",
    titulo: "Presença profissional",
  },
  {
    thumb: "assets/thumbs/Ensaio corporativo 2.jpg",
    src: "assets/Ensaio corporativo 2.jpg",
    categoria: "Corporativo",
    titulo: "Imagem e confiança",
  },
  {
    thumb: "assets/thumbs/Ensaio corporativo 3.jpg",
    src: "assets/Ensaio corporativo 3.jpg",
    categoria: "Corporativo",
    titulo: "Retratos autênticos",
  },

  // FESTAS INFANTIS
  {
    thumb: "assets/thumbs/Infantil 1.jpg",
    src: "assets/Infantil 1.jpg",
    categoria: "Infantil",
    titulo: "Alegria em família",
  },
  {
    thumb: "assets/thumbs/Infantil 2.jpg",
    src: "assets/Infantil 2.jpg",
    categoria: "Infantil",
    titulo: "Imaginação em festa",
  },
  {
    thumb: "assets/thumbs/Infantil 3.jpg",
    src: "assets/Infantil 3.jpg",
    categoria: "Infantil",
    titulo: "Afeto em cada gesto",
  },
];

// Produtos e formas de entrega apresentados na seção Experiência.
const materiais = [
  {
    imagem: "assets/propostas/fotos-digitais.jpg",
    titulo: "Fotos digitais",
    texto:
      "Imagens tratadas em alta resolução para guardar, compartilhar e reviver.",
  },
  {
    imagem: "assets/propostas/fotos-impressas.jpg",
    titulo: "Fotos impressas",
    texto: "Memórias que saem da tela e ganham espaço na sua história.",
  },
  {
    imagem: "assets/propostas/album.jpg",
    titulo: "Álbuns",
    texto: "Uma narrativa cuidadosamente diagramada para atravessar gerações.",
  },
  {
    imagem: "assets/propostas/fotobook.jpg",
    titulo: "Fotobook",
    texto:
      "Acabamento contemporâneo e páginas que contam cada capítulo do evento.",
  },
  {
    imagem: "assets/propostas/videomaker.jpg",
    titulo: "Videomaker",
    texto: "Movimento, som e emoção para sentir tudo outra vez.",
  },
  {
    imagem: "assets/propostas/galeria-lamour.jpg",
    titulo: "Galeria L’Amour",
    texto:
      "Uma experiência digital elegante para seus convidados acessarem as fotos.",
  },
];

// Número da Fernanda no formato internacional: Brasil (55) + DDD + telefone.
const numeroWhatsApp = "5579999448383";
const criarLinkWhatsApp = (mensagem) =>
  `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

function App() {
  // Estados que controlam menu, filtro, lightbox, depoimentos e formulário.
  const [fotoHeroAtual, setFotoHeroAtual] = useState(0);
  const [menuAberto, setMenuAberto] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [fotoAberta, setFotoAberta] = useState(null);
  const [depoimento, setDepoimento] = useState(0);
  const [nome, setNome] = useState("");
  const [tipoEvento, setTipoEvento] = useState("Casamento");
  const [dataEvento, setDataEvento] = useState("");
  // Quantidade total de depoimentos disponíveis na pasta.
  // As imagens devem estar nomeadas de dep1.jpeg até dep18.jpeg.
  const totalDepoimentos = 18;

  // Troca automaticamente a imagem do Hero a cada três segundos.
  useEffect(() => {
    const intervaloHero = window.setInterval(() => {
      setFotoHeroAtual((fotoAtual) => (fotoAtual + 1) % fotosHero.length);
    }, 3000);

    // Evita que o intervalo continue ativo quando a página for fechada.
    return () => window.clearInterval(intervaloHero);
  }, []);

  // Recalcula a galeria sempre que o visitante escolhe um filtro.
  const fotosFiltradas = useMemo(() => {
    if (categoriaAtiva === "Todos") return fotos;
    return fotos.filter((foto) => foto.categoria === categoriaAtiva);
  }, [categoriaAtiva]);

  // Permite fechar e navegar no lightbox usando o teclado.
  useEffect(() => {
    document.body.style.overflow = fotoAberta === null ? "" : "hidden";
    function controlarTeclado(evento) {
      if (fotoAberta === null) return;
      if (evento.key === "Escape") setFotoAberta(null);
      if (evento.key === "ArrowRight")
        setFotoAberta((fotoAberta + 1) % fotosFiltradas.length);
      if (evento.key === "ArrowLeft")
        setFotoAberta(
          (fotoAberta - 1 + fotosFiltradas.length) % fotosFiltradas.length,
        );
    }
    window.addEventListener("keydown", controlarTeclado);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", controlarTeclado);
    };
  }, [fotoAberta, fotosFiltradas.length]);

  // Monta uma mensagem personalizada com os dados preenchidos.
  function enviarOrcamento() {
    const apresentacao = nome.trim()
      ? `Olá, Fernanda! Meu nome é ${nome.trim()}.`
      : "Olá, Fernanda!";
    const data = dataEvento
      ? ` para o dia ${new Date(`${dataEvento}T12:00:00`).toLocaleDateString("pt-BR")}`
      : "";
    const mensagem = `${apresentacao} Gostaria de solicitar um orçamento para ${tipoEvento.toLowerCase()}${data}.`;
    window.open(criarLinkWhatsApp(mensagem), "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      {/* MENU PRINCIPAL */}
      <header className="cabecalho">
        <a className="marca" href="#inicio" aria-label="Voltar ao início">
          <img src="assets/logo-mini.png" alt="L’Amour Fotografia" />
        </a>
        <nav
          className={menuAberto ? "menu aberto" : "menu"}
          aria-label="Navegação principal"
        >
          <a href="#sobre" onClick={() => setMenuAberto(false)}>
            Sobre
          </a>
          <a href="#portfolio" onClick={() => setMenuAberto(false)}>
            Portfólio
          </a>
          <a href="#experiencia" onClick={() => setMenuAberto(false)}>
            Experiência
          </a>
          <a href="#depoimentos" onClick={() => setMenuAberto(false)}>
            Depoimentos
          </a>
          <a href="#contato" onClick={() => setMenuAberto(false)}>
            Contato
          </a>
        </nav>
        <a className="orcamento-menu" href="#contato">
          Solicitar orçamento <ArrowRight size={16} />
        </a>
        <button
          className="botao-menu"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir ou fechar menu"
        >
          {menuAberto ? <X /> : <Menu />}
        </button>
      </header>

      {/* CAPA DO SITE */}
      <section className="hero" id="inicio">
        {/* As cinco imagens ficam sobrepostas e alternam com efeito de fade. */}
        <div className="hero-carrossel" aria-hidden="true">
          {fotosHero.map((foto, indice) => (
            <img
              key={foto}
              className={
                indice === fotoHeroAtual ? "hero-imagem ativa" : "hero-imagem"
              }
              src={foto}
              alt=""
            />
          ))}
        </div>
        <div className="hero-sombra" />
        <div className="hero-conteudo">
          <p className="sobretitulo">Fotografia de histórias reais · Aracaju</p>
          <h1>
            O instante passa.
            <br />
            <em>A emoção fica.</em>
          </h1>
          <p className="hero-texto">
            Registros sensíveis, espontâneos e cheios de verdade para você
            sentir tudo outra vez.
          </p>
          <div className="hero-acoes">
            <a className="botao botao-claro" href="#portfolio">
              Conheça meu olhar <ArrowRight size={18} />
            </a>
            <a className="link-texto" href="#sobre">
              <ArrowDown size={18} /> Descubra a L’Amour
            </a>
          </div>
        </div>

        {/* Indicadores permitem selecionar uma imagem manualmente. */}
        <div
          className="hero-indicadores"
          aria-label="Selecionar fotografia da capa"
        >
          {fotosHero.map((_, indice) => (
            <button
              key={indice}
              className={indice === fotoHeroAtual ? "ativo" : ""}
              onClick={() => setFotoHeroAtual(indice)}
              aria-label={`Visualizar fotografia ${indice + 1}`}
              aria-current={indice === fotoHeroAtual ? "true" : undefined}
            />
          ))}
        </div>
      </section>

      {/* APRESENTAÇÃO DA FERNANDA */}
      <section className="sobre secao" id="sobre">
        <TituloSecao numero="01" texto="Sobre a fotógrafa" />
        <div className="sobre-grid">
          <div className="retrato">
            <img src="assets/profile.jpg" alt="Fernanda L’Amour fotografando" />
            <div className="nota-retrato">
              <Camera size={18} />
              <span>Um olhar atento ao que é verdadeiro</span>
            </div>
          </div>
          <div className="sobre-texto">
            <p className="assinatura">Fernanda L’Amour</p>
            <h2>
              Fotografar é perceber o que acontece <em>entre os momentos.</em>
            </h2>
            <p>
              Sou fotógrafa apaixonada por registrar a essência de cada
              história. Meu trabalho une sensibilidade e técnica para encontrar
              os gestos, os olhares e os detalhes que tornam seu momento único.
            </p>
            <p>
              Casamentos, aniversários, formaturas, batizados, 15 anos, festas
              infantis e retratos corporativos — cada experiência é conduzida
              com presença, leveza e cuidado.
            </p>
          </div>
        </div>
      </section>

      {/* PORTFÓLIO COM FILTROS */}
      <section className="portfolio secao" id="portfolio">
        <TituloSecao numero="02" texto="Portfólio" claro />
        <div className="portfolio-titulo">
          <h2>Histórias em imagens</h2>
          <p>
            Explore alguns dos momentos que tive o privilégio de transformar em
            memória.
          </p>
        </div>
        <div className="filtros" role="tablist">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              className={categoriaAtiva === categoria ? "ativo" : ""}
              onClick={() => setCategoriaAtiva(categoria)}
            >
              {categoria}
            </button>
          ))}
        </div>
        <div className="grade-fotos">
          {fotosFiltradas.map((foto, indice) => (
            <button
              className="foto-card"
              key={foto.src}
              onClick={() => setFotoAberta(indice)}
            >
              {/* A grade utiliza a miniatura para carregar mais rapidamente. */}
              <img src={foto.thumb} alt={foto.titulo} loading="lazy" />
              <span className="foto-legenda">
                <small>{foto.categoria}</small>
                <strong>{foto.titulo}</strong>
                <ArrowRight size={20} />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* MATERIAIS E FORMAS DE ENTREGA */}
      <section className="experiencia secao" id="experiencia">
        <TituloSecao numero="03" texto="A experiência" />
        <div className="experiencia-titulo">
          <h2>
            Seu momento,
            <br />
            <em>do seu jeito.</em>
          </h2>
          <p>
            A fotografia é o começo. A forma como você guarda e compartilha essa
            história também merece cuidado.
          </p>
        </div>
        <div className="lista-materiais">
          {materiais.map((item, indice) => (
            <article className="material" key={item.titulo}>
              <span>{String(indice + 1).padStart(2, "0")}</span>
              <img src={item.imagem} alt={item.titulo} loading="lazy" />
              <div>
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
              </div>
              <ArrowRight />
            </article>
          ))}
        </div>
      </section>

      <section className="frase">
        <Quote size={32} />
        <p>
          Não entrego apenas fotografias.
          <br />
          <em>Entrego caminhos de volta.</em>
        </p>
      </section>

      {/* CARROSSEL DE DEPOIMENTOS */}
      <section className="depoimentos secao" id="depoimentos">
        <TituloSecao numero="04" texto="Quem já viveu" claro />
        <div className="depoimentos-grid">
          <div>
            <h2>Palavras que também contam histórias.</h2>
            <p>
              Mensagens espontâneas de pessoas que confiaram seus momentos à
              L’Amour.
            </p>
            <div className="controles">
              {/* Volta para o depoimento anterior.
      Quando estiver no primeiro, volta para o último. */}
              <button
                onClick={() =>
                  setDepoimento(
                    (depoimento - 1 + totalDepoimentos) % totalDepoimentos,
                  )
                }
                aria-label="Depoimento anterior"
              >
                <ChevronLeft />
              </button>

              {/* Mostra a posição atual e a quantidade total. */}
              <span>
                {String(depoimento + 1).padStart(2, "0")} / {totalDepoimentos}
              </span>

              {/* Avança para o próximo depoimento.
      Depois do último, retorna ao primeiro. */}
              <button
                onClick={() =>
                  setDepoimento((depoimento + 1) % totalDepoimentos)
                }
                aria-label="Próximo depoimento"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
          <div className="depoimento-card">
            <img
              src={`assets/depoimentos/dep${depoimento + 1}.jpeg`}
              alt={`Depoimento ${depoimento + 1}`}
            />
          </div>
        </div>
      </section>

      {/* FORMULÁRIO QUE ENVIA A SOLICITAÇÃO PARA O WHATSAPP */}
      <section className="contato secao" id="contato">
        <div className="contato-foto">
          <img src="assets/Casamento 2.jpg" alt="Buquê de casamento" />
          <span>
            <Heart size={16} /> Seu momento merece ser eterno
          </span>
        </div>
        <div className="contato-conteudo">
          <TituloSecao numero="05" texto="Vamos conversar" />
          <h2>Conte um pouco sobre o seu momento.</h2>
          <p>
            Preencha os dados e abra uma conversa personalizada comigo no
            WhatsApp.
          </p>
          <div className="formulario">
            <label>
              Como posso chamar você?
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
              />
            </label>
            <label>
              Qual será o momento?
              <select
                value={tipoEvento}
                onChange={(e) => setTipoEvento(e.target.value)}
              >
                <option>Casamento</option>
                <option>Aniversário</option>
                <option>15 anos</option>
                <option>Formatura</option>
                <option>Batizado</option>
                <option>Ensaio corporativo</option>
                <option>Festa infantil</option>
                <option>Outro evento</option>
              </select>
            </label>
            <label>
              Já tem uma data?
              <input
                type="date"
                value={dataEvento}
                onChange={(e) => setDataEvento(e.target.value)}
              />
            </label>
            <button className="botao botao-escuro" onClick={enviarOrcamento}>
              <MessageCircle size={19} /> Solicitar orçamento
            </button>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer>
        <img src="assets/logo.png" alt="L’Amour Fotografia" />
        <p>Momentos únicos. Memórias eternas.</p>
        <div>
          <a href="https://instagram.com/lamourfotografia_" target="_blank">
            Instagram
          </a>
          <a
            href={criarLinkWhatsApp(
              "Olá, Fernanda! Conheci seu trabalho pelo site.",
            )}
            target="_blank"
          >
            WhatsApp
          </a>
        </div>
      </footer>

      {/* BOTÃO FIXO DO WHATSAPP */}
      <a
        className="whatsapp"
        href={criarLinkWhatsApp(
          "Olá, Fernanda! Gostaria de solicitar um orçamento.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar pelo WhatsApp"
      >
        <img src="assets/whatsapp-icon.png" alt="WhatsApp" />
      </a>

      {/* LIGHTBOX: EXIBE A FOTO EM TELA CHEIA */}
      {fotoAberta !== null && (
        <div className="lightbox" onClick={() => setFotoAberta(null)}>
          <button className="fechar" onClick={() => setFotoAberta(null)}>
            <X />
          </button>
          <button
            className="anterior"
            onClick={(e) => {
              e.stopPropagation();
              setFotoAberta(
                (fotoAberta - 1 + fotosFiltradas.length) %
                  fotosFiltradas.length,
              );
            }}
          >
            <ChevronLeft />
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img
              src={fotosFiltradas[fotoAberta].src}
              alt={fotosFiltradas[fotoAberta].titulo}
            />
            <figcaption>{fotosFiltradas[fotoAberta].titulo}</figcaption>
          </figure>
          <button
            className="proxima"
            onClick={(e) => {
              e.stopPropagation();
              setFotoAberta((fotoAberta + 1) % fotosFiltradas.length);
            }}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </main>
  );
}

// Pequeno componente reutilizado no início de cada seção.
function TituloSecao({ numero, texto, claro = false }) {
  return (
    <div className={`titulo-secao ${claro ? "claro" : ""}`}>
      <span>{numero}</span>
      <p>{texto}</p>
    </div>
  );
}

export default App;
