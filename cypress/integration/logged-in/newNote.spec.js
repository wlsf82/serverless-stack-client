const CREATE_A_NEW_NOTE =  "Create a new note";

describe("Given I'm logged into the app, and I visit the new note form", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/notes/new");
  });

  context("When no field is filled", () => {
    it("Then the 'Create' button is disabled", () => {
      cy.contains("Create").should("be.disabled");
    });
  });

  context("When the text field is filled", () => {
    beforeEach(() => cy.get("#content").type("Some content"));

    it("Then the 'Create' button gets enabled", () => {
      cy.contains("Create").should("be.enabled");
    });

    context("When submitting the form", () => {
      beforeEach(() => {
        cy.server();
        cy.route({
          method: "POST",
          url: "**/notes",
          response: {
            attachment: null,
            content: "Some content",
            createdAt: 1597588292418,
            noteId: 3,
            userId: 123,
            redirect: "/notes"
          }
        }).as("addPost");

        cy.route({
          method: "GET",
          url: "**/notes",
          response: [{
            "attachment": null,
            "content": "Some content",
            "createdAt":1597588292418,
            "noteId":"3"
          }]
        }).as("getNotes");

        cy.contains("Create").click();

        cy.wait("@addPost");
        cy.wait("@getNotes");
      });

      it("Then two '.list-group-item's are shown, all with the proper content", () => {
        cy.get(".list-group-item")
          .as("list-group-item")
          .should("have.length", 2);
        cy.get("@list-group-item")
          .eq(0)
          .should("contain", CREATE_A_NEW_NOTE);
        cy.get("@list-group-item")
          .eq(1)
          .should("contain", "Some content");
      });
    });
  });
});
