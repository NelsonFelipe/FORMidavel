describe('Form Management', () => {
  
  // Clear database before each test
  beforeEach(() => {
    cy.resetDb();
  });

  context('Form list', () => {
    it('CT23: Should display empty state when no forms exist', () => {

      cy.visit('/forms');

      cy.get('[data-testid="empty-state-title"]')
        .should('contain', 'Nenhum formulário criado');
      cy.get('[data-testid="empty-state-create-button"]')
        .should('be.visible');
    });

    it('CT24: Should list created forms', () => {
      cy.seedForm();

      cy.visit('/forms');

      cy.get('[data-testid="forms-grid"]')
        .should('exist');
      cy.get('[data-testid="form-card-title"]')
        .should('contain', 'Formulário Cypress');
      cy.get('[data-testid="submission-status-badge"]')
        .should('contain', 'Aguardando respostas');
    });
  });

  context('Form Creation', () => {
    beforeEach(() => {
      cy.visit('/create');
    });

    it('CT07: Should validate if title is required', () => {
      cy.get('[data-testid="form-desc-input"]')
        .type('Descrição válida');
      cy.get('[data-testid="question-text-input"]') 
        .first()
        .type('P1');
      cy.get('[data-testid="save-form-btn"]')
        .click();
      
      cy.url()
        .should('include', '/create');
    });

    it('CT08: Should validate if description is required', () => {
        cy.get('[data-testid="form-title-input"]')
          .type('Título Válido');
        cy.get('[data-testid="question-text-input"]')
          .first()
          .type('P1');
        cy.get('[data-testid="save-form-btn"]')
          .click();
        
        cy.url()
        .should('include', '/create');
    });

    it('CT09: Should accept special characters and emojis in title', () => {
      const tituloExotico = 'Pesquisa 🚀 Verão 2025 & Inverno ñ ç ã';
      cy.get('[data-testid="form-title-input"]')
        .type(tituloExotico);
      cy.get('[data-testid="form-desc-input"]')
        .type('Teste de encoding utf-8');
      cy.get('[data-testid="question-text-input"]')
        .first()
        .type('P1');
      
      cy.get('[data-testid="save-form-btn"]')
        .click();
      
      cy.contains('Formulário criado com sucesso!');
      cy.contains(tituloExotico)
        .should('be.visible');
    });

    it('CT05: Should create a complex form with all question types', () => {
      cy.get('[data-testid="form-title-input"]')
        .type('Formulário Completo');
      cy.get('[data-testid="form-desc-input"]')
        .type('Testando todos os tipos');

      cy.get('[data-testid="question-text-input"]')
        .eq(0)
        .type('Nome Completo');

      cy.get('[data-testid="add-question-btn"]')
        .click();
      cy.get('[data-testid="question-item"]')
        .eq(1)
        .within(() => {
          cy.get('[data-testid="question-text-input"]')
            .type('Deixe seu comentário');
          cy.get('[data-testid="question-type-select"]')
            .select('long_answer');
          cy.get('[data-testid="long-answer-placeholder"]')
            .should('exist');
        });

      cy.get('[data-testid="add-question-btn"]')
        .click();
      cy.get('[data-testid="question-item"]')
        .eq(2)
        .within(() => {
          cy.get('[data-testid="question-text-input"]')
            .type('Cor favorita');
          cy.get('[data-testid="question-type-select"]')
            .select('multiple_choice');
          
          cy.get('[data-testid="option-input-text"]').first().type('Azul');
          
          cy.get('[data-testid="add-option-btn"]')
            .click();
          cy.get('[data-testid="option-input-text"]')
            .last()
            .type('Vermelho');
        });

      cy.get('[data-testid="add-question-btn"]')
      .click();
      cy.get('[data-testid="question-item"]')
      .eq(3).within(() => {
        cy.get('[data-testid="question-text-input"]')
          .type('Hobbies');
        cy.get('[data-testid="question-type-select"]')
          .select('checkbox');
        
        cy.get('[data-testid="option-input-text"]')
          .first()
          .type('Leitura');
        cy.get('[data-testid="add-option-btn"]')
          .click();
        cy.get('[data-testid="option-input-text"]')
          .last()
          .type('Games');
      });

      cy.get('[data-testid="save-form-btn"]')
        .click();
      cy.url()
        .should('include', '/forms');
      cy.contains('Formulário criado com sucesso!')
        .should('be.visible');
    });

    it('CT10: Should respect character limits on title', () => {
        const longTitle = 'A'.repeat(150);
        cy.get('[data-testid="form-title-input"]')
          .type(longTitle);
        cy.get('[data-testid="form-title-input"]')
          .should('have.value', 'A'.repeat(100));
    });

    it('CT11: Should respect character limits on description', () => {
        const longDesc = 'B'.repeat(600);
        cy.get('[data-testid="form-desc-input"]')
          .type(longDesc);
        cy.get('[data-testid="form-desc-input"]')
          .should('have.value', 'B'.repeat(500));
    });

    it('CT12: Should allow removing a question during creation', () => {
        cy.get('[data-testid="question-text-input"]')
          .first().type('Pergunta 1');
        cy.get('[data-testid="add-question-btn"]')
          .click();
        cy.get('[data-testid="question-item"]')
          .eq(1)
          .within(() => {
            cy.get('[data-testid="question-text-input"]')
              .type('Pergunta 2');
          });

        cy.get('[data-testid="add-question-btn"]')
          .click();
        cy.get('[data-testid="question-item"]')
          .eq(2)
          .within(() => {
            cy.get('[data-testid="question-text-input"]')
              .type('Pergunta 3 (Para deletar)');
          });
  
        cy.get('[data-testid="question-item"]')
          .should('have.length', 3);
  
        cy.get('[data-testid="delete-question-btn"]')
        .last().click();
  
        cy.get('[data-testid="question-item"]')
          .should('have.length', 2);
        cy.get('[data-testid="question-text-input"]')
          .eq(0)
          .should('have.value', 'Pergunta 1');
        cy.get('[data-testid="question-text-input"]')
          .eq(1)
          .should('have.value', 'Pergunta 2');

        cy.get('[data-testid="delete-question-btn"]')
          .first()
          .click();
        cy.get('[data-testid="question-item"]')
          .should('have.length', 1);
        cy.get('[data-testid="question-text-input"]')
          .eq(0)
          .should('have.value', 'Pergunta 2');
    });

    it('CT13: Trying to create an empty option for multiple choice', () => {
        cy.get('[data-testid="form-title-input"]')
          .type('Form Validação');
        cy.get('[data-testid="form-desc-input"]')
          .type('Teste');
        
        cy.get('[data-testid="question-text-input"]')
          .type('P1');
        cy.get('[data-testid="question-type-select"]')
          .select('multiple_choice');
        cy.get('[data-testid="option-input-text"]')
          .first()
          .clear(); 
        cy.get('[data-testid="question-text-input"]')
          .first()
          .type('P1');
        
        cy.get('[data-testid="save-form-btn"]')
          .click();

        cy.url()
          .should('include', '/create');
    });

    it('CT14: Trying to create a multiple choice question with only one option.', () => {
        cy.get('[data-testid="form-title-input"]')
          .type('Form Validação');
        cy.get('[data-testid="form-desc-input"]')
          .type('Teste');
        
        cy.get('[data-testid="question-text-input"]')
          .first()
          .type('P1');
        cy.get('[data-testid="question-type-select"]')
          .select('multiple_choice');
        cy.get('[data-testid="option-input-text"]')
          .first().type('Opção 1');
        
        cy.get('[data-testid="save-form-btn"]')
          .click();
        
        cy.get('.Toastify__toast--error')
          .should('contain', 'Crie pelo menos 2 opções');
        cy.url()
          .should('include', '/create');
    });

    it('CT15: Trying to create a checkbox question with only one option', () => {
        cy.get('[data-testid="form-title-input"]')
          .type('Form Validação');
        cy.get('[data-testid="form-desc-input"]')
          .type('Teste');
        
        cy.get('[data-testid="question-text-input"]')
          .type('P1');
        cy.get('[data-testid="question-type-select"]')
          .select('checkbox');
        cy.get('[data-testid="option-input-text"]')
          .first()
          .type('Opção 1');
        cy.get('[data-testid="question-text-input"]')
          .first()
        .type('P1');
        
        cy.get('[data-testid="save-form-btn"]')
          .click();
        cy.url()
          .should('include', '/create');
    });

  });

  context('Form Editing', () => {
    beforeEach(() => {
      cy.seedForm().then((id) => {
        cy.visit(`/edit/${id}`);
      });
    });

    it('CT26: Should load existing data correctly', () => {
      cy.get('[data-testid="form-title-input"]')
        .should('have.value', 'Formulário Cypress');
      cy.get('[data-testid="question-item"]')
        .should('have.length.at.least', 1);
    });

    it('CT16: Should update title and save', () => {
      cy.get('[data-testid="form-title-input"]')
        .clear()
        .type('Título Editado pelo Cypress');
      cy.get('[data-testid="save-form-btn"]')
        .click();

      cy.url().should('include', '/forms');
      cy.contains('Formulário atualizado com sucesso!')
        .should('be.visible');
      cy.contains('Título Editado pelo Cypress');
    });

    it('CT18: Should update existing question text', () => {
      cy.get('[data-testid="question-text-input"]')
        .first()
        .clear()
        .type('Pergunta Alterada');
      cy.get('[data-testid="save-form-btn"]')
        .click();

      cy.contains('Formulário atualizado com sucesso!');
      
      cy.get('[data-testid^="edit-btn"]')
        .click();
      cy.get('[data-testid="question-text-input"]')
        .should('have.value', 'Pergunta Alterada');
    });

    it('CT17: Should add a new question during edition', () => {
      cy.get('[data-testid="add-question-btn"]')
        .click();
      
      cy.get('[data-testid="question-item"]')
        .last()
        .within(() => {
          cy.get('[data-testid="question-text-input"]')
            .type('Nova Pergunta de Edição');
        });
      
      cy.get('[data-testid="save-form-btn"]')
        .click();
      cy.contains('Formulário atualizado com sucesso!');
      
      cy.get('[data-testid^="edit-btn"]')
        .click();
      cy.get('[data-testid="question-text-input"]')
        .last()
        .should('have.value', 'Nova Pergunta de Edição');
    });

    it('CT19: Should change question type and save', () => {
      cy.get('[data-testid="question-type-select"]')
        .first()
        .select('long_answer');
      cy.get('[data-testid="save-form-btn"]')
        .click();
      
      cy.contains('Formulário atualizado com sucesso!');
      
      cy.get('[data-testid^="edit-btn"]')
        .click();
      cy.get('[data-testid="question-type-select"]')
        .first()
        .should('have.value', 'long_answer');
    });

    it('CT20: Should allow removing options from a multiple choice question', () => {
       cy.get('[data-testid="add-question-btn"]')
        .click();
       cy.get('[data-testid="question-item"]')
        .last()
        .within(() => {
          cy.get('[data-testid="question-text-input"]')
            .type('Multipla Escolha para Editar');
          cy.get('[data-testid="question-type-select"]')
            .select('multiple_choice');
          cy.get('[data-testid="option-input-text"]')
            .first()
            .type('Opção A');
          cy.get('[data-testid="add-option-btn"]')
            .click();
          cy.get('[data-testid="option-input-text"]')
            .last()
            .type('Opção B');
        });
       cy.get('[data-testid="save-form-btn"]')
        .click();

       cy.get('[data-testid^="edit-btn"]')
        .click();

       cy.get('[data-testid="question-item"]')
        .last()
        .within(() => {
          cy.get('[data-testid="delete-option-btn"]')
            .last()
            .click();
          cy.get('[data-testid="option-input-text"]')
            .should('have.length', 1);
        });
       
       cy.get('[data-testid="save-form-btn"]')
        .click();
       cy.contains('Formulário atualizado com sucesso!');
    });

    it('CT22: Should prevent removing all questions', () => {
      cy.get('[data-testid="question-item"]')
        .should('have.length.at.least', 1);

      cy.get('[data-testid="delete-question-btn"]')
        .click({ multiple: true });

      cy.get('[data-testid="question-item"]')
        .should('not.exist');

      cy.get('[data-testid="save-form-btn"]')
        .click();
      
      cy.contains('O formulário deve ter pelo menos uma pergunta.')
        .should('be.visible');
      
      cy.url()
        .should('include', '/edit'); 
    });
  });

  context('Form Deletion', () => {
    
    it('CT29: Should delete an existing form', () => {
      cy.seedForm();
      cy.visit('/forms');
      
      cy.on('window:confirm', () => true);

      cy.get('[data-testid^="delete-btn"]')
        .click();
      
      cy.contains('Formulário excluído com sucesso!')
        .should('be.visible');
      cy.contains('Formulário Cypress')
        .should('not.exist');
    });
  });
});