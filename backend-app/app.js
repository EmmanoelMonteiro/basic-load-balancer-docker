const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;
const instanceName = process.env.INSTANCE_NAME || 'unknown';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Configura CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  // Rota principal
  if (pathname === '/' && req.method === 'GET') {
    const clientIP = req.headers['x-forwarded-for'] || 
                     req.connection.remoteAddress || 
                     req.socket.remoteAddress;
    
    const responseData = {
      message: 'Hello from cloud!',
      instance: instanceName,
      timestamp: new Date().toISOString(),
      clientIP: clientIP,
      method: req.method,
      path: pathname
    };

    res.writeHead(200);
    res.end(JSON.stringify(responseData, null, 2));
    return;
  }

  // Rota de health check
  if (pathname === '/health' && req.method === 'GET') {
    const healthData = {
      status: 'healthy',
      instance: instanceName,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };

    res.writeHead(200);
    res.end(JSON.stringify(healthData, null, 2));
    return;
  }

  // Rota não encontrada
  res.writeHead(404);
  res.end(JSON.stringify({ 
    error: 'Not found', 
    instance: instanceName,
    path: pathname 
  }));
});

server.listen(port, () => {
  console.log(`Server ${instanceName} running on port ${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log(`Server ${instanceName} shutting down...`);
  server.close(() => {
    process.exit(0);
  });
});