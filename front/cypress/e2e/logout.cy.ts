import { login } from "../support/auth";

describe("Logout functionality", () => {
	it("should display logout button and perform logout", () => {
		login("azdzad", "azdazd", false);

		cy.get("[data-cy=logout-button]").should("be.visible");

		cy.get("[data-cy=logout-button]").click();

		cy.location("pathname").should("eq", "/");
	});
});
