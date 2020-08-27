describe("Empty list of notes", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/notes",
      response: []
    }).as("getNotes");

    cy.visit("/login");

    cy.fillLoginFormAndSubmit();

    cy.wait("@getNotes");
  });

  it("renders only one '.list-group-item', for adding a new note", () => {
    cy.get(".list-group-item")
      .should("have.length", 1)
      .and("contain", "Create a new note");
  });
});
