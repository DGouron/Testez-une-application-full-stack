import { login } from "cypress/support/auth";

describe("User update session", () => {
	it("Should update a session", () => {
		login("admin@example.com", "password123", true);
		cy.intercept("GET", "/api/session/1", {
			body: {
				id: "1",
				name: "Session 1",
				description: "Description 1",
				date: "2022-01-01",
				teacher_id: "1",
			},
		}).as("getSessionDetail");

		cy.intercept("GET", "/api/teacher", {
			body: [
				{ id: "1", firstName: "John", lastName: "Doe" },
				{ id: "2", firstName: "Jane", lastName: "Smith" },
			],
		}).as("getTeachers");

		cy.intercept("PUT", "/api/session/1", {
			statusCode: 200,
			body: {
				id: "1",
				name: "Updated session",
				description: "Updated description",
				date: "2022-01-02",
				teacher_id: "1",
			},
		}).as("updateSession");

		cy.get(".item").should("have.length", 2);
		cy.get(".item")
			.first()
			.within(() => {
				cy.get("[data-cy=edit-button]").should("exist");
				cy.get("[data-cy=detail-button]").should("exist");
			});

		cy.get(".item")
			.first()
			.within(() => {
				cy.get("[data-cy=edit-button]").click();
			});

		cy.url().should("include", "/sessions/update/1");
		cy.wait("@getSessionDetail");

		cy.get("input[formControlName=name]").clear().type("Updated session");
		cy.get("textarea[formControlName=description]")
			.clear()
			.type("Updated description");
		cy.get("input[formControlName=date]").clear().type("2022-01-02");
		cy.get("[data-cy=save-session-button]").should("not.be.disabled").click();

		cy.wait("@updateSession");

		cy.url().should("include", "/sessions");
	});

	it("Edit button should be hidden for non-admin users", () => {
		login("zaezae", "azdazd", false);
		cy.get(".item")
			.first()
			.within(() => {
				cy.get("[data-cy=edit-button]").should("not.exist");
				cy.get("[data-cy=detail-button]").should("exist");
			});
	});
});
