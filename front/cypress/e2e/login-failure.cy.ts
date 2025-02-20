import { login } from "cypress/support/auth";

describe("Auth process failure", () => {
	it("Should display an error message when a connection failure occurs", () => {
		cy.visit("/login");
		cy.intercept("POST", "/api/auth/login", {
			statusCode: 401,
			body: { error: "Invalid credentials" },
		});

		cy.get("input[formControlName=email]").type("dada@dada.dad");
		cy.get("input[formControlName=password]").type(`"zaeaea"{enter}{enter}`);

		cy.get("[data-cy=login-error]")
			.should("be.visible")
			.and("contain.text", "An error occurred");
	});
});
