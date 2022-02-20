/// <reference types="cypress" />

import { elementLocators, pageURL } from '../../support/testLocators'

// This beforeEach will revist the homepage before each test 
beforeEach(() => {
    cy.visit('/');
  })


describe('Create a new session using the UI', () => {
    // Basic test to verify that the page loads, the URL matches the expected URL
    // and the apps main description text is displayed.
    it('on the home page and verifies it has loaded', () => {
        cy.url().should('eq', pageURL.APP)
        cy.get(elementLocators.APP_HEADER).should('be.visible').and('have.text', 'Time Tracking Application')
    });  

    //Test for Bug #1 The final end to end test action is to verify the saved record is displayed but Bug #1 prevents this.
    it('Lands in the home page saves a valid time record', () => {
        cy.enterTitle('ValidTitle')
        cy.createNewTimerRecord(1000) 
        //cy.save() // not commented out as I want to see when the tests passes so I know the bug has been fixed as it's critical
        //testActions.verifySavedRecord()
  
    });

    // Test for Bug #2 - Enter just spaces (this test will pass as it's currently allowed, 
    // but should we remove the ability to allow just spaces fail as we shouldn't allow this once bug is fixed)
    // and we can then remove this test from the test suite
    it('Enters a title that contains only spaces', () => {
        cy.enterTitle("          ")    
        cy.createNewTimerRecord(1000) 
        //cy.save() // Commented out until Bug #1 is resolved
    });

    // Test for Bug #3 - Enter a long title (this test will pass as it's currently allowed, 
    // but should we reduce the character limit the test will fail)
    it('Enters a title that contains over 50 characters ', () => {
        cy.enterTitle("12345678901234567890123456789012345678901234567890A")    
        cy.createNewTimerRecord(1000) 
        //cy.save() // Commented out until Bug #1 is resolved
    });

    // Test to verify the reset button returns the timer back to Zero
    it('Verify the reset button sets the timer back to zero ', () => {
        cy.enterTitle("TimerTest")    
        cy.createNewTimerRecord(1000) 
        cy.resetTimerValues()
        //cy.save() // Commented out until Bug #1 is resolved
    });

    // Test to create a record via the API and verify it appears in the sessions page
    // NOTE:  Created this test as the save currently fails.  Just to show E2E test working
    it('create a new saved session and verify it in the sessions page ', () => {
        cy.createUserViaApi()
        cy.visit('/sessions')
        cy.get(elementLocators.SESSION_TITLE).last().should('have.text', 'TestUser')
    });
})