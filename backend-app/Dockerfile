FROM node:18-alpine

WORKDIR /app

# Copia apenas os arquivos necessários
COPY app.js package.json ./

# Instala apenas se houver dependências (neste caso, não há)
# Mas mantemos a estrutura para possíveis futuras dependências
RUN if [ -f "package.json" ]; then npm install; fi

EXPOSE 3000

# Saúde check para o container
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O - http://localhost:3000/health || exit 1

CMD ["node", "app.js"]