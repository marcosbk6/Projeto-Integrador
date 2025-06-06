import configurarBotoesCarrinho from '../adicionaAoCarrinho.js';
async function carregarCarrossel() {
  try {
    const resposta = await fetch('http://localhost:3000/produtos');
    const dados = await resposta.json();

    // Juntar os arrays numa só lista de produtos
    const produtos = [
      ...dados.perfumes,
      ...dados.hidratantes,
      ...dados.maquiagem
    ];

    console.log(produtos); // Para conferir no console

    const nomesDesejados = ['Kaiak Aero Masculino', 'Ilía Laços Feminino'];
    const destaques = produtos.filter(produto => nomesDesejados.includes(produto.nome));

    const carrossel = document.getElementById('carrossel');
    carrossel.innerHTML = ''; // Limpa antes de inserir

    destaques.forEach(produto => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <img src="${produto.imagemDestaque}" alt="${produto.nome}">
        <div class="descricao-carrossel">
          <h2>${produto.nome}</h2>
          <p>R$${produto.preco.toFixed(2)}</p>
          <button class="btn-add-sacola" id="btn-add-sacola-carrossel">Adicionar à sacola</button>
        </div>
      `;

      carrossel.appendChild(card);
    });

  } catch (error) {
    console.error('Erro ao carregar produtos em destaque:', error);
  }
}

carregarCarrossel();


