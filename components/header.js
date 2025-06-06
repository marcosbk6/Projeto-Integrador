// Função para alternar a visibilidade do sidebar
function alternarSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');
}

// Função para verificar autenticação
function verificarAutenticacao() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../tela-Login.html';
        return false;
    }
    
    // Mostrar nome do usuário
    const username = localStorage.getItem('username');
    const usernameDisplay = document.getElementById('usernameDisplay');
    if (username && usernameDisplay) {
        usernameDisplay.textContent = `Olá, ${username}`;
    }
    
    return true;
}

// Função para fazer logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    window.location.href = '../tela-Login.html';
}

// Configurar o menu mobile quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    verificarAutenticacao();
    
    // Garantir que o menu comece fechado em dispositivos móveis
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.remove('show');
    }
}); 