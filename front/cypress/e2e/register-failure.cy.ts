describe("Registration failure scenario", () => {
	it("should display an error message when registration fails", () => {
		cy.visit("/register");

		cy.intercept("POST", "/api/auth/register", {
			statusCode: 500,
			body: { error: "Registration failed" },
		}).as("registrationFailure");

		cy.get("input[formControlName=email]").type("fail@registration.com");
		cy.get("input[formControlName=firstName]").type("TestFirstName");
		cy.get("input[formControlName=lastName]").type("TestLastName");
		cy.get("input[formControlName=password]").type("testPassword123");

		cy.get('button[type="submit"]').click();

		cy.wait("@registrationFailure");

		cy.get("[data-cy=register-error]")
			.should("be.visible")
			.and("contain.text", "An error occurred");
	});
});
