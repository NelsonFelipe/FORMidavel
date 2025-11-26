describe('Form Management', () => {
  
  // Clear database before each test
  beforeEach(() => {
    cy.resetDb();
  });

  context('Form list', () => {
    it('CT23: Should display empty state when no forms exist', () => {
      cy.visit('/forms');
      cy.contains('Nenhum formulário criado').should('be.visible');
      cy.contains('Criar meu primeiro formulário').should('be.visible');
    });

    it('CT24: Should list created forms', () => {
      cy.seedForm();
      cy.visit('/forms');
      cy.get('[data-testid="forms-grid"]').should('exist');
      cy.contains('Formulário Cypress').should('be.visible');
      cy.contains('Aguardando respostas').should('be.visible');
    });
  });

  context('Form Creation', () => {
    beforeEach(() => {
      cy.visit('/create_form');
    });

    it('CT07: Should validate if title is required', () => {
      // Leave Title empty
      cy.get('[data-testid="form-desc-input"]').type('Descrição válida');
      cy.get('[data-testid="question-text-input"]').first().type('P1'); // Add a question for valid submission structure
      cy.get('[data-testid="save-form-btn"]').click();
      
      // HTML5 validation prevents submission, URL stays same
      cy.url().should('include', '/create_form');
      // Can check specific validation message if needed, but URL check is robust for "not submitted"
    });

    it('CT08: Should validate if description is required', () => {
        // Fill Title, leave Description empty
        cy.get('[data-testid="form-title-input"]').type('Título Válido');
        cy.get('[data-testid="question-text-input"]').first().type('P1'); // Add a question
        cy.get('[data-testid="save-form-btn"]').click();
        
        // HTML5 validation prevents submission
        cy.url().should('include', '/create_form');
    });

    it('CT09: Should accept special characters and emojis in title', () => {
      const tituloExotico = 'Pesquisa 🚀 Verão 2025 & Inverno ñ ç ã';
      cy.get('[data-testid="form-title-input"]').type(tituloExotico);
      cy.get('[data-testid="form-desc-input"]').type('Teste de encoding utf-8');
      cy.get('[data-testid="question-text-input"]').first().type('P1');
      
      cy.get('[data-testid="save-form-btn"]').click();
      
      cy.contains('Formulário criado com sucesso!');
      cy.contains(tituloExotico).should('be.visible');
    });

    it('CT05: Should create a complex form with all question types', () => {
      cy.get('[data-testid="form-title-input"]').type('Formulário Completo');
      cy.get('[data-testid="form-desc-input"]').type('Testando todos os tipos');

      // P1: Short Answer
      cy.get('[data-testid="question-text-input"]').eq(0).type('Nome Completo');

      // P2: Long Answer
      cy.get('[data-testid="add-question-btn"]').click();
      cy.get('[data-testid="question-item"]').eq(1).within(() => {
        cy.get('[data-testid="question-text-input"]').type('Deixe seu comentário');
        cy.get('[data-testid="question-type-select"]').select('long_answer');
        cy.get('textarea.inputs').should('exist');
      });

      // P3: Multiple Choice
      cy.get('[data-testid="add-question-btn"]').click();
      cy.get('[data-testid="question-item"]').eq(2).within(() => {
        cy.get('[data-testid="question-text-input"]').type('Cor favorita');
        cy.get('[data-testid="question-type-select"]').select('multiple_choice');
        
        // Option 1 (default)
        cy.get('[data-testid="option-input-text"]').first().type('Azul');
        
        // Option 2 (added)
        cy.get('[data-testid="add-option-btn"]').click();
        cy.get('[data-testid="option-input-text"]').last().type('Vermelho');
      });

      // P4: Checkbox
      cy.get('[data-testid="add-question-btn"]').click();
      cy.get('[data-testid="question-item"]').eq(3).within(() => {
        cy.get('[data-testid="question-text-input"]').type('Hobbies');
        cy.get('[data-testid="question-type-select"]').select('checkbox');
        
        cy.get('[data-testid="option-input-text"]').first().type('Leitura');
        cy.get('[data-testid="add-option-btn"]').click();
        cy.get('[data-testid="option-input-text"]').last().type('Games');
      });

      cy.get('[data-testid="save-form-btn"]').click();
      cy.url().should('include', '/forms');
      cy.contains('Formulário criado com sucesso!').should('be.visible');
    });

    it('CT10: Should respect character limits on title', () => {
        const longTitle = 'A'.repeat(150); // More than 100
        cy.get('[data-testid="form-title-input"]').type(longTitle);
        // Verify if value is truncated to max length
        cy.get('[data-testid="form-title-input"]').should('have.value', 'A'.repeat(100));
    });

    it('CT11: Should respect character limits on description', () => {
        const longDesc = 'B'.repeat(600);  // More than 500
        cy.get('[data-testid="form-desc-input"]').type(longDesc);
        // Verify if value is truncated to max length
        cy.get('[data-testid="form-desc-input"]').should('have.value', 'B'.repeat(500));
    });

    it('CT12: Should allow removing a question during creation', () => {
        // Add 2 questions (1 exists by default)
        cy.get('[data-testid="question-text-input"]').first().type('Pergunta 1');
        cy.get('[data-testid="add-question-btn"]').click(); // Add P2
        cy.get('[data-testid="question-item"]').eq(1).within(() => {
          cy.get('[data-testid="question-text-input"]').type('Pergunta 2');
        });
        cy.get('[data-testid="add-question-btn"]').click(); // Add P3
        cy.get('[data-testid="question-item"]').eq(2).within(() => {
            cy.get('[data-testid="question-text-input"]').type('Pergunta 3 (Para deletar)');
        });
  
        // Verify there are 3 questions
        cy.get('[data-testid="question-item"]').should('have.length', 3);
  
        // Remove last question
        cy.get('[data-testid="delete-question-btn"]').last().click();
  
        // Verify there are 2 and they are correct
        cy.get('[data-testid="question-item"]').should('have.length', 2);
        cy.get('[data-testid="question-text-input"]').eq(0).should('have.value', 'Pergunta 1');
        cy.get('[data-testid="question-text-input"]').eq(1).should('have.value', 'Pergunta 2');

        // Test removing the first one
        cy.get('[data-testid="delete-question-btn"]').first().click();
        cy.get('[data-testid="question-item"]').should('have.length', 1);
        cy.get('[data-testid="question-text-input"]').eq(0).should('have.value', 'Pergunta 2');
    });

    it('CT13: Trying to create an empty option for multiple choice', () => {
        cy.get('[data-testid="form-title-input"]').type('Form Validação');
        cy.get('[data-testid="form-desc-input"]').type('Teste');
        
        cy.get('[data-testid="question-text-input"]').type('P1');
        cy.get('[data-testid="question-type-select"]').select('multiple_choice');
        cy.get('[data-testid="option-input-text"]').first().clear(); 
        cy.get('[data-testid="question-text-input"]').first().type('P1'); // Need a question for submission
        
        cy.get('[data-testid="save-form-btn"]').click();
        // HTML5 validation should prevent it
        cy.url().should('include', '/create_form');
    });

    it('CT14: Trying to create a multiple choice question with only one option.', () => {
        cy.get('[data-testid="form-title-input"]').type('Form Validação');
        cy.get('[data-testid="form-desc-input"]').type('Teste');
        
        cy.get('[data-testid="question-text-input"]').type('P1');
        cy.get('[data-testid="question-type-select"]').select('multiple_choice');
        cy.get('[data-testid="option-input-text"]').first().type('Opção 1');
        cy.get('[data-testid="question-text-input"]').first().type('P1'); // Need a question for submission
        // Don't add another
        
        cy.get('[data-testid="save-form-btn"]').click();
        cy.on('window:alert', (str) => {
             expect(str).to.contain('Adicione pelo menos 2 opções');
        });
        cy.url().should('include', '/create_form');
    });

    it('CT15: Trying to create a checkbox question with only one option', () => {
        cy.get('[data-testid="form-title-input"]').type('Form Validação');
        cy.get('[data-testid="form-desc-input"]').type('Teste');
        
        cy.get('[data-testid="question-text-input"]').type('P1');
        cy.get('[data-testid="question-type-select"]').select('checkbox');
        cy.get('[data-testid="option-input-text"]').first().type('Opção 1');
        cy.get('[data-testid="question-text-input"]').first().type('P1'); // Need a question for submission
        
        cy.get('[data-testid="save-form-btn"]').click();
        cy.url().should('include', '/create_form');
    });

  });

  context('Form Editing', () => {
    beforeEach(() => {
      cy.seedForm().then((id) => {
        cy.visit(`/edit_form/${id}`);
      });
    });

    it('CT26: Should load existing data correctly', () => {
      cy.get('[data-testid="form-title-input"]').should('have.value', 'Formulário Cypress');
      cy.get('[data-testid="question-item"]').should('have.length.at.least', 1);
    });

    it('CT16: Should update title and save', () => {
      cy.get('[data-testid="form-title-input"]').clear().type('Título Editado pelo Cypress');
      cy.get('[data-testid="save-form-btn"]').click();

      cy.url().should('include', '/forms');
      cy.contains('Formulário atualizado com sucesso!').should('be.visible');
      cy.contains('Título Editado pelo Cypress');
    });

    it('CT18: Should update existing question text', () => {
      cy.get('[data-testid="question-text-input"]').first().clear().type('Pergunta Alterada');
      cy.get('[data-testid="save-form-btn"]').click();

      cy.contains('Formulário atualizado com sucesso!');
      
      // Verify persistence
      cy.get('[data-testid^="edit-btn"]').click();
      cy.get('[data-testid="question-text-input"]').should('have.value', 'Pergunta Alterada');
    });

    it('CT17: Should add a new question during edition', () => {
      cy.get('[data-testid="add-question-btn"]').click();
      
      cy.get('[data-testid="question-item"]').last().within(() => {
        cy.get('[data-testid="question-text-input"]').type('Nova Pergunta de Edição');
      });
      
      cy.get('[data-testid="save-form-btn"]').click();
      cy.contains('Formulário atualizado com sucesso!');
      
      cy.get('[data-testid^="edit-btn"]').click();
      cy.get('[data-testid="question-text-input"]').last().should('have.value', 'Nova Pergunta de Edição');
    });

    it('CT19: Should change question type and save', () => {
      // Change the default seeded question (Short Answer) to Long Answer
      cy.get('[data-testid="question-type-select"]').first().select('long_answer');
      cy.get('[data-testid="save-form-btn"]').click();
      
      cy.contains('Formulário atualizado com sucesso!');
      
      // Verify change
      cy.get('[data-testid^="edit-btn"]').click();
      cy.get('[data-testid="question-type-select"]').first().should('have.value', 'long_answer');
    });

    it('CT20: Should allow removing options from a multiple choice question', () => {
       // First add a multiple choice question
       cy.get('[data-testid="add-question-btn"]').click();
       cy.get('[data-testid="question-item"]').last().within(() => {
          cy.get('[data-testid="question-text-input"]').type('Multipla Escolha para Editar');
          cy.get('[data-testid="question-type-select"]').select('multiple_choice');
          cy.get('[data-testid="option-input-text"]').first().type('Opção A');
          cy.get('[data-testid="add-option-btn"]').click();
          cy.get('[data-testid="option-input-text"]').last().type('Opção B');
       });
       cy.get('[data-testid="save-form-btn"]').click();

       // Go back to edit
       cy.get('[data-testid^="edit-btn"]').click();

       // Remove Opção B
       cy.get('[data-testid="question-item"]').last().within(() => {
          // Assuming there is a delete button for options. If not, this will fail (Test Driven).
          // Using a generic selector guess based on potential implementation or existing.
          // If it doesn't exist, I'll need to fix the code later.
          cy.get('[data-testid="delete-option-btn"]').last().click();
          cy.get('[data-testid="option-input-text"]').should('have.length', 1);
       });
       
       cy.get('[data-testid="save-form-btn"]').click();
       cy.contains('Formulário atualizado com sucesso!');
    });

    it('CT22: Should prevent removing all questions (if required)', () => {
      // Try to delete the only question
      cy.get('[data-testid="delete-question-btn"]').each(($btn) => {
          cy.wrap($btn).click();
      });

      // Verify if it allows 0 questions or blocks it. 
      // The CT says "Deve ser bloqueado" (Should be blocked).
      cy.get('[data-testid="save-form-btn"]').click();
      
      // Expecting an error or staying on page
      cy.url().should('include', '/edit_form'); 
      // Or check for specific error message if implemented
    });
  });

  context('Form Deletion', () => {
    it('CT29: Should delete an existing form', () => {
      cy.seedForm();
      cy.visit('/forms');
      
      // Stub confirm
      cy.on('window:confirm', () => true);

      cy.get('[data-testid^="delete-btn"]').click();
      
      cy.contains('Formulário excluído com sucesso!').should('be.visible');
      cy.contains('Formulário Cypress').should('not.exist');
    });
  });
});