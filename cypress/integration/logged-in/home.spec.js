const CREATE_A_NEW_NOTE =  "Create a new note";

describe("Given I'm logged into the app - empty state", () => {
  beforeEach(() => cy.login({ notes: [] }));

  it("Then only one '.list-group-item' is shown, for adding a new note", () => {
    cy.get(".list-group-item")
      .should("have.length", 1)
      .and("contain", CREATE_A_NEW_NOTE);
  });
});

describe("Given I'm logged into the app - two notes", () => {
  const notes = require("../../fixtures/notes");

  beforeEach(() => cy.login({ notes }));

  it("Then three '.list-group-item's are shown, all with the proper content", () => {
    cy.get(".list-group-item")
      .as("list-group-item")
      .should("have.length", 3);
    cy.get("@list-group-item")
      .eq(0)
      .should("contain", CREATE_A_NEW_NOTE);
    cy.get("@list-group-item")
      .eq(1)
      .should("contain", notes[0].content);
    cy.get("@list-group-item")
      .eq(2)
      .should("contain", notes[1].content);
  });
});
