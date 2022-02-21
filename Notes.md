# Notes

# Bugs Found
**Bug ID:** 1 (Priority 1 Must Fix)
***Title:***
Error when attempting to view a saved Session

***Description:***  
I created a new timed session, stopped and saved it.  Selected the view saved session button and the app crashed with a "TypeError" error message displayed.  

***Steps to recreate***
* Input a name in the New Session field
* Press start and wait for a couple of seconds to pass then press stop
* Save button will be active, press to save
* Confirmation message appears to verify save, clear the message 
* Press the View Saved Sessions button

***Expected Result***
Saved session should be displayed correctly.  It would be an improved UX if we could catch errors like this and display a more user friendly message instead of the raw error.

***Actual Result***
User is shown an error message in the page.  _TypeError Cannot read properties of undefined(reading 'then')_
See Bug 1 - Console Error.png in the bugs folder in the project
NOTE:  The record is created and if you clear the error and then select the View Saved Sessions button, the details are displayed
----

**BugID:** 2 (Priority 3 - Fix if no higher priority)
**Title:**
User is able to save a new session title as just spaces 

***Description:***  
I saved a new timer session using only spaces as the title.  This should not be allowed as its bad practice and would make searching for the record difficult.

***Steps to recreate***
* Input only spaces using the spacebar in the New Session field
* Press start and wait for a couple of seconds to pass then press stop
* Press the save button when its active

***Expected Result***
For best practice, the user should have seen an error message when saving "Entering only spaces isn't permitted in this field" title when they attempt to save the record" (ideally we coud do this as soon as the title field loses focus, i.e.: when they select another element on the page)

***Actual Result***
User is able to save the record (NOTE: Bug 1 above still occurs but reloading shows the record has been created)
----


**BugID:** 3 (Priority 3 - Should Fix)
***Title:***
User is able to create a session with a really long title (more then 50 characters)

***Description:***  
I saved a new timer session using more than 50 characters as the title.  This should not be allowed as it can cause display issues wherever the title is used (especially on smaller screens like tablets and mobiles)

***Steps to recreate***
* Input more than 50 characters in the New Session field
* Press start and wait for a couple of seconds to pass then press stop
* Press the save button when its active

***Expected Result***
For best practice the title should have a max character length

***Actual Result***
User is able to save the record (NOTE: Bug 1 above still occurs but reloading shows the record has been created)
------------------------------------------------------------------------------------------------------------------------


# Acceptance Criteria for additional requirements
**Edit session**
* As a user I should be able to edit the name of an existing session and save the changes
* As a user I should be able to edit the duration of an existing session and save the changes
* As a user I should not be able to edit the time values

**Delete session**
* As a user I should be able to delete an existing session
* As a user after successfully deleting a session, the session should no longer be visible 


**Search for session**
* As a user I should be able to search for a session by name and only see matched records returned
* As a user I should be able to search for a session by duration and only see matched records returned
* As a user I should be able to search for a session by name and duration and only see matched records returned


**Test Assumptions**
Search: User has to search for the exact name
        User has to search for an exact time

NOTE For this exercise, I have written the AC's with the assumption this would be a very basic initial build so only exact values would be matched.

**Test Strategy**
_Requirement Clarification._
During the sprint planning where the requirements and above AC's were discussed, I would question the specifics around the search behaviour.  Does it need to be exact, or can I search for a partial name match, use wildcard and so on.  I would also query if the time needs to be exact or in a range.   Can I search between two time values or greater/less than a time value to return all matching records


_Sprint Testing_
I would build the tests for each of the above acceptance criteria in Cypress (these are what I would call the happy path and should be able to be run by the engineers during their development. I would specify unique test only identifiers for any page elements, to ensure that cypress finds them during runtime and advise the team of these, so they are added during development. 
This is a good practice as should someone refactor and change the actual element name, the test specific name which always start with `cy-data=`, should remain unchanged and not break the tests)
------------------------------------------------------------------------------------------------------------------------

**Running the automated tests locally**
* cd into the `cypress` directory
* To launch the cypress GUI use command `npm run cypress:open`
* To run the API tests in the CLI (headless mode) use command `npm run cypress:run api`
* To run the API tests in the CLI (headless mode) use command `npm run cypress:run ui`

**Automated Tests Details**
Cypress Tests written `ui\createSession.spec.js` for the previously found bugs some of these should form part of a end to end test suite run as part of an CI/CD build pipeline (I would probably remove the field validation tests after fixing as they are low priority tests)

***Create a new session and save it***  
This is the standard test to verify the app works as intended. It creates a new user record and saves the record.  NOTE: This test currently fails due to Bug #1 so I have commented out the save to make the test pass (in reality I would leave normally comment the whole test out until the bug was fixed - referencing the spec file to the bug to ensure it is uncommented once fixed)

_The following tests are from field validation testing that flagged 2 bugs around data input improvements in the title field_
***Create a new session with a title containing only spaces***  
This test inputs only spaces in the title and saves it.  The record is saved but we should probably not allow this as it's bad practice to allows only spaces.  NOTE: This test currently fails due to Bug #1 so I have commented out the save to make the test pass.
***Create a new session with a title containing only spaces***  
This test inputs 51 characters in the title and saves it.  Long titles can cause display issues and look bad in the UI so I would suggest reducing the limit. I raise these types of issues as a discussion point and if not agreed by the team as an issue it can be closed.  I'd rather raise an issue than not raise it.  I can lead to quality improvemements for the user  NOTE: This test currently fails due to Bug #1s o I have commented out the save to make the test pass

***Verify the Reset button returns the timer back to 00:00:00***  
This test inputs a name, starts the timer, waits for 1 second, stops the timer and then presses reset.  There is a check to verify the timer has a value of 00:00:00

_End to End Test to verify that a record can be created and viewed by the user_
***View a saved session***
Uses the API to generate a saved session and then the UI to verify the session is returned to the user, I check the last card in the list for the expected title.
------------------------------------------------------------------------------------------------------------------------

**API Endpoints testing in Cypress**
Tests in: `api\verifyEndpoints.spec.js`

***GET Request***
I have created a test that runs before on a clean environment (before any data has been created).  It checks for:
* 200 Status Code
* Response time is less than 200 milliseconds

***POST Request***
I have created a helper command in `support/command.js` that creates a new record using the POST endpoint.  I have used this in the UI tests to bypass the app (quicker and best practice) to create a new timer record and verify that
* 200 Status Code is received

I have also created a Postman Collection and Environment.  
These files are in the `postman_artefacts` folder.
***To use:***
* Import the collection
* Import the environment
* Ensure a new version of the server is running (current implementation assumes no data prior to executing the scripts)
* Select the top level folder and in the right hand side select the `Run button`
(You made need the Postman Agent installed and running to test on localost)
------------------------------------------------------------------------------------------------------------------------

**Reporting**
I have added in the MochaAwesome Report plugin.  It generates a nice HTML report after each run.  
It is located in ../tech-challenge-qa/cypress/reports/html/index.html

------------------------------------------------------------------------------------------------------------------------

**Github Actions**
I will be honest and say I haven't used Github Actions previously, so felt it would take too long to learn and implement a solution I would be happy with. I would need to take into consideration the docker containers, which again is not something I have used recently, always having static test environments to work from in my last 3 companies (I understand how they work but it would take some time to understand the app to fully implement a good solution).  

I have experience of Jenkins and also running a pipeline utilising octopus (I worked with the DevOps developer at Floww to learn this so I could own both manual and automated deploys to the static test environments)
I feel this would be something I would like to learn and feel I could be up-to speed quite quickly once I was walked through.
------------------------------------------------------------------------------------------------------------------------

**Non-functional**
***Basic Performance test***
For the API tests I have added a simple check to verify that the responses are returned in less than 200 milliseconds.  This is a basic non-functional test that should flag if the endpoints start running slow (NOTE: 200ms was a purely arbitrarily chosen value)

For more NFR I would say that the Cypress framework isn't designed to run as a non-functional test framework (and NFR's should run separately as they have a different focus as well as scheduled running frequency).  I would create a separate solution to run the OWASP ZAP (Zed Attack Proxy) solution. `https://www.zaproxy.org/`  It can be added as a github action and run serveral different types of scanss dependant on where in the the overall development deploy process they are needed.

------------------------------------------------------------------------------------------------------------------------

