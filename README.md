# FORMidável 📄

> **Crie, compartilhe e gerencie formulários de forma simples e elegante.**

O **FORMidável** é uma aplicação web *fullstack* monolítica para criação dinâmica de formulários (inspirado no Google Forms). O projeto permite que usuários criem questionários personalizados com diversos tipos de perguntas, compartilhem links públicos para coleta de respostas e acompanhem as submissões através de um dashboard intuitivo.

A aplicação conta com suporte nativo a **Dark Mode** 🌙 e design responsivo moderno.

---

## 🎓 Sobre o Projeto

Este projeto foi desenvolvido como parte da avaliação da disciplina de **Desenvolvimento Web** do curso de **Análise e Desenvolvimento de Sistemas (ADS)** da **Universidade Federal do Ceará (UFC)**.

O objetivo foi aplicar conceitos fundamentais de desenvolvimento web, incluindo arquitetura MVC (via Flask), manipulação de DOM com JavaScript puro, modelagem de banco de dados relacional.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando uma stack moderna, leve e sem processos de build complexos:

### Backend
-   **[Python](https://www.python.org/) & [Flask](https://flask.palletsprojects.com/)**: Framework web (Rotas, Blueprints e Jinja2 Templates).
-   **[SQLAlchemy](https://www.sqlalchemy.org/)**: ORM para manipulação eficiente do banco de dados.
-   **[SQLite](https://www.sqlite.org/)**: Banco de dados relacional leve (arquivo local).

### Frontend
-   **HTML5 & CSS3**: Estrutura semântica.
-   **[Tailwind CSS](https://tailwindcss.com/) (via CDN)**: Estilização rápida e responsiva, incluindo configuração de tema personalizado.
-   **JavaScript (Vanilla ES6+)**: Manipulação dinâmica do DOM para adicionar/remover perguntas sem recarregar a página.

### Qualidade & Testes
-   **[Cypress](https://www.cypress.io/)**: Framework de testes End-to-End (E2E) cobrindo fluxos críticos (Criação, Edição, Resposta).
-   **Ambiente de Teste Isolado**: Script dedicado (`run_test.py`) para rodar a aplicação em modo de teste sem afetar o banco de produção.

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
-   **Node.js & NPM** (Apenas se desejar rodar os testes do Cypress)

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/FORMidavel.git
cd FORMidavel
```

### 2. Configuração do Backend (Python)

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

### 3. Executando a Aplicação
```bash
python run.py
```
Acesse em seu navegador: `http://localhost:5001`

#### Executando com Gunicorn (Para Produção)

Para uma execução mais robusta e performática, especialmente em ambientes de produção, utilize o Gunicorn.

1.  **Instale o Gunicorn** (se ainda não o fez):
    ```bash
    pip install gunicorn
    ```
2.  **Execute a aplicação**:
    ```bash
    gunicorn -w 4 'run:app' -b 0.0.0.0:8000
    ```
    *   `-w 4`: Inicia 4 *worker processes*. Ajuste conforme a necessidade do seu servidor.
    *   `'run:app'`: Indica para o Gunicorn carregar o objeto `app` do arquivo `run.py`.
    *   `-b 0.0.0.0:8000`: Vincula a aplicação a todas as interfaces de rede na porta 8000. Você pode mudar a porta conforme desejar.

---

## 🧪 Executando os Testes (Cypress)

O projeto possui um script dedicado para facilitar a execução dos testes em um ambiente isolado.

1. Instale as dependências do Cypress:
```bash
npm install
# ou
yarn install
```

2. Execute o servidor de teste (Em um terminal separado):
```bash
# Este script roda a aplicação na porta 5001 usando 'test_database.db'
python run_test.py
```

3. Rode os testes (Em outro terminal):
```bash
npx cypress open  # Modo interativo
# ou
npx cypress run   # Modo headless (terminal)
```

---

## 📂 Estrutura do Projeto

```
FORMidável/
├── app/
│   ├── models.py       # Modelos do Banco de Dados
│   ├── routes.py       # Lógica das rotas (Controllers)
│   ├── static/
│   │   └── js/         # Lógica Frontend (create_form.js, theme.js)
│   └── templates/      # HTML com Jinja2 (base.html com Tailwind config)
├── cypress/            # Testes E2E
├── instance/           # Bancos de dados SQLite (dev e test)
├── run.py              # Executor de Produção/Dev
├── run_test.py         # Executor para Testes Automatizados
└── TEST_CASES.md       # Plano de testes detalhado
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usá-lo e modificá-lo para fins de aprendizado.