describe("Logout", () => {
  beforeEach(() => cy.login());

  it("redirects to login page on logout", () => {
    cy.contains("Logout").click();

    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/login`);
  });
});
