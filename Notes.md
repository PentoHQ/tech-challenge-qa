# Notes

After installing all dependencies and running the docker containers, I have accessed the application and perfomed some exploratory testing. My findings will be listed below. 

# Findings from the manual test session

I found 4 major bugs in the application and I left a few suggestions for enhanced UX. All of them I describe below.

## Bugs found

In this section I will list and describe the main bugs I have encountered. 

### 1. App crashes on saving session

**Short description**

When submitting a time session, I see a prompt, when I close the prompt message, the app crashes with a tyype error.

**Expected behavior**

The time session should be saved without the app crashing.

**Actual behavior**

The app crashes but the time session is saved successfully. Upon reloading the app, we could see the session listed in the saved sessions page

**Steps to reproduce**

1. Start the app
2. Start the timer (click the start button)
3. Let some time pass 
4. Stop the timer (click the stop button)
5. Fill in session title
6. Click the save button
7. Dismiss the alert prompt
8. App crashes

**Screenshots/Videos**

Screenshot can be seen [here](https://prnt.sc/17lzeoy)

**Error logs/trace**

```
TypeError: Cannot read property 'then' of undefined
TimerForm.submit
src/components/TimerForm/timerform.js:21
  18 |   {},
  19 |   { time: this.state.time, name: this.state.name }
  20 | )
> 21 | this.props.onSubmit(newValues).then(() =>
     | ^  22 |   this.setState({
  23 |     isOn: false,
  24 |     time: 0,
```

### 2. Switching to saved sessions page when timer is running, the current session is lost and a memory leak warning is thrown

**Short description**

When I start the timer clock and I click the button to View Saved Sessions, I am redirected to the sessions page, but there is a memory leak warning being thrown in the browser console and switching back to the new session page shows the counter in the default 00:00:00 time, which means that the unsaved session was lost.

**Expected behavior**

It should not throw error in console. It should either throw a warning prompt that the current sessioon will be lost or it should keep running the timer on the background and give the user an option to return to the current session view.

**Actual behavior**

The user gets redirected to the saved sessions page, all progress in the current session is lost, and a warning is thrown in the console.

**Steps to reproduce**

1. Start the app with the devTools open
2. Start the timer (click the start button)
3. Click the 'View Saved Sessions' button
4. Get redirected to the sessons page
5. See memory leak warning thrown in the console
6. Click 'Create new session' button
7. Get redirected to the session page with the counter being reset to 00:00:00 

**Screenshots/Videos**

Video [here](https://www.loom.com/share/428fe7ec2a8242a1bc08167a59ea6bab)

**Error logs/trace**

```
index.js:1437 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    in TimerForm (at NewSession.js:36)
    in div (at PageContainer.js:20)
    in div (at PageContainer.js:16)
    in div (at PageContainer.js:9)
    in div (at PageContainer.js:8)
    in div (at PageContainer.js:7)
    in div (at PageContainer.js:6)
    in PageContainer (created by Context.Consumer)
    in Connect(PageContainer) (at NewSession.js:35)
    in NewSession (created by Context.Consumer)
    in Connect(NewSession) (created by Context.Consumer)
```

### 3. It's possible to save sessions with empty names

**Short description**

When saving a trying to save a session, the button only becomes enabled when the timer is topped at a time other than 00:00:00 and the session title is not an empty string. However it is possible to bypass this rule by filling in space characters.

**Expected behavior**

The session title validatio should apply the trim method to make sure there is, at least, one character. I shouldn't be possible to enable the save button with a string made out of space characters.

**Actual behavior**

If I fill in just some space characters and no letters or numbers or special characters, then the session is stored and it appears listed in the saved sessions page without a name. 

**Steps to reproduce**

1. Start the app
2. Start the timer (click the start button)
3. Let some time pass 
4. Stop the timer (click the stop button)
5. Fill in session title with just spaces
6. Click the save button
7. Dimiss the prompt, there will be an app crashing error which was already addressed above
8. Reload the app 
9. Open the saved sessions page 
10. See the session listed with no visible title

**Screenshots/Videos**

Screenshot can be seen [here](https://prnt.sc/17m3ozf)

**Error logs/trace**

N/A

### 4. Invalid routes show blank page and there seems to be no 404 info

**Short description**

if I try to navigate to an invalid route within the app, all I see is a blank page and there is no option to go back other than using the back button in the browser or loading the app manually in one of the correct routes ('/' and '/sessions').

**Expected behavior**

This is a 404 situation where the page is not found. I should see a 404 page with an option to go back to the app (either to the sessions page or the new session page)

**Actual behavior**

I see a blank page and no 404 error is thrown in console nor is it visible in the network tab.

**Steps to reproduce**

1. Start the app with the devTools open
2. Navigate to an invalid route (for example `http://localhost:3000/foo`)
3. See a blank page

**Screenshots/Videos**

Vide [here](https://www.loom.com/share/f2c3dd89e6084ced872b3fbb385b8fb7)

**Error logs/trace**

N/A

---

## Suggestions

* The 'Save' session button has a very similar colour when disable and enabled. I beliee it could be better to have it greyed out (as in with some light gray colour) when this button is disabled. At first, i did not even understand this button was disabled as I was trying to click it. Took me a while to understand it was disabled. After this button was enabled, i saw it had a darker shade oof blue. This isn't necessarily a bug, more like a UX improvement.

* When the clock is running and I click it, the number on the clock seems to jump a bit, yet the clock keeps on running (see the video [here](https://www.loom.com/share/ac8f057a4ec34c7faf3b22f60045a14f) of the behavior). I think it would be better to either have this button disabled/hidden when running or to have some tooltip message warning the user that the time canot be reset while the clock is running (clock must be stopped n order to be able to reset the timer). I would say the same goes when the timer clock is at 00:00:00. We can click the reset button but nothing happens. Again, this may not be a bug, but it's rather a UX improvement.

* I would either disable or hide the stop button or even to merge it with the start button making it a 'start/stop' button. Because if the timer clock is running, then the only button we want to click is the 'stop' button, not the 'start' button. And when the timer clock is stopped or at 00:00:00 then the stop button becomes irrelevant as well. 

## Videos / Screenshots

I created the screen capture videos using a tool called [loom](https://www.loom.com/). I have shred such videos by generating a shareable link where you can watch those.

Screenshots were taken using [lightshot](https://app.prntscr.com/en/index.html) and shared using a link, in a similar manner as the videos.

# New features

## Feature 1 Editing and deleting existing sessions

### User story

> We want to allow users to edit and delete existing sessions. Regarding the editing functionality they should be able to change an existing session name and duration.

### Acceptance criteria

*Given* I have existing sessions *When* I edit the name and/or duration of an existing session *Then* the session that has been edited should be visible in the list of saved sessions *And* it should show the updated details (name and/or duration)

*Given* I have existing sessions *When* I delete an existing session *Then* the session that has been deleted should no longer be visible in the list of saved sessions

### Questions regarding the feature implementation 

These questions have special relevance for the work of developers but also for the work of QA because, the implementation of this feature will influence the testing scenarios, more specifically, the steps of each test case

1. How do I select one specific session to edit?
2. How do I enter the *"edit mode"*? Is there a button next to each filed (ttle and duration) that can render a form field where can fill in the updated value? Or is it some editable text-area? (Like slate, for example, where you can focus on a test area and you enter edt mode)
3. What knd of validation will there be? How do we validate that the title cannot be modified into an empty string or a string made of only space characters? How do we validate that the duration is not edited nto a non-numeric or negative value? (in this case we could put a numeric field which accepts only positive numbers)
4. How would we process the updating of a sessons details? Would we send a PUT request to the backend and then re-render the whole list with the updated values from the backend? Would we update the front-end state while sending the update to the backend which would then process the modification asynchronously through background jobs and then on page load it would update the state with data from backend via webhooks (such as push notifications)? 
5. The same question applies for deletion of sessions. How would we ensure that frontend and backend would be in sync so that we would not try to delete a session that has already been eliminated? Would we rerender the whole list when deleting a session? Or would we just remove the item from the component and process it asynchronously on the backend?
6. Will there be an option for bulk deletio of sessions?
7. Will there be an option for deletiing all existing sessions? (Like clearing all session history) This could be particularly interesting for testing purposes as we might want to have a clean session history at the beginning of each test run, be it manual or automated
8. This is not necessarily related to this feature. But what if we have a big number of sessions in the saved session history? Shall we render all those sessions? Or shall we render just a few of them and implement some paginaton and/or lazy loading?

### Test cases for the feature functionality

| Pre-requisites | Steps / Actions | Input | Expected behavior |
| --- | --- | --- | ---| 
| User is on sessions page and there are no sessions | N/A | N/A | User should not have the option to edit and/or delete any session | 
| User is on sessions page and there is at least one existing session | User edits the session title | A non empty string | The session should show the updated title |
| User is on sessions page and there is at least one existing session | User edits the session title | An empty string  | The session title should not be updated |
| User is on sessions page and there is at least one existing session | User edits the session title | A string made only of space characters  | The session title should not be updated |
| User is on sessions page and there is at least one existing session | User edits the session duration | A positive numeric value | The session should show the updated title duration |
| User is on sessions page and there is at least one existing session | User edits the session duration | A non-numeric value | The session duration should not be updated |
| User is on sessions page and there is at least one existing session | User edits the session duration | A negative numeric value | The session duration should not be updated |
| User is on sessions page and there is at least one existing session | User edits the session title and duration | A non empty string for the title and a positive numeric value for duration | The session should show the updated title and duration |
| User is on sessions page and there is at least one existing session | User edits the session title and duration | A non empty string for the title and a positive numeric value for duration | The session should show the updated title and duration |
| User is on sessions page and there is at least one existing session | User edits the session title and duration | An empty string for the title and a positive numeric value for duration | The session should show the updated duration but not updated title |
| User is on sessions page and there is at least one existing session | User edits the session title and duration | A string with only spaces for the title and a positive numeric value for duration | The session should show the updated duration but not updated title |
| User is on sessions page and there is at least one existing session | User edits the session title and duration | A non empty string for the title and a non-numeric value for duration | The session should show the updated title but not updated duration |
| User is on sessions page and there is at least one existing session | User edits the session title and duration | A non empty string for the title and a negative numeric value for duration | The session should show the updated title but not updated duration |
| User is on sessions page and there is at least one existing session | User edits the session title and duration | An empty string for the title and a non-numeric value for duration | The session should not show neither the updated title nor updated duration |
| User is on sessions page and there is at least one existing session | User edits the session title and duration | A string with only spaces for the title and a non-numeric value for duration | The session should not show neither the updated title nor updated duration |
| User is on sessions page and there is at least one existing session | User edits the session title and duration | An empty string for the title and a negative numeric value for duration | The session should not show neither the updated title nor updated duration |
| User is on sessions page and there is at least one existing session | User edits the session title and duration | A string of only spaces for the title and a noegative numeric value for duration | The session should not show neither the updated title nor updated duration |
| User is on sessions page and there is one existing session | User deletes the existing session | N/A | The sessions list should be empty |
| User is on sessions page and there is more than one existing session | User deletes one existing session | N/A | The sessions list should be not be empty. it should show all the previously shown sessions except for the one which has been deleted |

## Feature 2 Searching for existing sessions

### User story

> We want to allow users to search for sessions in the list. They should be able to search by name or duration.

### Acceptance criteria

*Given* I have existing sessions *When* I search for the name of an existing session *Then* the list of sessions should be filtered down and only show the session(s) whose name matches the search term

*Given* I have existing sessions *When* I search for a specific session duration *Then* the list of sessions should be filtered down and only show the session(s) whose duration matches the search term

*Given* I have existing sessions *When* I search for a session name *And* There are no sessions whose name matches the search term *Then* the list of session should filter out all the existng sessions and return no results

*Given* I have existing sessions *When* I search for a session duration *And* There are no sessions whose duration matches the search term *Then* the list of session should filter out all the existng sessions and return no results

### Questions regarding the feature implementation 

Again, these are queston regarding the implementation, but also, to get a better understanding of expected behaviors. important for developers to know what exactly to implement, but also for QA to know what exactly to test and which specific behaviors and outputs to expect.

1. How do I search for name/duration? Will there be a search filed at the top of the list?
2. Will there be one filed foir both name and duration or two different search fields, one for name, the other for duration?
3. When no existing sessions match the given name/duration, should it show the empty list, or some sort of blankslate for *'no matches found'*?
4. Will there be some sort of button to clear search?
5. WIll the search return partial matches for name (and/or duration)or only exact matches?
6. What if more than one session match the search criiteria? Should the list show all the session that match the search?
7. Is it possble to match for specific name AND specific duration at the same time (more complex search)?
8. Wiill the search accept invalid strings/characters for name and duration? Or will there be some input field validation?

### Test cases for the feature functionality

| Pre-requisites | Steps / Actions | Input | Expected behavior |
| --- | --- | --- | ---| 
| User is on sessions page and there are no sessions | N/A | N/A | User should not be able to search for any session | 
| User is on sessions page and there are existing sessions sessions | User searches for session name | Name of one specific session | List should filter the session with matching name |
| User is on sessions page and there are existing sessions sessions | User searches for session name | Name of more than one session | List should filter all sessions with matching name |
| User is on sessions page and there are existing sessions sessions | User searches for session name | Name of session which doesn't exist | List should show no matching sessions (no matches) |
| User is on sessions page and there are existing sessions sessions | User searches for session duration | Duration of one specific session | List should filter the session with matching duration |
| User is on sessions page and there are existing sessions sessions | User searches for session duration | Duration of more than one session | List should filter all sessions with matching duration |
| User is on sessions page and there are existing sessions sessions | User searches for session duration | Duration of session which doesn't exist | List should show no matching sessions (no matches) |\

# Test coverage for the reported bugs

I have added automated tests for the basic use cases as well as for the cases which encountered the bugs mentioned above.
I have decided to use Cypress.io because it is the tool I am most acquainted with. It is simple to read and very well documented. 

## How I wrote the tests

I have decided to add some simple abstraction to the test code. Instead of making direct calls to the Cypress API in the spec files, i have decided to wrap it into functions. This way allows me to reuse code without havng to repeat it (DRY principle). I didn't use page objects,  rather used a  more functional approach which I decided to call *page actions*.

Note that some of the tests will fail due to the reported bugs. In ay case you should see that I have managed to cover the basic functionality of the application. Ths could easily be used as a smoke test suite. 

## Usage of TypeScript

I have decided to write my Cypress tests with TypeScrpt because it makes for a better dev experience, with cleaner code and type safe function calls.

## How to run the tests

The tests can be ran from wthin the `client` folder. 

1. Make sure the application is running (run `docker-compose up` from the root folder)
2. Go into the client folder (`cs client`)
3. To launch the cypress GUI use command `npm run cypress:open`
4. To run the tests in the CLI (headless mode) use command `npm run cypress:run`

---
---

# Ideas for what to implement next

Here I will list my personal opinion on what to do in order to improve and enhance this app. 

1. Migrate all the source code into TypeScript
2. Cover the back-end endpoints with unit tests
3. Create unit test coverage for the front-end code (such as component tests)
4. Create a CI/CD pipeline to run the tests and deploy to some live environment (e.g. heroku app or AWS)
5. Implement some visual snapshot testing (there are certain plugins which can integrate with Cypress)

After I complete the necessary steps in the Tchnical exercise I will try to implemernt some of the listed items above as an **Extra**. I will prioritize the CI/CD pipeline (I will use some simple heroku deployment as a proof of concept). i will also create a simple visual test for demonstrative purposes. As for unit tests and migrating the code, those tasks are a bit more complex, so I shall try them later if I have the time and energy. 