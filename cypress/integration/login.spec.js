describe("Login", () => {
  const user = {
    name: Cypress.env("user"),
    password: "invalid-password"
  }

  beforeEach(() => cy.login(user));

  it("alerts about incorrect username or password", () => {
    cy.on("window:alert", str => expect(str).to.equal(
      "Incorrect username or password."
    ));
  });
});
