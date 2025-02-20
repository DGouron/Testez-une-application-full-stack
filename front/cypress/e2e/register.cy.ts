describe('register spec', () => {
  it('couldnt click on the submit button if all mandatories values are not provided', () => {
    cy.visit('/register')
    cy.get('input[formControlName=email]').type("yo")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
    cy.url().should('include', '/register')	
  })

  it('should call authService and navigate on successful registration', () => {
    cy.visit('/register')
    cy.intercept('POST', '/api/auth/register', {
      body: {
        id: 1,
      },

    })
    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=firstName]').type("Yoga")
    cy.get('input[formControlName=lastName]').type("Master")
    cy.get('input[formControlName=password]').type("test!1234")
    

    cy.get('button[type="submit"]').should('not.be.disabled').click();
    cy.url().should('include', '/login')
  })
  
  it('Should disable submit button if required fields are not filled', () => {
    cy.visit('/register')
    cy.get('button[type=submit]').should('be.disabled')
  })

  it('Should redirect to login page after successful registration', () => {
    cy.visit('/register')

    cy.intercept('POST', '/api/auth/register', {
      statusCode: 200,
      body: {}
    })

    cy.get('input[formControlName=email]').type("newuser@studio.com")
    cy.get('input[formControlName=password]').type("test!1234")
    cy.get('input[formControlName=firstName]').type("New")
    cy.get('input[formControlName=lastName]').type("User")
    cy.get('button[type=submit]').click()

    cy.url().should('include', '/login')
  })
})