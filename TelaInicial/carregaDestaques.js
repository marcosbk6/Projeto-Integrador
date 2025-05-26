// Destaques por nome ou ID
const destaquesNome = ['Una Senses Deo Parfum 5ml','Creme para Corpo Tododia Framboesa e Pimenta Rosa','Essencial Supreme Masculino','Hidratante Para as Mãos Ekos Maracujá']; // Ex: ids dos perfumes, hidratantes e maquiagens que você quer mostrar

fetch('http://localhost:3000/produtos')
  .then(res => res.json())
  .then(data => {
    const todosProdutos = [
      ...data.perfumes,
      ...data.hidratantes,
      ...data.maquiagem
    ];

    const destaques = todosProdutos.filter(produto => 
      destaquesNome.includes(produto.nome)
    );

    document.querySelectorAll('.descricao-produto').forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('expandido');
      });
    });
    
    const container = document.querySelector('.produtos-destaque');

    destaques.forEach(produto => {
      const card = document.createElement('div');
      card.classList.add('produto');

      card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h2 class="nome-produto">${produto.nome}</h2>
        <p>R$${produto.preco.toFixed(2)}</p>
        <button class="btn-add-sacola">Adicionar à sacola</button>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error("Erro ao carregar os produtos:", err));
