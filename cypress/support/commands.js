// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- Database Commands --

// Resets the database
Cypress.Commands.add('resetDb', () => {
  cy.request('POST', '/test/reset_db');
});

// Seeds a test form via API and returns the ID
Cypress.Commands.add('seedForm', () => {
  return cy.request('POST', '/test/seed_form').then((response) => {
    return response.body.id; // Returns the ID to be used in .then()
  });
});

// -- Navigation Commands --

// Navigates to the form response page via Dashboard
Cypress.Commands.add('navigateToFormToAnswer', (formTitle, formId) => {
  cy.visit('/forms');
  cy.contains(formTitle)
    .parents('[data-testid^="form-card-"]')
    .within(() => {
      if (formId) {
          cy.get(`[data-testid="respond-btn-${formId}"]`).click();
      } else {
          cy.get('[data-testid^="respond-btn-"]').click();
      }
    });
});

// -- Verification Commands --

Cypress.Commands.add('getLastSubmission', (formId) => {
  return cy.request(`GET`, `/test/get_submission_data/${formId}`).then((response) => {
    return response.body;
  });
});