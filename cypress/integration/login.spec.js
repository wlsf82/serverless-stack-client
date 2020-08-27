describe("Login", () => {
  const invalidUserCredential = {
    name: Cypress.env("user"),
    password: "invalid-password"
  }
  beforeEach(() => {
    cy.visit("/login");

    cy.fillLoginFormAndSubmit(invalidUserCredential);
  });

  it("alerts about incorrect username or password", () => {
    cy.on("window:alert", str => expect(str).to.equal(
      "Incorrect username or password."
    ));
  });
});
