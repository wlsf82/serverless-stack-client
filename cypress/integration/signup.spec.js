describe("Signup", () => {
  beforeEach(() => cy.visit("/signup"));

  context("Filling confirm password different than password", () => {
    beforeEach(() => {
      cy.get("#email").type("john-doe@example.com");
      cy.get("#password").type("some-password");
      cy.get("#confirmPassword").type("some-other-password");
    });

    it("keeps the signup button disabled", () => {
      cy.get("button")
        .contains("Signup")
        .should("be.disabled");
    });
  });

  context("Filling the form with an existing user", () => {
    beforeEach(() => {
      const password = "some-secret-password";

      cy.get("#email").type(Cypress.env("user"));
      cy.get("#password").type(password);
      cy.get("#confirmPassword").type(password);
      cy.get("button[type='submit']").click();
    });

    it("alerts that the user already exists", () => {
      cy.on("window:alert", str => expect(str).to.equal(
        "An account with the given email already exists."
      ));
    });
  });
});