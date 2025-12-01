# FORMidável 📝
> **Crie, compartilhe e gerencie formulários de forma simples e elegante.**

[✨ Ver Projeto no Render](https://formidavel.onrender.com/)

O **FORMidável** é um **monorepo** com uma arquitetura de aplicação web moderna e desacoplada, focado na criação dinâmica de formulários (inspirado no Google Forms). O projeto permite que usuários criem questionários personalizados com diversos tipos de perguntas, compartilhem links públicos para coleta de respostas e acompanhem as submissões através de um dashboard intuitivo.

A aplicação conta com suporte nativo a **Dark Mode** 🌙 e design responsivo moderno.

---

## 🎓 Sobre o Projeto

Este projeto foi desenvolvido como parte da avaliação da disciplina de **Desenvolvimento Web** do curso de **Análise e Desenvolvimento de Sistemas (ADS)** da **Universidade Federal do Ceará (UFC)**.

Inicialmente concebido com uma abordagem monolítica tradicional (Flask com templates Jinja2), o projeto evoluiu para adotar uma arquitetura de **monorepo** mais moderna. Esta evolução visa explorar melhores práticas de desenvolvimento, separando o backend (API RESTful em Flask) de um frontend reativo (SPA em React) para uma experiência de usuário aprimorada.

---

## 🏗️ Arquitetura

O FORMidável é um **monorepo** que organiza o backend e o frontend como projetos separados, mas coexistindo no mesmo repositório. Ele segue uma arquitetura **desacoplada (API-first)**:

-   **Backend (API RESTful)**: Construído com Python e Flask, atua como um servidor de API que expõe endpoints RESTful para gerenciar formulários, perguntas e respostas. É responsável pela lógica de negócios e interação com o banco de dados.
-   **Frontend (Single Page Application - SPA)**: Desenvolvido com React, Vite e Tailwind CSS, consome a API do backend para renderizar toda a interface do usuário de forma dinâmica. Oferece uma experiência reativa e moderna para a criação e interação com formulários.

A comunicação entre o frontend e o backend é realizada através de chamadas HTTP para a API, com a gestão de Cross-Origin Resource Sharing (CORS) garantindo a segurança e funcionalidade.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando uma stack moderna e robusta, adequada para uma arquitetura desacoplada:

### Backend
-   **[Python](https://www.python.org/) & [Flask](https://flask.palletsprojects.com/)**: Framework web para construir a API RESTful.
-   **[SQLAlchemy](https://www.sqlalchemy.org/)**: ORM para manipulação eficiente do banco de dados relacional.
-   **[Flask-Migrate](https://flask-migrate.readthedocs.io/) & [Alembic](https://alembic.sqlalchemy.org/en/latest/)**: Para migrações de banco de dados.
-   **[SQLite](https://www.sqlite.org/)**: Banco de dados relacional leve (utilizado para desenvolvimento e teste).
-   **[Flask-Cors](https://flask-cors.readthedocs.io/en/latest/)**: Gerenciamento de Cross-Origin Resource Sharing para permitir a comunicação com o frontend.
-   **[Gunicorn](https://gunicorn.org/)**: Servidor WSGI para implantação em produção.

### Frontend
-   **[React](https://react.dev/)**: Biblioteca JavaScript para construção da interface de usuário reativa.
-   **[Vite](https://vitejs.dev/)**: Ferramenta de build rápida para desenvolvimento e empacotamento do frontend.
-   **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utility-first para estilização rápida e responsiva.
-   **[React Router DOM](https://reactrouter.com/en/main)**: Para roteamento e navegação no lado do cliente (SPA).
-   **[React-Toastify](https://fkhadra.github.io/react-toastify/)**: Para notificações "toast" (sucesso/erro).
-   **HTML5 & CSS3**: Estrutura e estilização base.

### Qualidade & Testes
-   **[Cypress](https://www.cypress.io/)**: Framework de testes End-to-End (E2E) cobrindo fluxos críticos da aplicação.
-   **Ambiente de Teste Isolado**: Script dedicado (`run_test.py`) para rodar o backend em modo de teste sem afetar o banco de produção, facilitando os testes E2E.

---

## ✨ Funcionalidades

### 1. Gestão de Formulários
-   **Criação Dinâmica**: Interface SPA-like (Single Page Application) simulada para adicionar perguntas instantaneamente.
-   **Tipos de Perguntas**:
    -   📝 Resposta Curta
    -   📄 Resposta Longa
    -   🔘 Múltipla Escolha (Radio)
    -   ✅ Caixa de Seleção (Checkbox)
-   **Edição e Exclusão**: CRUD completo com exclusão em cascata (apaga formulário e todas as respostas vinculadas).

### 2. Experiência do Usuário (UX)
-   **Dark Mode Automático**: Detecta preferência do sistema e permite persistência via LocalStorage.
-   **Feedback Visual**: Mensagens de "Toast" (Sucesso/Erro) com animação de progresso.
-   **Validação**: Frontend (HTML5) e Backend para garantir integridade dos dados.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
-   **Python 3.8+**
-   **Node.js & NPM (ou Yarn)**: Necessário para o frontend e para rodar os testes Cypress.

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/FORMidavel.git
cd FORMidavel
```

### 2. Configuração e Execução do Backend (Python)

Crie e ative um ambiente virtual (Recomendado):
```bash
# Linux/Mac
python3 -m venv .venv
source .venv/bin/activate

# Windows
python -m venv .venv
.venv\Scripts\activate
```

Instale as dependências:
```bash
pip install -r requirements.txt
```

Inicialize o Banco de Dados:
```bash
flask db upgrade
# O sistema criará o arquivo instance/database.db automaticamente.
```

Execute o Backend:
```bash
python run.py
```
O backend estará disponível em `http://localhost:5000`.

### 3. Configuração e Execução do Frontend (React)

Em um **novo terminal**, navegue até o diretório do frontend:
```bash
cd frontend
```

Instale as dependências:
```bash
npm install
# ou
yarn install
```

Execute o Frontend:
```bash
npm run dev
```
O frontend estará disponível em `http://localhost:5173` (ou outra porta definida pelo Vite). Certifique-se de que o backend esteja rodando para que o frontend possa se comunicar com a API.


#### Executando com Gunicorn (Para Produção)

Para uma execução mais robusta e performática, especialmente em ambientes de produção, utilize o Gunicorn (que já está incluído nas dependências).

Execute a aplicação com o seguinte comando:
```bash
gunicorn -w 4 'run:app' -b 0.0.0.0:8000
```
*   `-w 4`: Inicia 4 *worker processes*. Ajuste conforme a necessidade do seu servidor.
*   `'run:app'`: Indica para o Gunicorn carregar o objeto `app` do arquivo `run.py`.
*   `-b 0.0.0.0:8000`: Vincula a aplicação a todas as interfaces de rede na porta 8000. Você pode mudar a porta conforme desejar.

---

## 🧪 Executando os Testes (Cypress)

Para executar os testes End-to-End, é necessário que tanto o servidor de backend (em modo de teste) quanto o servidor de frontend (em modo de desenvolvimento) estejam rodando simultaneamente.

1. Instale as dependências do Cypress (na raiz do projeto):
```bash
# Se você já executou para o frontend, pode pular esta etapa se preferir gerenciar tudo a partir da pasta frontend, do contrário, execute na raiz para instalar apenas o Cypress.
npm install
```

2. Execute o servidor de backend em modo de teste (Em um terminal):
```bash
# Esse script roda a API na porta 5001 usando um banco de dados de teste
python run_test.py
```

3. Execute o servidor de frontend em modo de desenvolvimento (Em outro terminal):
```bash
cd frontend
npm run dev:test
```

4. Rode os testes (Em um terceiro terminal):
```bash
npx cypress open  # Abre a interface
# ou
npx cypress run   # Utiliza o terminal

# Se desejar usar yarn
yarn cypress open
# ou 
yarn cypress run
```

---

## 📂 Estrutura do Projeto

```
FORMidável/
├── api/                  # Backend Flask (API)
│   ├── models.py         # Modelos do Banco de Dados (SQLAlchemy)
│   ├── routes.py         # Endpoints da API (Blueprints)
│   ├── extensions.py     # Inicialização de extensões Flask
│   ├── test_routes.py    # Rotas exclusivas para o ambiente de teste
│   └── __init__.py       # Fábrica da aplicação Flask (create_app)
├── frontend/             # Frontend React
│   ├── public/           # Arquivos estáticos (imagens, etc.)
│   ├── src/
│   │   ├── components/   # Componentes React reutilizáveis
│   │   ├── contexts/     # Contextos React (ex: FormContext)
│   │   ├── pages/        # Componentes de página (CreateForm, Home, etc.)
│   │   ├── services/     # Lógica de comunicação com a API
│   │   ├── App.jsx       # Componente raiz
│   │   └── main.jsx      # Ponto de entrada do React
│   ├── tailwind.config.js
│   └── vite.config.js
├── cypress/              # Testes End-to-End
├── instance/             # Bancos de dados SQLite (dev e test)
├── migrations/           # Migrações do Alembic
├── run.py                # Executor de Produção/Dev do Backend
├── run_test.py           # Executor de Testes do Backend
├── requirements.txt      # Dependências do Backend
└── package.json          # Dependências do Cypress (na raiz)
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usá-lo e modificá-lo para fins de aprendizado.