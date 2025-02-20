import { login } from "cypress/support/auth";

describe("Failure to delete an account", () => {
	it("should display an error and remain on /me if the deletion fails", () => {
		// Connect a non-admin user
		login("example@domain.com", "password", false);

		cy.intercept("GET", "/api/user/1", {
			statusCode: 200,
			body: {
				id: 1,
				firstName: "Jane",
				lastName: "Doe",
				email: "example@domain.com",
				admin: false,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
		}).as("getUser");

		// Intercept the DELETE request to simulate a failure (status 500)
		cy.intercept("DELETE", "/api/user/1", {
			statusCode: 500,
			body: { message: "Error during account deletion" },
		}).as("deleteUserFailure");

		cy.get("[data-cy=account-button]").click();

		cy.wait("@getUser");

		cy.get("[data-cy=delete-button]").should("be.visible");

		cy.get("[data-cy=delete-button]").click();

		cy.wait("@deleteUserFailure");

		cy.location("pathname").should("eq", "/me");
	});
});
