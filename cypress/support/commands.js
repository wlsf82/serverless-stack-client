import 'cypress-file-upload';

Cypress.Commands.add("login", () => {
  cy.visit("/login");

  cy.get("#email").type(Cypress.env("user"));
  cy.get("#password").type(Cypress.env("password"));
  cy.get("button").contains("Login").click();

  cy.waitForNotes();
});

Cypress.Commands.add("createNote", noteText => {
  const sampleFile = "../../cypress/fixtures/sample-file.txt";

  cy.contains("Your Notes").should("be.visible");

  cy.contains("Create a new note")
    .should("be.visible")
    .click();

  cy.get('#content')
    .should("be.visible")
    .type(noteText);

  cy.get("input[type='file']")
    .should("exist")
    .attachFile(sampleFile);

  cy.contains("Create")
    .should("be.visible")
    .click();

  cy.waitForNotes();
});

Cypress.Commands.add("editNote", (note, updatedNote) => {
  cy.clickNote(note);

  cy.get('#content')
    .should("be.visible")
    .clear()
    .type(updatedNote);

  cy.contains("Save")
    .should("be.visible")
    .click();

  cy.waitForNotes();
});

Cypress.Commands.add("deleteNote", note => {
  cy.clickNote(note);

  cy.contains("Delete")
    .should("be.visible")
    .click();

  cy.waitForNotes();

  cy.contains(note)
    .should("not.be.visible");
});

Cypress.Commands.add("waitForNotes", () => {
  cy.server();
  cy.route({
    method: "GET",
    url: "**/notes",
  }).as("getNotes");

  cy.wait("@getNotes");
});

Cypress.Commands.add("clickNote", note => {
  cy.contains(note)
    .should("be.visible")
    .click();
});
