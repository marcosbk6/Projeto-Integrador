export default function configurarBotoesCarrinho() {
  document.removeEventListener('click', handleClick);
  document.addEventListener('click', handleClick);
}

function handleClick(e) {
  if (e.target.classList.contains('btn-add-sacola')) {
    const card = e.target.closest('.card, .produto');
    
    if (!card) {
      console.warn('Elemento pai (.card ou .produto) não encontrado para o botão clicado:', e.target);
      return; // sai da função para não dar erro
    }

    const nomeElem = card.querySelector('h2');
    const precoElem = card.querySelector('p');

    if (!nomeElem || !precoElem) {
      console.warn('Elemento nome ou preço não encontrado no card:', card);
      return;
    }

    const nome = nomeElem.innerText;
    const preco = precoElem.innerText;

    const produto = { nome, preco };

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert('Produto adicionado à sacola!');
  }
}
