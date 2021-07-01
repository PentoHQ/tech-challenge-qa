import { locators, pageRoutes, APP_TITLE, APP_DESCRIPTION, VIEW_SAVED_SESSIONS, CREATE_NEW_SESSION } from '../support/constants'

export const navigateToPage = (pagePath: string) => cy.visit(pagePath) 

export const openHomePage = () => navigateToPage(pageRoutes.HOME_PAGE)

export const openSessionsPage = ()  => navigateToPage(pageRoutes.SESSIONS_PAGE)

export const assertAppIsLoaded = () => {
    cy.get(locators.APP_CONTAINER).should('be.visible')
    cy.get(locators.APP_HEADER).should('be.visible').and('have.text', APP_TITLE)
    cy.get(locators.APP_DESCRIPTION).should('be.visible').and('have.text', APP_DESCRIPTION)
}

export const assertNavigationBtnRedirectsToSavedSessions = () => cy.get(locators.NAVIGATION_BUTTON).should('have.text', VIEW_SAVED_SESSIONS).and('have.attr', 'href', pageRoutes.SESSIONS_PAGE)

export const assertNavigationBtnRedirectsToNewSession = () => cy.get(locators.NAVIGATION_BUTTON).should('have.text', CREATE_NEW_SESSION).and('have.attr', 'href', pageRoutes.HOME_PAGE)

export const clickNavigationBtn = () => cy.get(locators.NAVIGATION_BUTTON).click()

export const assertCurrentPageToBe = (pageRoute: string) => cy.url().should('contain', pageRoute)

export const expectPageNotFoundError = () => cy.contains('Page not found').should('be.visible')

export const startTimer = () => cy.get(locators.START_TIMER_BUTTON).click()

export const stopTimer = () => cy.get(locators.STOP_TIMER_BUTTON).click()

export const resetTimer = () => cy.get(locators.RESET_TIMER_BUTTON).click()

export const assertSaveButtonDisabled = () => cy.get(locators.SAVE_SESSION_BUTTON).should('be.disabled')

export const assertSaveButtonEnabled = () => cy.get(locators.SAVE_SESSION_BUTTON).should('be.enabled')

export const saveSession = () => {
    cy.intercept('POST', pageRoutes.SESSIONS_ENDPOINT).as('saveSession')
    cy.intercept('GET', pageRoutes.SESSIONS_ENDPOINT).as('getSessions')

    cy.get(locators.SAVE_SESSION_BUTTON).click().wait('@saveSession').then(xhr => {
        expect(xhr.response.statusCode).to.eq(200)
    })

    cy.on('window:alert', (str) => {
        expect(str).to.contain('Your session has been saved!')
    })

    cy.wait('@getSessions').then(xhr => {
        expect(xhr.response.statusCode).to.eq(200)
    })
}

export const fillSessionName = (sessionName: string) => cy.get(locators.SESSSION_NAME_INPUT).type(sessionName)

export const waitXMiliseconds = (miliseconds: number) => cy.wait(miliseconds)

type ElapsedTime = {
    hours: string,
    minutes: string,
    seconds: string
}

export const assertElapsedTimeToBe = (elapsedTime: ElapsedTime) => cy.get(locators.ELAPSED_TIME).should('have.text', `${elapsedTime.hours}:${elapsedTime.minutes}:${elapsedTime.seconds}`)

export const assertElapsedTimeNotBeZero = () => cy.get(locators.ELAPSED_TIME).should('not.have.text', '00:00:00')

export const assertSavedSessonIsListed = (sessionName: string) => cy.contains(locators.SAVED_SESSION, sessionName).should('be.visible')