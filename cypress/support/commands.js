const notes = require("../fixtures/notes");
const note1 = require("../fixtures/note1");
const note2 = require("../fixtures/note2");

Cypress.Commands.add("login", () => {
  cy.visit("/login");

  cy.get("#email").type(Cypress.env("user"));
  cy.get("#password").type(Cypress.env("password"));
  cy.get("button").contains("Login").click();
});

Cypress.Commands.add("mockEmptyNotes", () => {
  cy.server();
  cy.route({
    method: "GET",
    url: "**/notes",
    response: []
  }).as("getNotes");

  cy.wait("@getNotes");
});

Cypress.Commands.add("mockTwoNotes", () => {
  cy.server();
  cy.route({
    method: "GET",
    url: "**/notes",
    response: notes
  }).as("getNotes");

  cy.wait("@getNotes");;
});

Cypress.Commands.add("goToMockedFirstNote", () => {
  cy.server();
  cy.route({
    method: "GET",
    url: "**/notes/1",
    response: note1
  }).as("getNote");

  cy.get(".list-group-item")
    .eq(1)
    .click();

  cy.wait("@getNote");
});

Cypress.Commands.add("deleteMockedFirstNote", () => {
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
    response: [
      note2
    ]
  }).as("getNotes");

  cy.contains("Delete").click();

  cy.wait("@redirectToHome");
  cy.wait("@getNotes");
});
