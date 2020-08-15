Cypress.Commands.add("login", (params = {}) => {
  cy.visit("/login");

  cy.get("#email").type(Cypress.env("user"));
  cy.get("#password").type(Cypress.env("password"));
  cy.get("button").contains("Login").click();

  cy.server();

  params.notes ?
    cy.route({
      method: "GET",
      url: "**/notes",
      response: params.notes
    }).as("getNotes") :
    cy.route({
      method: "GET",
      url: "**/notes",
    }).as("getNotes");

  cy.wait("@getNotes");
});

Cypress.Commands.add("goToNote", () => {
  const note1 = require("../fixtures/note1");

  cy.server();
  cy.route({
    method: "GET",
    url: "**/notes/**",
    response: note1
  }).as("getNote");

  cy.visit("/notes/1");

  cy.wait("@getNote");
});

Cypress.Commands.add("deleteMockedNote", () => {
  cy.server();
  cy.route({
    method: "DELETE",
    url: "**/notes/1",
    response: {
      redirect: "/notes"
    }
  }).as("redirectToHome");

  cy.route({
    method: "GET",
    url: "**/notes",
    response: []
  }).as("getNotes");

  cy.contains("Delete").click();

  cy.wait("@redirectToHome");
  cy.wait("@getNotes");
});
