describe("Given I'm logged into the app", () => {
  beforeEach(() => cy.login());

  context("When simulating two notes for the user on DynamoDB", () => {
    beforeEach(() => cy.mockTwoNotes());

    context("When navigating to the first note", () => {
      const notes = require("../../fixtures/notes");

      beforeEach(() => cy.goToMockedFirstNote());

      it("Then the form properly displays the note", () => {
        cy.get("#content").should("contain", notes[0].content);
        cy.get(".form-control-static").should("contain", notes[0].attachment);
      });

      context("When deleting the note", () => {
        beforeEach(() => cy.deleteMockedFirstNote());

        it("Then only the second note is shown at the home page", () => {
          const constants =  require("../../fixtures/constants");

          cy.get(".list-group-item")
            .as("list-group-item")
            .should("have.length", 2);
          cy.get("@list-group-item")
            .eq(0)
            .should("contain", constants.CREATE_A_NEW_NOTE);
          cy.get("@list-group-item")
            .eq(1)
            .should("contain", notes[1].content);
        });
      });
    });
  });
});
