// Função para criar o HTML de cada perfume
export default function criarProdutoHTML(produto) {
  return `
    <article class="produto">
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h2 class="nome-produto">${produto.nome}</h2>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button class="btn-add-sacola">Adicionar a sacola</button>
    </article>
  `;
}

