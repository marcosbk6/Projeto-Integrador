document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.carrinho-itens');
  const totalDiv = document.querySelector('.total');
  const usernameDisplay = document.getElementById('usernameDisplay');
  const cepInput = document.getElementById('cep');

  // Função para formatar CEP
  cepInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5);
    }
    e.target.value = value;
  });

  // Função para verificar autenticação
  function verificarAutenticacao() {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '../tela-Login.html';
      return false;
    }
    
    // Mostrar nome do usuário
    const username = localStorage.getItem('username');
    if (username && usernameDisplay) {
      usernameDisplay.textContent = `Olá, ${username}`;
    }
    
    return true;
  }

  // Função para fazer logout
  window.logout = function() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    window.location.href = '../tela-Login.html';
  }

  async function atualizarCarrinho() {
    if (!verificarAutenticacao()) return;

    try {
      const token = localStorage.getItem('token');
      const resposta = await fetch('http://localhost:3000/carrinho', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const itens = await resposta.json();

      container.innerHTML = '';
      let total = 0;

      if (itens.length === 0) {
        container.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio</p>';
        totalDiv.textContent = `Total: ${total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })}`;
        return;
      }

      itens.forEach((item, index) => {
        const div = document.createElement('article');
        div.classList.add('produto');

        div.innerHTML = `
          <button class="close-card" data-index="${index}">&times;</button>
          <div class="produto-info">
            <h2>${item.produto.nome}</h2>
            <p class="preco">R$ ${item.produto.preco.toFixed(2)}</p>
            <div class="quantidade-controle">
              <button class="btn-quantidade" data-index="${index}" data-action="diminuir">-</button>
              <span class="quantidade">${item.quantidade}</span>
              <button class="btn-quantidade" data-index="${index}" data-action="aumentar">+</button>
            </div>
          </div>
        `;

        container.appendChild(div);

        total += item.produto.preco * item.quantidade;
      });

      totalDiv.textContent = `Total: ${total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })}`;
    } catch (err) {
      console.error('Erro ao buscar carrinho:', err);
      alert('Erro ao carregar o carrinho. Por favor, tente novamente.');
    }
  }

  // Remover item do carrinho
  container.addEventListener('click', async (e) => {
    if (!verificarAutenticacao()) return;

    if (e.target.classList.contains('close-card')) {
      const index = e.target.getAttribute('data-index');
      try {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:3000/carrinho/${index}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        atualizarCarrinho();
      } catch (err) {
        console.error('Erro ao remover item:', err);
        alert('Erro ao remover item. Por favor, tente novamente.');
      }
    }

    // Controle de quantidade
    if (e.target.classList.contains('btn-quantidade')) {
      const index = e.target.getAttribute('data-index');
      const action = e.target.getAttribute('data-action');
      const quantidadeSpan = e.target.parentElement.querySelector('.quantidade');
      let quantidade = parseInt(quantidadeSpan.textContent);

      if (action === 'aumentar') {
        quantidade++;
      } else if (action === 'diminuir' && quantidade > 1) {
        quantidade--;
      }

      try {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:3000/carrinho/${index}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ quantidade })
        });
        atualizarCarrinho();
      } catch (error) {
        console.error('Erro ao atualizar quantidade:', error);
        alert('Erro ao atualizar quantidade. Por favor, tente novamente.');
      }
    }
  });

  // Função para limpar carrinho
  window.limparCarrinho = async function() {
    if (!verificarAutenticacao()) return;

    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Debug
      
      // Primeiro confirma com o usuário
      if (!confirm('Tem certeza que deseja remover todos os itens do carrinho?')) {
        return;
      }

      // Faz a requisição para limpar o carrinho
      console.log('Fazendo requisição DELETE para /carrinho...'); // Debug
      const response = await fetch('http://localhost:3000/carrinho', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Status da resposta:', response.status); // Debug
      console.log('Headers da resposta:', Object.fromEntries(response.headers.entries())); // Debug

      // Tenta ler a resposta como texto primeiro
      const texto = await response.text();
      console.log('Resposta do servidor (texto):', texto); // Debug

      // Tenta parsear como JSON
      let data;
      try {
        data = JSON.parse(texto);
        console.log('Resposta parseada como JSON:', data); // Debug
      } catch (e) {
        console.error('Erro ao parsear resposta como JSON:', e); // Debug
        throw new Error('O servidor retornou uma resposta inválida. Por favor, verifique se o servidor backend está rodando corretamente.');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao limpar carrinho');
      }

      // Atualiza a exibição do carrinho
      await atualizarCarrinho();
      alert('Carrinho esvaziado com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      alert(error.message || 'Erro ao limpar carrinho. Por favor, tente novamente.');
    }
  }

  // Função para finalizar compra
  window.finalizarCompra = async function() {
    if (!verificarAutenticacao()) return;

    try {
      const form = document.querySelector('.form-pedido');
      const formData = new FormData(form);
      const dadosEntrega = Object.fromEntries(formData.entries());

      // Verificar se todos os campos obrigatórios foram preenchidos
      const camposObrigatorios = ['nome', 'telefone', 'endereco', 'numero', 'bairro', 'cep'];
      const camposFaltando = camposObrigatorios.filter(campo => !dadosEntrega[campo]);

      if (camposFaltando.length > 0) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      // Validar formato do CEP
      const cepRegex = /^\d{5}-\d{3}$/;
      if (!cepRegex.test(dadosEntrega.cep)) {
        alert('Por favor, insira um CEP válido no formato 00000-000');
        return;
      }

      const token = localStorage.getItem('token');
      const resposta = await fetch('http://localhost:3000/carrinho', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const itens = await resposta.json();
      
      if (itens.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
      }

      const total = itens.reduce((sum, item) => sum + (item.produto.preco * item.quantidade), 0);

      // Salvar dados de entrega no localStorage
      localStorage.setItem('dadosEntrega', JSON.stringify({
        nome: dadosEntrega.nome,
        telefone: dadosEntrega.telefone,
        endereco: {
          rua: dadosEntrega.endereco,
          numero: dadosEntrega.numero,
          complemento: dadosEntrega.complemento || '',
          bairro: dadosEntrega.bairro,
          cidade: 'São Paulo',
          estado: 'SP',
          cep: dadosEntrega.cep
        }
      }));

      // Salvar itens e total no localStorage
      localStorage.setItem('carrinho', JSON.stringify(itens));
      localStorage.setItem('totalCompra', total);

      // Redirecionar para a página de checkout
      window.location.href = '../checkout.html';

    } catch (error) {
      console.error('Erro ao processar dados:', error);
      alert('Erro ao processar dados: ' + error.message);
    }
  }

  // Inicializar o carrinho
  atualizarCarrinho();
});