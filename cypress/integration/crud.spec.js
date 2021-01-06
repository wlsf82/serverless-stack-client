const faker = require("faker");

describe("CRUD", () => {
  beforeEach(() => cy.login());

  it("properly processes CRUD operations", () => {
    const randomNoteText = faker.random.words(5);
    const note = { text: randomNoteText };

    cy.createNote(note);
    cy.editNote(note);
    cy.deleteNote(`${note.text} updated`);
  });

  it("alerts that file is too big", () => {
    const largeFile = "../../cypress/fixtures/large-file.txt";
    const note = {
      text: faker.random.words(5),
      file: largeFile,
      fail: true,
    }

    cy.createNote(note);

    cy.on("window:alert", str => expect(str).to.equal(
      "Please pick a file smaller than 5 MB."
    ));
  });
});
