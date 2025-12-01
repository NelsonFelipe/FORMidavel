# FORMidável 📝
> **Crie, compartilhe e gerencie formulários de forma simples e elegante.**

[✨ Ver Projeto no Render](https://formidavel.onrender.com/)

O **FORMidável** é um **monorepo** com uma arquitetura de aplicação web moderna e desacoplada, focado na criação dinâmica de formulários (inspirado no Google Forms). O projeto permite que usuários criem questionários personalizados com diversas perguntas, compartilhem links públicos e acompanhem as submissões.

A aplicação conta com suporte nativo a **Dark Mode** 🌙 e design responsivo moderno.

---

## 🎓 Sobre o Projeto

Este projeto foi desenvolvido como parte da avaliação da disciplina de **Desenvolvimento Web** do curso de **Análise e Desenvolvimento de Sistemas (ADS)** da **Universidade Federal do Ceará (UFC)**.

Inicialmente concebido com uma abordagem monolítica, o projeto evoluiu para uma arquitetura profissional, separando fisicamente o backend (API Flask) do frontend (React) e isolando a suíte de testes.

---

## 🏗️ Arquitetura

O projeto segue uma estrutura organizada onde cada responsabilidade tem seu diretório dedicado:

-   **`backend/`**: Contém toda a lógica da API RESTful construída com Flask e SQLAlchemy.
-   **`frontend/`**: Contém a Single Page Application (SPA) desenvolvida com React e Vite.
-   **`tests/e2e/`**: Contém a suíte de testes de ponta a ponta (End-to-End) com Cypress.

---

## 🛠️ Tecnologias Utilizadas

### Backend
-   **[Python](https://www.python.org/) & [Flask](https://flask.palletsprojects.com/)**
-   **[SQLAlchemy](https://www.sqlalchemy.org/)** (ORM) & **[SQLite](https://www.sqlite.org/)**
-   **[Flask-Migrate](https://flask-migrate.readthedocs.io/)** (Alembic)
-   **[Gunicorn](https://gunicorn.org/)** (Produção)

### Frontend
-   **[React](https://react.dev/)** & **[Vite](https://vitejs.dev/)**
-   **[Tailwind CSS](https://tailwindcss.com/)**
-   **[React Router DOM](https://reactrouter.com/)**

### Qualidade & Testes
-   **[Cypress](https://www.cypress.io/)**: Testes E2E localizados em `tests/e2e`.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
-   **Python 3.8+**
-   **Node.js & NPM (ou Yarn)**

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/FORMidavel.git
cd FORMidavel
```

### 2. Configuração do Backend
Toda a configuração do servidor deve ser feita dentro da pasta `backend`.

```bash
cd backend
```

Crie e ative o ambiente virtual:
```bash
# Linux/Mac
python3 -m venv .venv
source .venv/bin/activate

# Windows
python -m venv .venv
.venv\Scripts\activate
```

Instale as dependências e prepare o banco:
```bash
pip install -r requirements.txt
flask db upgrade
```

Execute o servidor:
```bash
python run.py
```
O backend rodará em `http://localhost:5000`.

### 3. Configuração do Frontend
Abra um **novo terminal**, volte à raiz (se necessário) e entre na pasta `frontend`.

```bash
cd frontend
```

Instale e rode:
```bash
npm install
npm run dev
```
O frontend rodará em `http://localhost:5173`.

---

## 🧪 Executando os Testes (Cypress)

Os testes E2E exigem que o backend de teste e o frontend estejam rodando, e que o Cypress seja executado a partir de sua pasta dedicada.

**Passo 1: Backend de Teste** (Terminal 1 - pasta `backend/`)
```bash
cd backend
python run_test.py
# Roda na porta 5001 com banco de teste isolado
```

**Passo 2: Frontend de Teste** (Terminal 2 - pasta `frontend/`)
```bash
cd frontend
npm run dev:test
# Configurado para apontar para a porta 5001
```

**Passo 3: Executar Cypress** (Terminal 3 - pasta `tests/e2e/`)
```bash
cd tests/e2e
npm install  # Instala as dependências do Cypress
npx cypress open # Interface gráfica
npx cypress run # Para rodar no terminal:

# Se quiser usar yarn
yarn install
yarn cypress open 
yarn cypress run
```

---

## 📂 Estrutura do Projeto

```
FORMidável/
├── backend/              # 🐍 Lógica do Servidor
│   ├── api/              # Blueprints, Models e Routes
│   ├── instance/         # Banco de dados SQLite
│   ├── migrations/       # Scripts de migração
│   ├── run.py            # Entry point (Produção/Dev)
│   ├── run_test.py       # Entry point (Testes)
│   └── requirements.txt
│
├── frontend/             # ⚛️ Interface do Usuário
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
└── tests/                # 🧪 Testes Automatizados
    └── e2e/              # Projeto Cypress
        ├── cypress/
        └── package.json
```

---

## 📄 Licença

Este projeto está sob a licença MIT.
