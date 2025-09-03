let autoRefreshInterval = null;

// Função para carregar dados da API
async function loadData() {
    showLoading();
    hideError();
    hideContent();

    try {
        const response = await fetch('/api/data');
        const data = await response.json();

        if (response.ok) {
            displayData(data);
        } else {
            throw new Error(data.error || 'Erro desconhecido');
        }
    } catch (error) {
        showError(error.message);
    }
}

// Função para exibir os dados na interface
function displayData(data) {
    document.getElementById('message-text').textContent = data.message;
    document.getElementById('instance-value').textContent = data.instance;
    document.getElementById('clientIP-value').textContent = data.clientIP;
    document.getElementById('method-value').textContent = data.method;
    document.getElementById('path-value').textContent = data.path;
    
    const timestamp = new Date(data.timestamp).toLocaleString('pt-BR');
    document.getElementById('timestamp-value').textContent = timestamp;

    hideLoading();
    showContent();
}

// Função para mostrar erro
function showError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('error').classList.remove('hidden');
    hideLoading();
    hideContent();
}

// Função para esconder erro
function hideError() {
    document.getElementById('error').classList.add('hidden');
}

// Função para mostrar loading
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

// Função para esconder loading
function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// Função para mostrar conteúdo
function showContent() {
    document.getElementById('content').classList.remove('hidden');
}

// Função para esconder conteúdo
function hideContent() {
    document.getElementById('content').classList.add('hidden');
}

// Função para iniciar auto-refresh
function startAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
    }

    autoRefreshInterval = setInterval(loadData, 10000); // 10 segundos

    document.getElementById('auto-refresh-btn').classList.add('hidden');
    document.getElementById('stop-refresh-btn').classList.remove('hidden');
}

// Função para parar auto-refresh
function stopAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
    }

    document.getElementById('auto-refresh-btn').classList.remove('hidden');
    document.getElementById('stop-refresh-btn').classList.add('hidden');
}

// Inicializar a aplicação quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    
    // Adicionar event listener para o botão de auto-refresh
    document.getElementById('auto-refresh-btn').addEventListener('click', startAutoRefresh);
    document.getElementById('stop-refresh-btn').addEventListener('click', stopAutoRefresh);
});

// Exportar funções para uso global (se necessário)
window.loadData = loadData;
window.startAutoRefresh = startAutoRefresh;
window.stopAutoRefresh = stopAutoRefresh;