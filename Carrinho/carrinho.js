document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.carrinho-itens');
  const totalDiv = document.querySelector('.total');

  async function atualizarCarrinho() {
    try {
      const resposta = await fetch('http://localhost:3000/carrinho');
      const carrinho = await resposta.json();

      container.innerHTML = '';
      let total = 0;

      carrinho.forEach((item, index) => {
        const div = document.createElement('article');
        div.classList.add('produto');

        div.innerHTML = `
          <button class="close-card" data-index="${index}">&times;</button>
          <div class="produto-info">
            <h2>${item.nome}</h2>
            <p class="preco">${item.preco}</p>
          </div>
        `;

        container.appendChild(div);

        const precoNum = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
        total += precoNum;
      });

      totalDiv.textContent = `Total: ${total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })}`;
    } catch (err) {
      console.error('Erro ao buscar carrinho:', err);
    }
  }

  // Remover item do carrinho
  container.addEventListener('click', async (e) => {
    if (e.target.classList.contains('close-card')) {
      const index = e.target.getAttribute('data-index');
      try {
        await fetch(`http://localhost:3000/carrinho/${index}`, {
          method: 'DELETE',
        });
        atualizarCarrinho();
      } catch (err) {
        console.error('Erro ao remover item:', err);
      }
    }
  });

  atualizarCarrinho();
});
