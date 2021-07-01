export const locators = {
    APP_CONTAINER: '[data-cy="AppContainer"]',
    APP_HEADER: '[data-cy="AppHeader"]',
    APP_DESCRIPTION: '[data-cy="AppDescription"]',
    NAVIGATION_BUTTON: '[data-cy="NavButton"]',
    SESSSION_NAME_INPUT: '[name="name"]',
    SAVE_SESSION_BUTTON: '[data-cy="SaveSessionButton"]',
    START_TIMER_BUTTON: '[data-cy="StartTimerButton"]',
    STOP_TIMER_BUTTON: '[data-cy="StopTimerButton"]',
    RESET_TIMER_BUTTON: '[data-cy="ResetTimerButton"]',
    ELAPSED_TIME: '[data-cy="ElapsedTime"]',
    SAVED_SESSION: '[data-cy="SavedSessionCard"]'
}

export const pageRoutes = {
    HOME_PAGE: '/',
    SESSIONS_PAGE: '/sessions',
    NOT_FOUND_PAGE: '/foo',
    SESSIONS_ENDPOINT: '/api/sessions'
}

export const APP_TITLE = 'Time Tracking Application'
export const APP_DESCRIPTION = 'This is a simple application to allow freelancers to track their time.'
export const VIEW_SAVED_SESSIONS = 'View Saved Sessions'
export const CREATE_NEW_SESSION = 'Create New Session'