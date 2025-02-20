export const login = (email: string, password: string, admin: boolean) => {
  cy.visit('/login');

  cy.intercept('POST', '/api/auth/login', {
    body: {
      id: 1,
      username: 'userName',
      firstName: 'firstName',
      lastName: 'lastName',
      admin: admin
    },
  });

  cy.intercept(
    {
      method: 'GET',
      url: '/api/session',
    },
    [
      { id: '1', name: 'Session 1', description: 'Description 1', date: '2022-01-01', teacher_id: '1' },
      { id: '2', name: 'Session 2', description: 'Description 2', date: '2022-01-02', teacher_id: '2' }
    ]
  ).as('session');

  cy.get('input[formControlName=email]').type(email);
  cy.get('input[formControlName=password]').type(`${password}{enter}{enter}`);

  cy.url().should('include', '/sessions');
};

describe('Login process', () => {
  it('Should login with basic user', () => {
    login('azdzad', 'azdazd', false);
    cy.get('[data-cy=create-button]').should('not.exist');
  });
  it('Should login with admin user', () => {
    login('azdzad', 'azdazd', true);
    cy.get('[data-cy=create-button]').should('exist');
  });
});
