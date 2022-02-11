/// <reference types="cypress" />

import * as pageActions from '../page-actions/actions'
import { pageRoutes } from '../support/constants'

describe('Page loading and navigation', () => {
    it('Lands in the home page and sees the new session counter', () => {
        pageActions.openHomePage()
        pageActions.assertAppIsLoaded()
    });

    it('Lands in the sessions page and sees the saved sessions list', () => {
        pageActions.openSessionsPage()
        pageActions.assertAppIsLoaded()
    });

    it('Navigates to non-existent route and sees the page not found error', () => {
        // This one fail because of bug #4 descibred in the notes
        pageActions.navigateToPage(pageRoutes.NOT_FOUND_PAGE)
        pageActions.assertAppIsLoaded()
        pageActions.expectPageNotFoundError()
    });

    it('Lands in the home page and navigates to the sessions page through the UI and back to the home page', () => {
        pageActions.openHomePage()
        pageActions.assertAppIsLoaded()
        pageActions.assertNavigationBtnRedirectsToSavedSessions()
        pageActions.clickNavigationBtn()
        pageActions.assertCurrentPageToBe(pageRoutes.SESSIONS_PAGE)
        pageActions.assertNavigationBtnRedirectsToNewSession()
        pageActions.clickNavigationBtn()
        pageActions.assertCurrentPageToBe(pageRoutes.HOME_PAGE)
        pageActions.assertNavigationBtnRedirectsToSavedSessions()
    });
});