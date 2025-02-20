import { login } from "cypress/support/auth";

const SESSION_ID = "1";
const TEACHER_ID = "1";
const USER_ID = "1";

describe("Session detail viewing for non-admin user participation", () => {
	it("should toggle participate and not-participate buttons accordingly", () => {
		let sessionCallCount = 0;
		// Intercept GET session details with dynamic response based on call count
		cy.intercept("GET", `/api/session/${SESSION_ID}`, (req) => {
			sessionCallCount++;
			if (sessionCallCount === 1) {
				// Initial state: user not participating
				req.reply({
					statusCode: 200,
					body: {
						id: SESSION_ID,
						name: "Session 1",
						description: "Description 1",
						date: "2022-01-01",
						teacher_id: TEACHER_ID,
						users: [],
					},
				});
			} else if (sessionCallCount === 2) {
				// After participation: user is added to the session
				req.reply({
					statusCode: 200,
					body: {
						id: SESSION_ID,
						name: "Session 1",
						description: "Description 1",
						date: "2022-01-01",
						teacher_id: TEACHER_ID,
						users: [Number(USER_ID)],
					},
				});
			} else {
				// After unparticipation: revert to initial state (user removed)
				req.reply({
					statusCode: 200,
					body: {
						id: SESSION_ID,
						name: "Session 1",
						description: "Description 1",
						date: "2022-01-01",
						teacher_id: TEACHER_ID,
						users: [],
					},
				});
			}
		}).as("GET_SESSION_DETAIL");

		// Intercept the GET teacher details
		cy.intercept("GET", `/api/teacher/${TEACHER_ID}`, {
			statusCode: 200,
			body: {
				id: TEACHER_ID,
				firstName: "John",
				lastName: "Doe",
			},
		}).as("GET_TEACHER_DETAIL");

		// Intercept the participate POST request and simulate a 200 OK response
		cy.intercept("POST", `/api/session/${SESSION_ID}/participate/${USER_ID}`, {
			statusCode: 200,
			body: {},
		});

		// Intercept the unparticipate DELETE request and simulate a 200 OK response
		cy.intercept(
			"DELETE",
			`/api/session/${SESSION_ID}/participate/${USER_ID}`,
			{
				statusCode: 200,
				body: {},
			},
		);

		// Use non-admin login function from auth.ts
		login("zaezae", "azdazd", false);

		// On the sessions page, click on the detail button of the first session listed
		cy.get(".item")
			.first()
			.within(() => {
				cy.get("[data-cy=detail-button]").should("be.visible").click();
			});

		// Wait for the initial session and teacher detail intercepts to complete
		cy.wait("@GET_SESSION_DETAIL");
		cy.wait("@GET_TEACHER_DETAIL");

		// Verify that the participate button is visible before clicking
		cy.get("[data-cy=participate-button]").should("be.visible");

		// Click on the participate button
		cy.get("[data-cy=participate-button]").click();

		// Wait for the GET session detail call after participation
		cy.wait("@GET_SESSION_DETAIL");

		// Verify that the participate button no longer exists and that the not-participate button is visible
		cy.get("[data-cy=participate-button]").should("not.exist");
		cy.get("[data-cy=not-participate-button]").should("be.visible");

		// Now click on the "Do not participate" button
		cy.get("[data-cy=not-participate-button]").click();

		// Wait for the GET session detail call after unparticipation
		cy.wait("@GET_SESSION_DETAIL");

		// Verify that the not-participate button is no longer visible and that the participate button reappears
		cy.get("[data-cy=participate-button]").should("be.visible");
		cy.get("[data-cy=not-participate-button]").should("not.exist");
	});
});
