/// <reference types="cypress" />

import * as pageActions from '../page-actions/actions'

const sessionNameWithCurrentTimestamp = `Sesion-${Date.now()}`

describe('On creating new time tracking session...', () => {
    beforeEach(() => {
        pageActions.openHomePage()
    });

    it('successfully starts, stops and resets the time counter', () => {
        pageActions.startTimer()
        pageActions.waitXMiliseconds(2000)
        pageActions.stopTimer()
        pageActions.assertElapsedTimeToBe({hours: '00', minutes: '00', seconds: '02'})
        pageActions.resetTimer()
        pageActions.assertElapsedTimeToBe({hours: '00', minutes: '00', seconds: '00'})
    });

    
    it('Unable to save if timer has not been started', () => {
        pageActions.assertElapsedTimeToBe({hours: '00', minutes: '00', seconds: '00'})
        pageActions.assertSaveButtonDisabled()
    });
    
    it('Unable to save if timer has been started but not stopped', () => {
        pageActions.startTimer()
        pageActions.fillSessionName(sessionNameWithCurrentTimestamp)
        pageActions.assertSaveButtonDisabled()
    });
    
    it('Unable to save if sesssion title is empty string', () => {
        pageActions.startTimer()
        pageActions.waitXMiliseconds(1000)
        pageActions.stopTimer()
        pageActions.assertSaveButtonDisabled()
    });
    
    it('Unable to save if session title is string made only of spaces', () => {
        // This will fail due to bug #3
        pageActions.startTimer()
        pageActions.waitXMiliseconds(1000)
        pageActions.stopTimer()
        pageActions.fillSessionName('   ')
        pageActions.assertSaveButtonDisabled()
    });
    
    it('Should keep running on the background when user navigates away from time tracking session in progress', () => {
        // This will fail due to bug #2
        pageActions.startTimer()
        pageActions.waitXMiliseconds(1000)
        pageActions.clickNavigationBtn()
        pageActions.clickNavigationBtn()
        pageActions.assertElapsedTimeNotBeZero()
    });

    it('Saves a session successfully', () => {
        // This will fail due to bug #1
        pageActions.startTimer()
        pageActions.waitXMiliseconds(1000)
        pageActions.stopTimer()
        pageActions.fillSessionName(sessionNameWithCurrentTimestamp)
        pageActions.assertSaveButtonEnabled()
        pageActions.saveSession()
        // The application will crash here Ii have changed cypress config so that it will not fail the test in case of application error
        //  I then reload the page and assert the session that has been saved is visible 
        pageActions.openSessionsPage()
        pageActions.assertSavedSessonIsListed(sessionNameWithCurrentTimestamp)
    });
});