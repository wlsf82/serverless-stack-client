import "cypress-file-upload";

Cypress.Commands.add("fillLoginFormAndSubmit", (user = {
  name: Cypress.env("user"),
  password: Cypress.env("password")
}) => {
  cy.get("#email").type(user.name);
  cy.get("#password").type(user.password);
  cy.get("button").contains("Login").click();
})

Cypress.Commands.add("login", (user = {
  name: Cypress.env("user"),
  password: Cypress.env("password")
}) => {
  cy.visit("/login");
  cy.fillLoginFormAndSubmit(user);
});

Cypress.Commands.add("createNote", (note = {
  text,
  fail: false,
}) => {
  cy.contains("Create a new note")
    .should("be.visible")
    .click();
  cy.get("#content")
    .should("be.visible")
    .type(note.text);

  if (note.file) {
    cy.get("input[type='file']")
      .should("exist")
      .attachFile(note.file);
  }

  cy.contains("Create")
    .should("be.visible")
    .click();

  if (!note.fail) {
    cy.waitForNotes();
    cy.contains(note.text)
      .should('be.visible');
  }
});

Cypress.Commands.add("editNote", (note) => {
  const newNoteText = `${note.text} updated`;
  const sampleFile = "../../cypress/fixtures/sample-file.txt";

  cy.clickNote(note.text);
  cy.get("#content")
    .should("be.visible")
    .clear()
    .type(newNoteText);
  cy.get("input[type='file']")
    .should("exist")
    .attachFile(sampleFile);
  cy.contains("Save")
    .should("be.visible")
    .click();
  cy.waitForNotes();
  cy.contains(newNoteText)
    .should('be.visible');
});

Cypress.Commands.add("deleteNote", note => {
  cy.clickNote(note);
  cy.contains("Delete")
    .should("be.visible")
    .click();
  cy.waitForNotes();
  cy.contains(note)
    .should("not.exist");
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

Cypress.Commands.add("fillSettingsFormAndSubmit", () => {
  const faker = require("faker");

  cy.get("#storage").type("10");
  cy.get("#name").type(`${faker.name.firstName()} ${faker.name.lastName()}`);
  cy.iframe(".__PrivateStripeElement > iframe")
    .find("input[name='cardnumber']").type("4242424242424242");
  cy.iframe(".__PrivateStripeElement > iframe")
    .find("input[name='exp-date']").type("12/30");
  cy.iframe(".__PrivateStripeElement > iframe")
    .find("input[name='cvc']").type("12345678");
  cy.contains("Purchase").click();
});
