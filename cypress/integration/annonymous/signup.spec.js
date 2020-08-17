describe("Given I'm at the signup page", () => {
  beforeEach(() => cy.visit("/signup"));

  context("When filling confirm password different than password", () => {
    beforeEach(() => {
      cy.get("#email").type("john-doe@example.com");
      cy.get("#password").type("some-password");
      cy.get("#confirmPassword").type("some-other-password");
    });

    it("Then the signup button is kept disabled", () => {
      cy.get("button").contains("Signup")
        .should("be.disabled");
    });
  });
});
