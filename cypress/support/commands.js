import { elementLocators, pageText, pageURL } from './testLocators'

// Add a title.  allow user to enter valid and invalid data
Cypress.Commands.add('enterTitle', (title) => {
    cy.get(elementLocators.SESSSION_NAME).type(title)
})

// Create a new records, allow user tod define a custom time in milliseconds
Cypress.Commands.add('createNewTimerRecord', (timeInMs) => {
    cy.get(elementLocators.START_TIMER).click()
    cy.wait(timeInMs)
    cy.get(elementLocators.STOP_TIMER).click()
})

//Reset the timer
Cypress.Commands.add('resetTimerValues', () => {
    cy.get(elementLocators.RESET_TIMER).click()
    cy.get(elementLocators.TIMER_VALUE).should('have.text', '00:00:00')
})

// Save the record and deal with the pop-up message
Cypress.Commands.add('save', () => {
    cy.get(elementLocators.SAVE).click()
})

// Create a new record via the API
// TODO - Refactor to make name unique. 
Cypress.Commands.add('createUserViaApi', () => {
    cy.request('POST', 'http://localhost:3001/api/sessions', 
        { 
            time: 10000,
            name: 'TestUser',
            createdAt: Date.now()
        }).then(
    (response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(200)
        }
    )
})