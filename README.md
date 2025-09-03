# Basic Load Balancer Docker

Este projeto demonstra um ambiente de balanceamento de carga simples usando Docker, Nginx e Node.js. Ele inclui três instâncias de backend Node.js, um frontend para monitoramento e um Nginx configurado como load balancer.

## Estrutura do Projeto

```
docker-compose.yml
test-load.sh
backend-app/
  app.js
  Dockerfile
  package.json
front-end/
  package.json
  server.js
  public/
    index.html
    script.js
    style.css
nginx/
  Dockerfile
  nginx.conf
```

## Descrição dos Componentes

- **backend-app/**: Aplicação Node.js que responde com informações da instância.
- **front-end/**: Aplicação Node.js que serve uma interface web para monitorar o serviço.
- **nginx/**: Container Nginx configurado como load balancer para as instâncias backend.
- **docker-compose.yml**: Orquestra todos os containers.
- **test-load.sh**: Script para testar o balanceamento de carga.

## Como baixar e executar o projeto

### 1. Clone o repositório

```sh
git clone https://github.com/EmmanoelMonteiro/basic-load-balancer-docker.git
cd basic-load-balancer-docker
```

### 2. Construa e suba os containers

Certifique-se de ter o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/) instalados.

```sh
docker-compose up --build
```

Isso irá:
- Construir três instâncias do backend (`app1`, `app2`, `app3`)
- Construir o container do Nginx como load balancer
- Subir todos os serviços na rede interna

### 3. Acesse o monitoramento

Abra o frontend localmente:

```sh
cd front-end
npm install
npm start
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador para visualizar o monitoramento do serviço.

> O frontend faz requisições para o serviço local na porta 80, que é o Nginx balanceando as instâncias backend.

### 4. Teste o balanceamento de carga

No terminal, execute:

```sh
./test-load.sh
```

Você verá as respostas alternando entre as instâncias backend.

### 5. Parar os containers

Para parar e remover os containers:

```sh
docker-compose down
```

## Observações

- O Nginx faz balanceamento de carga entre as três instâncias backend usando o método `least_conn`.
- O frontend pode ser customizado em `front-end/public/`.
- O backend pode ser customizado em `backend-app/app.js`.

---

Projeto para fins didáticos. Sinta-se livre para