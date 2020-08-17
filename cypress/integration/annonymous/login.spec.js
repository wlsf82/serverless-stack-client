describe("Given I'm at the login page", () => {
  beforeEach(() => cy.visit("/login"));

  context("When I try to login with invalid credentials", () => {
    beforeEach(() => {
      cy.get("#email").type("invalid-user@example.com");
      cy.get("#password").type("invalid-password");
      cy.get("button").contains("Login").click();
    });

    it("Then I see a message that the user does not exist", () => {
      cy.on('window:alert', str => expect(str)
        .to.contain("User does not exist.")
      );
    });
  });
});
