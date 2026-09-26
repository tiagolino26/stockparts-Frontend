# 📦 StockParts

Sistema web de **controle de estoque de peças por equipamento**, desenvolvido para gerenciar cadastro, quantidade e localização de componentes vinculados a máquinas industriais (Liofilizador, Envase, Recrave, HVAC, Autoclave, entre outros).

O sistema permite cadastrar equipamentos, associar peças a cada um deles, controlar entradas e saídas de estoque, e acessar tudo através de uma interface protegida por autenticação.

---

## ✨ Funcionalidades

- 🔐 **Autenticação de usuários** — registro, login e sessões protegidas via JWT
- 🏭 **Gestão de equipamentos** — criação, edição e exclusão, com imagem, descrição e quantidade
- 🔩 **Gestão de peças** — cadastro de peças por equipamento, com código, categoria, estoque, grandeza, preço unitário e localização
- 🔍 **Busca em tempo real** — filtro de peças por nome ou código
- 💰 **Cálculo automático** — valor total filtrado do estoque exibido
- 📱 **Interface responsiva** — adaptada para desktop, tablet e celular
- 🎨 **Design escuro (dark mode)** — interface personalizada com identidade visual própria

---

## 🖥️ Tecnologias utilizadas

### Frontend

| Tecnologia                               | Uso                                      |
| ---------------------------------------- | ---------------------------------------- |
| [React](https://react.dev/)              | Biblioteca principal da interface        |
| [Vite](https://vitejs.dev/)              | Build tool e servidor de desenvolvimento |
| [React Router](https://reactrouter.com/) | Navegação entre páginas                  |
| CSS puro                                 | Estilização (sem frameworks CSS)         |

### Backend

| Tecnologia                                                   | Uso                                          |
| ------------------------------------------------------------ | -------------------------------------------- |
| [Fastify](https://fastify.dev/)                              | Framework do servidor HTTP                   |
| [Neon](https://neon.tech/)                                   | Banco de dados PostgreSQL serverless         |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)   | Geração e validação de tokens JWT            |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs)           | Criptografia de senhas                       |
| [@fastify/cors](https://www.npmjs.com/package/@fastify/cors) | Liberação de acesso entre frontend e backend |

---

## 🏗️ Arquitetura

O backend segue o padrão **Routes → Controller → Repository**, separando responsabilidades por camada:

- **Routes** — define os endpoints da API
- **Controller** — recebe a requisição e orquestra a lógica
- **Repository** — executa as consultas no banco de dados

As rotas são organizadas por domínio (`equip`, `auth`), e as rotas de equipamentos/peças são protegidas por um **middleware de autenticação**, que exige um token JWT válido no header `Authorization`.

```
Requisição → CORS → Rota pública (/auth) ou Rota protegida (/equip + middleware) → Controller → Repository → Neon (PostgreSQL)
```

---

## 📁 Estrutura de pastas

```
stockparts/
├── frontend/
│   ├── src/
│   │   ├── assets/           # Ícones e imagens
│   │   ├── components/       # Componentes reutilizáveis (Header, Cards, Forms, Footer)
│   │   ├── config/
│   │   │   └── api.js        # URL base da API e helper authFetch
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Estado global de autenticação
│   │   ├── pages/             # HomePage, EquipamentoPage, LoginPage, RegisterPage
│   │   ├── App.jsx            # Definição de rotas
│   │   └── main.jsx           # Ponto de entrada
│   ├── .env                   # Variáveis de ambiente (não versionado)
│   └── package.json
│
└── backend/
    ├── controller/            # Lógica de cada domínio (equip, auth)
    ├── repository/            # Acesso ao banco de dados (Neon)
    ├── routes/                # Definição dos endpoints
    ├── middleware/
    │   └── auth.middleware.js # Validação de token JWT
    ├── server.js               # Ponto de entrada do servidor Fastify
    ├── .env                    # Variáveis de ambiente (não versionado)
    └── package.json
```

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- Uma conta gratuita no [Neon](https://neon.tech/) com um banco de dados criado

### 1. Clone o repositório

```bash
git clone https://github.com/tiagolino26/stockparts.git
cd stockparts
```

### 2. Configure o backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na raiz do backend:

```dotenv
DATABASE_URL=postgresql://usuario:senha@host.neon.tech/nome-do-banco
JWT_SECRET=uma-frase-longa-e-aleatoria-que-so-voce-sabe
PORT=3000
```

Rode as migrações SQL (tabelas `equipamentos`, `pecas`, `categorias` e `usuarios`) no seu banco Neon antes de iniciar.

Inicie o servidor:

```bash
node server.js
```

### 3. Configure o frontend

Em outro terminal:

```bash
cd frontend
npm install
```

Crie um arquivo `.env` na raiz do frontend:

```dotenv
VITE_API_URL=http://localhost:3000
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`, consumindo a API em `http://localhost:3000`.

---

## 🔌 Principais rotas da API

### Autenticação (`/auth`) — públicas

| Método | Rota             | Descrição                        |
| ------ | ---------------- | -------------------------------- |
| POST   | `/auth/register` | Cria um novo usuário             |
| POST   | `/auth/login`    | Autentica e retorna um token JWT |

### Equipamentos e Peças (`/equip`) — requer token JWT

| Método | Rota                           | Descrição                                  |
| ------ | ------------------------------ | ------------------------------------------ |
| GET    | `/equip/getAllEquip`           | Lista todos os equipamentos com suas peças |
| POST   | `/equip/create`                | Cria um novo equipamento                   |
| PUT    | `/equip/:id`                   | Edita um equipamento                       |
| DELETE | `/equip/:id`                   | Exclui um equipamento                      |
| POST   | `/equip/pecas`                 | Cria uma nova peça                         |
| PUT    | `/equip/pecas/:id`             | Edita uma peça                             |
| DELETE | `/equip/pecas/:id`             | Exclui uma peça                            |
| PUT    | `/equip/pecas/:id/acrescentar` | Incrementa o estoque de uma peça           |
| PUT    | `/equip/pecas/:id/retirar`     | Decrementa o estoque de uma peça           |

> Todas as rotas protegidas exigem o header `Authorization: Bearer <token>`.

---

## 🗺️ Roadmap

- [ ] Botões de acrescentar/retirar estoque integrados à seleção da tabela
- [ ] Geração e leitura de QR Codes por peça
- [ ] Página de perfil do usuário
- [ ] Filtros avançados (por categoria, status, localização)

---

## 👨‍💻 Autor

Desenvolvido por **[Tiago Lino](https://github.com/tiagolino26)**
