export default function configurarBotoesCarrinho() {
  document.removeEventListener('click', handleClick);
  document.addEventListener('click', handleClick);
}

function handleClick(e) {
  if (e.target.classList.contains('btn-add-sacola')) {
    const card = e.target.closest('.card, .produto');
    const nome = card.querySelector('h2').innerText;
    const preco = card.querySelector('p').innerText;

    const produto = { nome, preco };

    fetch('http://localhost:3000/carrinho', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produto)
    })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao adicionar produto ao carrinho');
      alert('Produto adicionado à sacola!');
    })
    .catch(err => console.error(err));
  }
}

