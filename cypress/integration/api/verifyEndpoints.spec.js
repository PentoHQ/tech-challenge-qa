/// <reference types="cypress" />

// Tests to be run on a separate environemnt to the API Tests initially TO-DO:  Clear data between runs
describe('Verify the GET API Endpoint', () => {
    it('Test GET Request: Verify the response returns correct status code and in a timely manner', () => {
        cy.request('http://localhost:3001/api/sessions')
                 .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.duration).to.be.lessThan(200)
            })
    });
    
    it('Test POST Request creates a new record and returns correct status code and in a timely manner ', () => {
        cy.createUserViaApi()
    });
})
