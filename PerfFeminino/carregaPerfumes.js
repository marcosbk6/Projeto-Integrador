// js/carregarPerfumes.js

// Função para criar o HTML de cada perfume
function criarProdutoHTML(produto) {
  return `
    <article class="produto">
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h2 class="nome-produto">${produto.nome}</h2>
        <p>R$ ${produto.preco.toFixed(2)}</p>
        <button class="btn-add-sacola">Adicionar a sacola</button>
      </article>
  `;
}

// Puxa os perfumes da API e coloca na section
async function carregarPerfumes() {
  try {
    const resposta = await fetch('http://localhost:3000/produtos/perfumes');
    const perfumes = await resposta.json();

    const container = document.querySelector('.produtos-grid');
    container.innerHTML = perfumes.map(criarProdutoHTML).join('');
  } catch (error) {
    console.error('Erro ao carregar perfumes:', error);
  }
}

carregarPerfumes();
