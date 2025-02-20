import { login } from "cypress/support/auth";

describe("User create session - failure scenario", () => {
	before(() => {
		login("user@example.com", "password123", true);

		cy.intercept("GET", "/api/teacher", {
			body: [
				{ id: "1", firstName: "John", lastName: "Doe" },
				{ id: "2", firstName: "Jane", lastName: "Smith" },
			],
		}).as("getTeachers");

		cy.get("[data-cy=create-button]").click();
		cy.url().should("include", "/sessions/create");
	});

	it("should display an error message and remain on the creation page if session creation fails", () => {
		cy.intercept("POST", "/api/session", {
			statusCode: 500,
			body: { error: "Error during session creation" },
		}).as("createSessionFailure");

		cy.get("mat-select[formControlName=teacher_id]").click();
		cy.get("mat-option").should("have.length", 2);
		cy.get("mat-option").first().click();
		cy.get("input[formControlName=name]").type("New session");
		cy.get("textarea[formControlName=description]").type(
			"This is a new session",
		);
		cy.get("input[formControlName=date]").type("2022-01-01");

		cy.get("[data-cy=save-session-button]").should("not.be.disabled").click();

		cy.wait("@createSessionFailure");

		cy.location("pathname").should("eq", "/sessions/create");
	});
});
