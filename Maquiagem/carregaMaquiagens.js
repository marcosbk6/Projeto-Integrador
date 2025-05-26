import criarProdutoHTML from "../criarProdutoHTML.js"

async function carregaMaquiagens() {
    try {
        const resposta = await fetch('http://localhost:3000/produtos/maquiagem')
        const maquiagem = await resposta.json();

        const container = document.querySelector('.produtos-grid');
        container.innerHTML = maquiagem.map(criarProdutoHTML).join('');

        document.querySelectorAll('.nome-produto').forEach(el => {
        el.addEventListener('click', () => {
        el.classList.toggle('expandido');
        });
    });
    } catch (error) {
        console.error('Erro ao carregar Maquiagens:', error)
    }
}

carregaMaquiagens();