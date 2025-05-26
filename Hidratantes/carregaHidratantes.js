import criarProdutoHTML from "../criarProdutoHTML.js";

async function carregaHidratantes(){
    try{
        const resposta = await fetch('http://localhost:3000/produtos/hidratantes')
        const perfumes = await resposta.json();

        const container = document.querySelector('.produtos-grid');
        container.innerHTML = perfumes.map(criarProdutoHTML).join('');

        document.querySelectorAll('.nome-produto').forEach(el => {
        el.addEventListener('click', () => {
        el.classList.toggle('expandido');
        });
    }); 
    } catch (error) {
        console.error('Erro ao carregar  Hidratantes:', error);
    }
}

carregaHidratantes();