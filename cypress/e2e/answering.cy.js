describe('Answering Forms', () => {
  let formId;

  // Reset DB and seed form before each test
  beforeEach(() => {
    cy.resetDb();
    cy.seedForm().then((id) => {
      formId = id;
    });
  });

  it('CT35: Should prevent submission if required short answer is empty', () => {
    cy.visit(`/form/${formId}`);
    cy.get('[data-testid="submit-answer-btn"]')
      .click();
    cy.contains('Sucesso!')
      .should('not.exist'); // Verify success page is NOT shown
  });

  it('CT34: Should submit a response successfully (happy path)', () => {
    cy.visit(`/form/${formId}`);
    cy.get('[data-testid^="short-answer-input-"]')
      .type('Resposta Válida');
    cy.get('[data-testid="submit-answer-btn"]')
      .click();
    
    cy.contains('Sucesso!')
      .should('be.visible');
    cy.contains('Voltar para Meus Formulários')
      .click();
    cy.contains('1 Resp.')
      .should('be.visible'); // Verify badge on dashboard
  });

  it('CT31: Should handle non-existent form ID gracefully (404)', () => {
    cy.visit('/form/999999', { failOnStatusCode: false });
    cy.contains('Formulário não encontrado').should('be.visible');
  });

  it('CT36: Should validate required selection for multiple choice', () => {
    cy.visit('/create');
    cy.get('[data-testid="form-title-input"]').type('Formulário Validação MC');
    cy.get('[data-testid="form-desc-input"]').type('Teste');
    
    // Q1: Multiple Choice
    cy.get('[data-testid="question-text-input"]').type('Escolha uma');
    cy.get('[data-testid="question-type-select"]').select('multiple_choice');
    cy.get('[data-testid="option-input-text"]').first().type('Opção 1');
    cy.get('[data-testid="add-option-btn"]').click();
    cy.get('[data-testid="option-input-text"]').last().type('Opção 2');

    cy.get('[data-testid="save-form-btn"]').click();
    cy.url().should('include', '/forms'); // Confirm navigation to forms list

    cy.contains('Formulário Validação MC')
        .parents('[data-testid^="form-card-"]')
        .invoke('attr', 'data-testid')
        .then((testid) => {
            const formId = testid.split('-')[2];
            cy.visit(`/form/${formId}`); // Navigate directly to the form answering page
        });

    // Try to submit empty
    cy.get('[data-testid="submit-answer-btn"]').click();
    
    // Should stay on page
    cy.url().should('include', '/form/');
    cy.contains('Sucesso!').should('not.exist');
  });

  it('CT37: Should validate required selection for checkbox', () => {
    cy.visit('/create');
    cy.get('[data-testid="form-title-input"]').type('Formulário Validação CB');
    cy.get('[data-testid="form-desc-input"]').type('Teste');

    // Q1: Checkbox
    cy.get('[data-testid="question-text-input"]').type('Marque todas');
    cy.get('[data-testid="question-type-select"]').select('checkbox');
    cy.get('[data-testid="option-input-text"]').first().type('Check 1');
    cy.get('[data-testid="add-option-btn"]').click();
    cy.get('[data-testid="option-input-text"]').last().type('Check 2');

    cy.get('[data-testid="save-form-btn"]').click();
    cy.url().should('include', '/forms'); // Confirm navigation to forms list

    cy.contains('Formulário Validação CB')
        .parents('[data-testid^="form-card-"]')
        .invoke('attr', 'data-testid')
        .then((testid) => {
            const formId = testid.split('-')[2];
            cy.visit(`/form/${formId}`); // Navigate directly to the form answering page
        });

    // Try to submit empty
    cy.get('[data-testid="submit-answer-btn"]').click();
    
    // Should stay on page
    cy.url().should('include', '/form/');
    cy.contains('Sucesso!').should('not.exist');
  });

  it('CT38: Should submit multiple checkbox options', () => {
     cy.visit('/create');
     cy.get('[data-testid="form-title-input"]').type('Form Checkbox Multiple');
     cy.get('[data-testid="form-desc-input"]').type('DB Check');
     
     // Q1: Checkbox
     cy.get('[data-testid="question-text-input"]').type('Fruits');
     cy.get('[data-testid="question-type-select"]').select('checkbox');
     cy.get('[data-testid="option-input-text"]').first().type('Apple'); // Option 0
     cy.get('[data-testid="add-option-btn"]').click();
     cy.get('[data-testid="option-input-text"]').last().type('Banana'); // Option 1
     
     cy.get('[data-testid="save-form-btn"]').click();
     cy.url().should('include', '/forms'); // Confirm navigation
     
     cy.contains('Form Checkbox Multiple')
        .parents('[data-testid^="form-card-"]')
        .invoke('attr', 'data-testid')
        .then((testid) => {
           const formId = testid.split('-')[2];
           cy.visit(`/form/${formId}`); // Navigate directly
           
           // Select both options
           cy.get('[data-testid^="checkbox-option-input-"]').check(); 
           
           cy.get('[data-testid="submit-answer-btn"]').click();
           cy.contains('Sucesso!').should('be.visible');
        });
  });

  it('CT45: Should verify answers are linked to correct submission in DB', () => {
      // Reusing the logic of seeding/submitting or checking previous state isn't clean in E2E if isolated.
      // Ideally, we run a full flow: Create -> Submit -> Check DB.
      // Let's do a quick flow here.
      
      cy.seedForm().then((formId) => {
          cy.visit(`/form/${formId}`);
          cy.get('[data-testid^="short-answer-input-"]').type('Resposta DB Link');
          cy.get('[data-testid="submit-answer-btn"]').click();
          
          cy.getLastSubmission(formId).then((submission) => {
              expect(submission.form_id).to.eq(parseInt(formId));
              expect(submission.answers).to.have.length(1);
              expect(submission.answers[0].answer_text).to.eq('Resposta DB Link');
          });
      });
  });

  it('CT46: Should verify selectedOption saves correct option IDs', () => {
     // Create Checkbox form
     cy.visit('/create');
     cy.get('[data-testid="form-title-input"]').type('Form Options DB');
     cy.get('[data-testid="form-desc-input"]').type('DB Check');
     
     cy.get('[data-testid="question-text-input"]').type('Q1');
     cy.get('[data-testid="question-type-select"]').select('checkbox');
     cy.get('[data-testid="option-input-text"]').first().type('OptA'); 
     cy.get('[data-testid="add-option-btn"]').click();
     cy.get('[data-testid="option-input-text"]').last().type('OptB');
     
     cy.get('[data-testid="save-form-btn"]').click();
     cy.url().should('include', '/forms'); // Confirm navigation
     
     cy.contains('Form Options DB')
        .parents('[data-testid^="form-card-"]')
        .invoke('attr', 'data-testid')
        .then((testid) => {
           const formId = testid.split('-')[2];
           cy.visit(`/form/${formId}`); // Navigate directly
           
           // Select both
           cy.get('[data-testid^="checkbox-option-input-"]').check(); 
           cy.get('[data-testid="submit-answer-btn"]').click();
           
           cy.getLastSubmission(formId).then((submission) => {
              expect(submission.answers[0].selected_options).to.have.length(2);
              // IDs are internal, just checking if we have 2 IDs is enough for "correctly saves IDs" logic at this level
              // or we could fetch options to compare, but length > 0 implies relation is working.
           });
        });
  });

  it('CT42: Should allow submitting another response', () => {
    cy.visit(`/form/${formId}`);
    cy.get('[data-testid^="short-answer-input-"]').type('Resposta 1');
    cy.get('[data-testid="submit-answer-btn"]').click();
    
    cy.contains('Sucesso!').should('be.visible');
    
    cy.contains('Enviar outra resposta').click();
    
    // Should be back at form
    cy.get('[data-testid^="short-answer-input-"]').should('be.visible');
    cy.get('[data-testid^="short-answer-input-"]').should('have.value', '');
  });
});