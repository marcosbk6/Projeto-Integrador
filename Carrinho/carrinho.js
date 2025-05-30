document.addEventListener('DOMContentLoaded', () => {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const container = document.querySelector('.carrinho-itens');
  const totalDiv = document.querySelector('.total');

  // Função para atualizar a exibição do carrinho e total
  function atualizarCarrinho() {
    container.innerHTML = ''; // Limpa itens antigos
    let total = 0;

    carrinho.forEach(item => {
      const div = document.createElement('article');
      div.classList.add('produto');

      div.innerHTML = `
        <button class="close-card">&times;</button>
        <div class="produto-info">
          <h2>${item.nome}</h2>
          <p class="preco">${item.preco}</p>
        </div>
      `;

      container.appendChild(div);

      // Soma o preço do item
      const precoNum = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
      total += precoNum;
    });

    const totalFormatado = total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    totalDiv.textContent = `Total: ${totalFormatado}`;
  }

  // Chama a função para montar a tela com os itens do carrinho
  atualizarCarrinho();

  // Evento para remover item ao clicar no botão de fechar
  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-card')) {
      const index = Array.from(container.children).indexOf(e.target.closest('.produto'));
      carrinho.splice(index, 1);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      atualizarCarrinho(); // Atualiza a lista e total sem recarregar a página
    }
  });
});
