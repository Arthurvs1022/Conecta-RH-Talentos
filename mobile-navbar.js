class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li",
);
mobileNavbar.init();

// Lógica para o efeito de scroll no header e para a filtragem de vagas
document.addEventListener('DOMContentLoaded', function() {
    // Lógica do Header Scroll
    const header = document.querySelector('header');
    const scrollThreshold = 50; 

    function checkScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }

    checkScroll();
    window.addEventListener('scroll', checkScroll);

    // ====================================
    // LÓGICA DE FILTRO DE VAGAS (vagas.html)
    // ====================================
    
    const listaVagas = document.querySelector('.lista-vagas');
    const vagas = listaVagas ? listaVagas.querySelectorAll('li') : [];
    const btnAplicar = document.querySelector('.btn-aplicar');

    if (btnAplicar) {
        btnAplicar.addEventListener('click', aplicarFiltros);
    }

    function aplicarFiltros() {
        // Coleta os valores selecionados nos filtros.
        const filtroLocalizacao = document.getElementById('filtro-localizacao').value;
        const filtroNivel = document.getElementById('filtro-nivel').value;
        const filtroModalidade = document.getElementById('filtro-modalidade').value;
        const filtroPcd = document.getElementById('filtro-pcd').value;

        vagas.forEach(vaga => {
            // Coleta os atributos de dados (data-) de cada vaga.
            const vagaLocalizacao = vaga.getAttribute('data-localizacao');
            const vagaNivel = vaga.getAttribute('data-nivel');
            const vagaModalidade = vaga.getAttribute('data-modalidade');
            const vagaPcd = vaga.getAttribute('data-pcd');

            let mostrar = true;

            // 1. Verifica Localização
            if (filtroLocalizacao && filtroLocalizacao !== '' && vagaLocalizacao !== filtroLocalizacao) {
                mostrar = false;
            }

            // 2. Verifica Nível
            if (filtroNivel && filtroNivel !== '' && vagaNivel !== filtroNivel) {
                mostrar = false;
            }

            // 3. Verifica Modalidade
            if (filtroModalidade && filtroModalidade !== '' && vagaModalidade !== filtroModalidade) {
                mostrar = false;
            }

            // 4. Verifica PCD
            if (filtroPcd && filtroPcd !== '' && vagaPcd !== filtroPcd) {
                mostrar = false;
            }

            // Aplica o estilo: 'list-item' para mostrar, 'none' para esconder.
            vaga.style.display = mostrar ? 'list-item' : 'none';
        });
    }

    // ====================================
    // LÓGICA DE ABAS (treinamento.html)
    // ====================================

    document.querySelectorAll('.btn-aba').forEach(button => {
        button.addEventListener('click', function() {
            // 1. Remove a classe 'active' de todas as abas e botões
            document.querySelectorAll('.btn-aba').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.aba-conteudo').forEach(content => content.classList.remove('active'));

            // 2. Adiciona a classe 'active' ao botão clicado
            this.classList.add('active');

            // 3. Encontra o ID do conteúdo correspondente e ativa
            // Faz a conversão do texto do botão para o ID (ex: "Dicas & Blog" -> "dicas-blog")
            const targetId = this.textContent.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-').replace(/á/g, 'a').replace(/õ/g, 'o');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});