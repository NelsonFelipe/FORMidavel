describe('Landing Page & Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('CT48: Should load the home page correctly', () => {
    cy.contains('Crie formulários extraordinários').should('be.visible');
    cy.contains('Começar Agora').should('be.visible');
  });

  it('CT49: Should navigate to the forms list from the menu', () => {
    // Using robust data-testid
    cy.get('[data-testid="nav-my-forms"]').click();
    cy.url().should('include', '/forms');
    cy.contains('Meus Formulários').should('be.visible');
  });
});
