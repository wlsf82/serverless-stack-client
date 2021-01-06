describe("Settings", () => {
  it("properly processes a test credit card 'payment'", () => {
    cy.login();
    cy.contains("Settings").click();
    cy.fillSettingsFormAndSubmit();

    cy.on("window:alert", str => expect(str).to.equal(
      "Your card has been charged successfully!"
    ));

    cy.waitForNotes();
  });
});
