const constants =  require("../../fixtures/constants");

describe("Given I'm logged into the app", () => {
  beforeEach(() => cy.login());

  context("When simulating no notes for the user on DynamoDB", () => {
    beforeEach(() => cy.mockEmptyNotes());

    it("Then only one '.list-group-item' is shown, for adding a new note", () => {
      cy.get(".list-group-item")
        .should("have.length", 1)
        .and("contain", constants.CREATE_A_NEW_NOTE);
    });
  });

  context("When simulating two notes for the user on DynamoDB", () => {
    beforeEach(() => cy.mockTwoNotes());

    it("Then three '.list-group-item's are shown, all with the proper content", () => {
      const notes = require("../../fixtures/notes");

      cy.get(".list-group-item")
        .as("list-group-item")
        .should("have.length", 3);
      cy.get("@list-group-item")
        .eq(0)
        .should("contain", constants.CREATE_A_NEW_NOTE);
      cy.get("@list-group-item")
        .eq(1)
        .should("contain", notes[0].content);
      cy.get("@list-group-item")
        .eq(2)
        .should("contain", notes[1].content);
    });
  });
});
