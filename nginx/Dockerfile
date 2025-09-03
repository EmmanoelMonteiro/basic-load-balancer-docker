# Usa a imagem oficial do Nginx
FROM nginx:alpine

# Copia nosso arquivo de configuração personalizado
COPY nginx.conf /etc/nginx/nginx.conf

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]