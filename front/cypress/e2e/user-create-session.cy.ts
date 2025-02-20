import { login } from "cypress/support/auth"

describe('User create session', () => {
  beforeEach(() => {
    login('user@example.com', 'password123', true)

    cy.intercept('GET', '/api/teacher', {
      body: [
        { id: '1', firstName: 'John', lastName: 'Doe' },
        { id: '2', firstName: 'Jane', lastName: 'Smith' }
      ]
    }).as('getTeachers')

    cy.get('[data-cy=create-button]').click()
    cy.url().should('include', '/sessions/create')
  })

  it('Should create a new session', () => {
    cy.intercept('POST', 'api/session', {
      statusCode: 201,
      body: {
        id: '3',
        name: 'New session',
        description: 'This is a new session',
        date: '2022-01-01',
        teacher_id: '1'
      }
    }).as('createSession')

    cy.intercept('GET', '/api/sessions', {
      body: [
        { id: '1', name: 'Session 1', description: 'Description 1', date: '2022-01-01', teacher_id: '1' },
        { id: '2', name: 'Session 2', description: 'Description 2', date: '2022-01-02', teacher_id: '2' },
        { id: '3', name: 'New session', description: 'This is a new session', date: '2022-01-01', teacher_id: '1' }
      ]
    }).as('getSessions')

    cy.get('mat-select[formControlName=teacher_id]').click()
    cy.get('mat-option').should('have.length', 2)
    cy.get('mat-option').first().click()

    cy.get('input[formControlName=name]').type('New session')
    cy.get('textarea[formControlName=description]').type('This is a new session')
    cy.get('input[formControlName=date]').type('2022-01-01')
    cy.get('[data-cy=save-session-button]').should('not.be.disabled').click()


    cy.wait('@createSession', { timeout: 500 }).then((interception) => {
      cy.log('createSession intercepted', interception)
    })

    cy.url().should('include', '/sessions')    
  })

  it('Should disable submit button if required fields are missing', () => {
    cy.get('input[formControlName=name]').type('New session')
    cy.get('[data-cy=save-session-button]').should('be.disabled')
  })
})