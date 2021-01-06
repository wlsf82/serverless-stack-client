describe("Redirect", () => {
  it("redirects correctly after logging in", () => {
    const newNotesRelativeUrl = "notes/new";

    cy.visit(newNotesRelativeUrl);

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/login?redirect=/${newNotesRelativeUrl}`
    );

    cy.fillLoginFormAndSubmit();

    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}/${newNotesRelativeUrl}`
    );

    cy.visit("/login");

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);
  });
});
