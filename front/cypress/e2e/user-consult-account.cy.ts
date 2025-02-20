import { login } from "cypress/support/auth";

describe("Consultation du compte utilisateur", () => {
	it('devrait afficher le bouton "Account" dans le menu et rediriger vers /me après clic', () => {
		login("exemple@domaine.com", "motdepasse", false);

		cy.get("[data-cy=account-button]").should("be.visible");

		cy.get("[data-cy=account-button]").click();

		cy.location("pathname").should("eq", "/me");
	});
});
