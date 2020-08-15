const notes = require("../../fixtures/notes");

describe("Given I'm logged into the app, and I visit a note", () => {
  beforeEach(() => {
    cy.login();
    cy.goToNote()
  });

  it("Then the form properly displays the note", () => {
    cy.get("#content").should("contain", notes[0].content);
    cy.get(".form-control-static").should("contain", notes[0].attachment);
  });

  context("When deleting the note", () => {
    beforeEach(() => cy.deleteMockedNote());

    it("Then I'm redirected to the home page", () => {
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/`);
    });
  });
});
