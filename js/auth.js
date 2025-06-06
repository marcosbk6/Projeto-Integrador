// Função para verificar se o usuário está logado
function verificarAutenticacao() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../tela-Login.html';
        return false;
    }
    
    // Mostrar nome do usuário se o elemento existir
    const username = localStorage.getItem('username');
    const usernameDisplay = document.getElementById('usernameDisplay');
    if (username && usernameDisplay) {
        usernameDisplay.textContent = `Olá, ${username}`;
    }
    
    return true;
}

// Função para verificar se o usuário é admin
function verificarAdmin() {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');
    
    if (!token) {
        window.location.href = '../tela-Login.html';
        return false;
    }
    
    if (!isAdmin || isAdmin !== 'true') {
        window.location.href = '../TelaInicial/tela-Inicial.html';
        return false;
    }
    
    return true;
}

// Função para fazer logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    window.location.href = '../tela-Login.html';
}

// Função para verificar e redirecionar admin após login
function verificarRedirecionamentoAdmin() {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
        window.location.href = './admin/admin.html';
    } else {
        window.location.href = './TelaInicial/tela-Inicial.html';
    }
}

// Verificar autenticação quando a página carregar (se não for página de login)
if (!window.location.pathname.includes('tela-Login.html')) {
    document.addEventListener('DOMContentLoaded', verificarAutenticacao);
}

// Exportar funções para uso em outros arquivos
window.auth = {
    verificarAutenticacao,
    verificarAdmin,
    logout,
    verificarRedirecionamentoAdmin
}; 