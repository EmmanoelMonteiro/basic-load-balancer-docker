const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const LOCAL_SERVICE_URL = 'http://localhost:80';

// Função para buscar dados do serviço local
async function fetchLocalService() {
    return new Promise((resolve, reject) => {
        const req = http.request(LOCAL_SERVICE_URL, {
            method: 'GET',
            timeout: 5000
        }, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (error) {
                    reject(new Error('Erro ao parsear JSON: ' + error.message));
                }
            });
        });

        req.on('error', (error) => {
            reject(new Error('Erro de conexão: ' + error.message));
        });

        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Timeout ao conectar com o serviço local'));
        });

        req.end();
    });
}

// Servir arquivos estáticos
function serveStaticFile(res, filePath, contentType) {
    const fullPath = path.join(__dirname, 'public', filePath);
    
    fs.readFile(fullPath, (error, content) => {
        if (error) {
            res.writeHead(404);
            res.end('Arquivo não encontrado');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

// Criar servidor HTTP
const server = http.createServer(async (req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    // Rota para API que retorna os dados do serviço local
    if (req.url === '/api/data' && req.method === 'GET') {
        try {
            const data = await fetchLocalService();
            res.writeHead(200, { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify(data));
        } catch (error) {
            res.writeHead(500, { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({ 
                error: error.message,
                timestamp: new Date().toISOString()
            }));
        }
        return;
    }

    // Servir arquivos estáticos
    if (req.url === '/' || req.url === '/index.html') {
        serveStaticFile(res, 'index.html', 'text/html');
    } else if (req.url === '/style.css') {
        serveStaticFile(res, 'style.css', 'text/css');
    } else if (req.url === '/script.js') {
        serveStaticFile(res, 'script.js', 'application/javascript');
    } else {
        res.writeHead(404);
        res.end('Página não encontrada');
    }
});

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📡 Conectando ao serviço local em ${LOCAL_SERVICE_URL}`);
});

// Tratamento de erros
server.on('error', (error) => {
    console.error('Erro no servidor:', error);
});

process.on('uncaughtException', (error) => {
    console.error('Erro não capturado:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Rejeição não tratada:', reason);
});