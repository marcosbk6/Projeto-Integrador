const express = require('express');
const path = require('path');
const app = express();

// Servir arquivos estáticos (como login.css e imagens, se houver)
app.use(express.static(__dirname));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'telaLogin1.html'));
});

// Iniciar servidor
app.listen(5500, () => {
  console.log('Front rodando em http://localhost:5500');
});
