// ====================================
// CLASSE PARA O MENU MOBILE (HAMBURGER)
// ====================================
class MobileNavbar {
  // O 'constructor' armazena as referências aos elementos do menu
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active"; // Classe que ativa/desativa os menus

    // O .bind(this) garante que o 'this' dentro do handleClick seja a classe MobileNavbar
    this.handleClick = this.handleClick.bind(this);
  }

  // Anima os links do menu (efeito fade-in)
  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  // O 'handleClick' é chamado quando o ícone hamburger é clicado
  handleClick() {
    // Adiciona/remove a classe 'active' do menu (para fazê-lo aparecer/sumir)
    this.navList.classList.toggle(this.activeClass);
    // Adiciona/remove a classe 'active' do ícone (para animar de hamburger para 'X')
    this.mobileMenu.classList.toggle(this.activeClass);
    // Chama a animação dos links
    this.animateLinks();
  }

  // Adiciona o evento de clique ao ícone do menu
  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  // Inicia a classe e adiciona o evento de clique
  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

// Inicializa a classe, passando os seletores do CSS
const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li",
);
mobileNavbar.init();

// ====================================
// LÓGICAS ADICIONAIS DO SITE
// ====================================

// Espera o HTML ser totalmente carregado antes de executar o JS
document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================
    // Lógica do Header Scroll (Efeito de encolher o header)
    // ====================================
    const header = document.querySelector('header');
    const scrollThreshold = 50; // Distância em pixels para o header encolher

    function checkScroll() {
        // Se o usuário rolou a página mais que 'scrollThreshold' pixels...
        if (window.scrollY > scrollThreshold) {
            header.classList.add('header-scrolled'); // Adiciona a classe que encolhe (definida no CSS)
        } else {
            header.classList.remove('header-scrolled'); // Remove a classe
        }
    }

    checkScroll(); // Verifica o scroll assim que a página carrega
    window.addEventListener('scroll', checkScroll); // Verifica o scroll continuamente

    // ====================================
    // LÓGICA DE FILTRO DE VAGAS (vagas.html)
    // ====================================
    
    // Seleciona os elementos da página de vagas
    const listaVagas = document.querySelector('.lista-vagas');
    const vagas = listaVagas ? listaVagas.querySelectorAll('li') : []; // Pega todos os <li> da lista
    const btnAplicar = document.querySelector('.btn-aplicar');

    // Adiciona o evento de clique no botão "Aplicar Filtros"
    if (btnAplicar) {
        btnAplicar.addEventListener('click', aplicarFiltros);
    }

    function aplicarFiltros() {
        // 1. Coleta os valores selecionados nos <select>
        const filtroLocalizacao = document.getElementById('filtro-localizacao').value;
        const filtroNivel = document.getElementById('filtro-nivel').value;
        const filtroModalidade = document.getElementById('filtro-modalidade').value;
        const filtroPcd = document.getElementById('filtro-pcd').value;

        // 2. Passa por cada vaga (<li>) e decide se ela deve ser mostrada
        vagas.forEach(vaga => {
            // Coleta os atributos 'data-' da vaga (ex: data-localizacao="recife")
            const vagaLocalizacao = vaga.getAttribute('data-localizacao');
            const vagaNivel = vaga.getAttribute('data-nivel');
            const vagaModalidade = vaga.getAttribute('data-modalidade');
            const vagaPcd = vaga.getAttribute('data-pcd');

            let mostrar = true; // A vaga é mostrada por padrão

            // 3. Lógica de verificação: se qualquer filtro não bater, a vaga é escondida
            if (filtroLocalizacao && filtroLocalizacao !== '' && vagaLocalizacao !== filtroLocalizacao) {
                mostrar = false;
            }
            if (filtroNivel && filtroNivel !== '' && vagaNivel !== filtroNivel) {
                mostrar = false;
            }
            if (filtroModalidade && filtroModalidade !== '' && vagaModalidade !== filtroModalidade) {
                mostrar = false;
            }
            if (filtroPcd && filtroPcd !== '' && vagaPcd !== filtroPcd) {
                mostrar = false;
            }

            // 4. Aplica o estilo: 'list-item' para mostrar, 'none' para esconder.
            vaga.style.display = mostrar ? 'list-item' : 'none';
        });
    }

    // ====================================
    // LÓGICA DE ABAS (treinamento.html)
    // ====================================

    // Adiciona um evento de clique em CADA botão de aba
    document.querySelectorAll('.btn-aba').forEach(button => {
        button.addEventListener('click', function() {
            
            // 1. Remove a classe 'active' de todos os botões e de todos os conteúdos
            document.querySelectorAll('.btn-aba').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.aba-conteudo').forEach(content => content.classList.remove('active'));

            // 2. Adiciona a classe 'active' APENAS ao botão que foi clicado
            this.classList.add('active');

            // 3. Encontra o ID do conteúdo correspondente e o ativa
            // (Converte o texto do botão, ex: "Dicas & Blog", para um ID, ex: "dicas-blog")
            const targetId = this.textContent.toLowerCase()
                                .replace(/ & /g, '-')
                                .replace(/ /g, '-')
                                .replace(/á/g, 'a')
                                .replace(/õ/g, 'o');
            
            const targetContent = document.getElementById(targetId);
            
            // 4. Se o conteúdo existir, adiciona a classe 'active' para mostrá-lo
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});