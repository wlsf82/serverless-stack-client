import React from "react";
import NewNote from "./NewNote";
import { mount } from "cypress-react-unit-test"

describe("NewNote", () => {
  beforeEach(() => {
    mount(
      <NewNote />,
      {
        stylesheets: [
          "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        ]
      }
    )
  });

  context("Form initial state", () => {
    it("Create button is disabled", () => {
      cy.contains("Create").should("be.disabled");
    });
  });

  context("Form already filled", () => {
    beforeEach(() => cy.get("#content").type("Some content"));

    it("Create button gets enabled", () => {
      cy.contains("Create").should("be.enabled");
    });

    it("Submits the form", () => {
      cy.contains("Create").click();
    });

    it("Attaches a file", () => {
      const textFile = "../../cypress/fixtures/text.txt";
      cy.get("input[type='file']").attachFile(textFile);
    });

    it("Tries to attaches a large file", () => {
      const textFile = "../../cypress/fixtures/large-file.txt";
      cy.get("input[type='file']").attachFile(textFile);

      cy.contains("Create").click();
    });
  });
});