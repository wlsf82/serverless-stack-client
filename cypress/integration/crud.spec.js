const faker = require("faker");

describe("CRUD", () => {
  it('properly processes CRUD operations', () => {
    cy.login();
    
    const noteTextContent = faker.random.words(5)

    cy.createNote(noteTextContent);

    const updatedNoteTextContent = `${noteTextContent} updated`

    cy.editNote(noteTextContent, updatedNoteTextContent);

    cy.deleteNote(updatedNoteTextContent);
  });
});
