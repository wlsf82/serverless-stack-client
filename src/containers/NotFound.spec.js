import React from "react";
import NotFound from "./NotFound";
import { mount } from "cypress-react-unit-test";

describe("NotFound", () => {
  it("properly renders the component", () => {
    mount(<NotFound />);

    cy.get("h3:contains('Sorry, page not found!')")
      .should("be.visible");
  });
});
