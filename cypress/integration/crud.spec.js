const faker = require("faker");

describe("CRUD", () => {
  it("properly processes CRUD operations", () => {
    cy.login();
    
    const noteTextContent = faker.random.words(5);

    cy.createNote(noteTextContent);

    const updatedNoteTextContent = `${noteTextContent} updated`;

    cy.editNote(noteTextContent, updatedNoteTextContent);

    cy.deleteNote(updatedNoteTextContent);
  });

  it("alerts that file is too big", () => {
    const noteTextContent = faker.random.words(5);
    const largeFile = "../../cypress/fixtures/large-file.txt";

    cy.login();
    cy.contains("Create a new note").click();

    cy.fillNewNotesFormAndSubmit(noteTextContent, largeFile);

    cy.on("window:alert", str => expect(str).to.equal(
      "Please pick a file smaller than 5 MB."
    ));
  });
});
