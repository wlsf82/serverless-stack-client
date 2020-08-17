describe("Given I'm logged into the app, and a visit a non-existing page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/non-existing-page");
  });

  it("Then a page not found paragraph is shown", () => {
    cy.contains("Sorry, page not found!").should("be.visible");
  });
});
