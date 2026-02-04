# 🌱 Agrícola API – Gestão Agrícola

API desenvolvida em Node.js + Express para o projeto Agrícola, com foco em gestão agrícola, permitindo o controle de produtores, cultivos e safras.
Este projeto foi desenvolvido para a disciplina de Programação para Web, aplicando conceitos de arquitetura em camadas, CRUD, autenticação JWT e integração com banco de dados PostgreSQL.

---

## Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- JWT (JSON Web Token)
- dotenv-safe
- CORS
- Nodemon

---

## Arquitetura do Projeto

controllers   → Controle das requisições HTTP  
routes        → Definição das rotas da API  
usecases      → Regras de negócio e acesso ao banco  
entities      → Entidades do domínio  
config        → Configuração do banco de dados  
index.js         → Inicialização do servidor  

---

## Entidades do Sistema

Produtor  
- nome  
- propriedade  
- município  
- email  
- tipo  

Cultivo  
- tipo de cultura  
- área  
- data de plantio  
- data de colheita  
- produtor  

Safra  
- ano  
- quantidade colhida  
- cultivo relacionado  

---

## Autenticação

A API utiliza autenticação via JWT.

- O login gera um token com validade de 300 segundos
- Todas as rotas, exceto login e cadastro de produtor, são protegidas por middleware de autenticação

Endpoint de login:

    POST /login

Exemplo de body (JSON):

    {
      "email": "email@exemplo.com",
      "senha": "123456"
    }

---

## Endpoints da API

### Produtores

GET     /produtor        → Lista produtores  
POST    /produtor        → Cadastra produtor  
PUT     /produtor        → Atualiza produtor  
GET     /produtor/:id    → Busca produtor por ID  
DELETE  /produtor/:id    → Remove produtor  

---

### Cultivos

GET     /cultivo         → Lista cultivos  
POST    /cultivo         → Cadastra cultivo  
PUT     /cultivo         → Atualiza cultivo  
GET     /cultivo/:id     → Busca cultivo por ID  
DELETE  /cultivo/:id     → Remove cultivo  

---

### Safras

GET     /safra           → Lista safras  
POST    /safra           → Cadastra safra  
PUT     /safra           → Atualiza safra  
GET     /safra/:id       → Busca safra por ID  
DELETE  /safra/:id       → Remove safra  

---

## Banco de Dados

Banco de dados utilizado: PostgreSQL

Configuração local (config.js).

Em ambiente de produção, a conexão é feita utilizando a variável de ambiente DATABASE_URL.

---

## Como Executar o Projeto

Instalar as dependências:

    npm install

Executar em modo desenvolvimento:

    npm run start:dev

Ou executar em modo produção:

    npm start

A API ficará disponível em:

    http://localhost:3002

---

## Contexto Acadêmico

Projeto desenvolvido para a disciplina de Programação para Web, com o objetivo de aplicar conceitos de:

- APIs REST
- CRUD
- Autenticação e segurança
- Organização em camadas
- Integração com banco de dados relacional

