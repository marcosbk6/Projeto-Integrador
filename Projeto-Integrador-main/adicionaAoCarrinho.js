export default function configurarBotoesCarrinho() {
  document.removeEventListener('click', handleClick);
  document.addEventListener('click', handleClick);
}

function handleClick(e) {
  if (e.target.classList.contains('btn-add-sacola')) {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Por favor, faça login para adicionar produtos ao carrinho');
      window.location.href = '../tela-Login.html';
      return;
    }

    const card = e.target.closest('.card, .produto');
    const nome = card.querySelector('h2').innerText;
    const preco = parseFloat(card.querySelector('p').innerText.replace('R$', '').trim());

    const produto = { 
      nome, 
      preco
    };

    fetch('http://localhost:3000/carrinho', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ produto, quantidade: 1 })
    })
    .then(res => {
      if (!res.ok) {
        if (res.status === 401) {
          alert('Sua sessão expirou. Por favor, faça login novamente.');
          window.location.href = '../tela-Login.html';
          return;
        }
        throw new Error('Erro ao adicionar produto ao carrinho');
      }
      alert('Produto adicionado à sacola!');
    })
    .catch(err => {
      console.error(err);
      alert(err.message);
    });
  }
}

