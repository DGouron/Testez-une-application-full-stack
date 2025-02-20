import { login } from "cypress/support/auth";

describe("Delete account functionality", () => {
	it("devrait supprimer le compte et rediriger vers la page d’accueil après suppression", () => {
		// Connecter l'utilisateur non admin
		login("exemple@domaine.com", "motdepasse", false);

		cy.intercept("GET", "/api/user/1", {
			statusCode: 200,
			body: {
				id: 1,
				firstName: "Jane",
				lastName: "Doe",
				email: "exemple@domaine.com",
				admin: false,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
		}).as("getUser");

		// Intercepter la requête DELETE envoyée lors de la suppression du compte
		cy.intercept("DELETE", "/api/user/1", {
			statusCode: 200,
			body: {},
		}).as("deleteUser");

		// Naviguer vers la page du compte utilisateur
		cy.get("[data-cy=account-button]").click();

		cy.wait("@getUser");

		// Vérifier que le bouton de suppression est bien visible.
		// Dans le template, il se trouve dans la zone affichée uniquement si l'utilisateur n'est pas admin.
		// Ici on cible le bouton par l'icône "delete" présente à l'intérieur.
		cy.get("[data-cy=delete-button]").should("be.visible");

		// Cliquer sur le bouton de suppression (celui affichant l'icône 'delete')
		cy.get("[data-cy=delete-button]").click();

		// Attendre la réponse de la requête DELETE
		cy.wait("@deleteUser");

		// Vérifier que l'utilisateur est redirigé vers la page d’accueil ("/")
		cy.location("pathname").should("eq", "/");
	});
});
