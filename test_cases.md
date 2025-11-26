# Casos de Teste - FORMidável

Este documento lista alguns cenários de testes criados para esse sistema de criação e gestão de formulários **FORMidável**.


## 1. Gestão de Formulários (Dashboard & CRUD)

### 1.1. Criação de Formulário
- [x] **CT01:** Criar formulário com Título, Descrição e 1 Pergunta do tipo Resposta Curta.
- [x] **CT02:** Criar formulário com 1 Pergunta do tipo Resposta Longa.
- [x] **CT03:** Criar formulário com 1 Pergunta do tipo Múltipla Escolha.
- [x] **CT04:** Criar formulário com 1 Pergunta do tipo Caixa de Seleção.
- [x] **CT05:** Criar formulário com todos os tipos de pergunta (Curta, Longa, Múltipla Escolha, Caixa de seleção).
- [x] **CT06:** Adicionar múltiplas opções em uma pergunta de Múltipla Escolha.
- [x] **CT07:** Tentar criar formulário sem Título.
- [x] **CT08:** Tentar criar formulário sem Descrição.
- [x] **CT09:** Criar formulário com caracteres especiais e emojis no título.
- [x] **CT10:** Validar limite máximo de 100 caracteres no Título.
- [x] **CT11:** Validar limite máximo de 500 caracteres na Descrição.
- [x] **CT12:** Permitir remover uma pergunta durante a criação do formulário.
- [x] **CT13:** Tentar criar Pergunta de Múltipla Escolha com opção vazia.
- [x] **CT14:** Tentar criar Pergunta de Múltipla Escolha com apenas 1 opção.
- [x] **CT15:** Tentar criar Pergunta de Caixa de Seleção com apenas 1 opção.

### 1.2. Edição de Formulário
- [x] **CT16:** Alterar somente o Título de um formulário existente e salvar.
- [x] **CT17:** Adicionar uma nova pergunta a um formulário já existente.
- [x] **CT18:** Alterar o texto de uma pergunta existente.
- [x] **CT19:** Alterar o tipo de uma pergunta (ex: de Curta para Longa) e salvar.
- [x] **CT20:** Remover opções de uma pergunta de múltipla escolha (funcionalidade não implementada).
- [x] **CT21:** Verificar se os inputs de opções (radio/checkbox) estão desabilitados no modo edição (apenas visuais).
- [x] **CT22:** Remover todas as perguntas de um formulário existente na edição (deve ser bloeado).

### 1.3. Dashboard (Meus Formulários)
- [x] **CT23:** Verificar exibição do "Empty State" quando não há formulários.
- [x] **CT24:** Verificar listagem correta de múltiplos formulários (Grid).
- [x] **CT25:** Validar funcionamento do botão "Responder" (Redireciona para resposta pública).
- [x] **CT26:** Validar funcionamento do botão "Editar" (Redireciona para edição).
- [x] **CT27:** Verificar contador de respostas (Badge Cinza) quando é 0.
- [x] **CT28:** Verificar contador de respostas (Badge Verde) quando é > 0.
- [x] **CT29:** Excluir um formulário existente.

---

## 2. Respondendo Formulários

### 2.1. Visualização
- [x] **CT30:** Acessar um formulário via URL válida (`/form/<id>`).
- [x] **CT31:** Tentar acessar um formulário com ID inexistente (Validar Página 404 ou Erro).
- [x] **CT32:** Verificar se Título e Descrição conferem com o criado.
- [x] **CT33:** Verificar se os campos obrigatórios estão marcados visualmente (ex: Asterisco vermelho).

### 2.2. Preenchimento e Envio
- [x] **CT34:** Enviar resposta preenchendo todos os campos corretamente (Caminho Feliz).
- [x] **CT35:** Tentar enviar formulário deixando um campo de "Resposta Curta" vazio.
- [x] **CT36:** Tentar enviar formulário sem marcar nenhuma opção em "Múltipla Escolha".
- [x] **CT37:** Tentar enviar formulário sem marcar nenhuma opção em "Checkbox".
- [x] **CT38:** Enviar resposta selecionando múltiplas opções em um "Checkbox".
- [x] **CT39:** Validar limite de caracteres na resposta curta (Máx 200).
- [x] **CT40:** Validar limite de caracteres na resposta longa (Máx 5000).

### 2.3. Pós-Envio
- [x] **CT41:** Verificar redirecionamento para página de Agradecimento ("Sucesso!").
- [x] **CT42:** Clicar em "Enviar outra resposta" e verificar retorno ao form limpo.
- [x] **CT43:** Clicar em "Voltar para Meus Formulários" e verificar retorno ao Dashboard.

---

## 3. Banco de Dados e Integridade

- [x] **CT44:** Verificar se uma nova `Submission` é criada no banco ao enviar resposta.
- [x] **CT45:** Verificar se as `Answers` criadas estão vinculadas à `Submission` correta.
- [x] **CT46:** Verificar se `SelectedOption` salva corretamente os IDs das opções escolhidas.
- [x] **CT47:** Verificar consistência ao apagar formulário (Cascade Delete das perguntas e respostas).

--- 

## 4. Navegação e Landing Page

- [x] **CT48:** Carregar a Home Page corretamente.
- [x] **CT49:** Navegar para a lista de formulários pelo menu.