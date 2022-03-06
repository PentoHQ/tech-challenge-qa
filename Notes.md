# Notes

## Contents

- [Overview](#overview)
- [Bug reports](#bug-reports)
- [Test strategy](#test-strategy-for-features-a-and-b)
- [Automation code](#automation-code)



## Overview

Due to time constraints I was unable to complete/enhance certain aspects of the submission that I would like to. Below is further notes on this topic:

1. Video recordings/screenshots for all bugs
2. Cypress and Karate. I love both frameworks equally, however using Karate was quicker to set up and write, i also noticed previous
   submissions of this challenge are in Cypress so thought an alternative is nice to see!
3. Load testing - this is fairly easy to achieve with Karate especially, again having done this in 4 ~ hours i was tight on time. 
4. I have included a basic Github Actions workflow, i love this CI tool and would enhance this with further actions and trigger events based on PR raising etc
5. I would have loved to include Cypress like attributes to the front end code making the locator's more sturdy than they are now.
6. The [Locators.json](https://github.com/harv-singh/pento-qa-challenge/blob/master/src/test/java/locators.json) file in the automation repo would be extracted out to a shared library meaning we only need to change locators once and multiple other test projects can pull from it seamlessly.


# Bug reports

------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**Bug 001** Freelance user is shown an error upon saving a session(P1).

***Steps to reproduce***:
1. Input a name i.e Harveer 
2. Click the Start button and let it run for 5 sec's
3. Click stop button
4. Now Click the save button
5. Click Okay on the alert pop up 

***Issue***: The user is shown the following error upon saving: ``Uncaught TypeError: Cannot read properties of undefined (reading 'then')``
Note the session is saved if you then navigate to View saved sessions.

***Expected result***: User is able to save the record without receiving this error.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Bug 002** Memory leak error upon starting timer and navigating to View saved sessions.

***Steps to reproduce***:
1. Input a name i.e Harveer 
2. Click the Start Button and let it run for 5 sec's
3. Click on the View saved sessions button

***Issue***: User is navigated to the page, but in the console the following error is displayed: ``Warning: Can't perform a React state update on an unmounted 
component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
``
Further to this, when the user navigates back to the previous page, the session time has stopped meaning it has not been saved.

***Expected result***: User is able navigate across pages whilst the timer is running with no memory leaks as a side affect. 


------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Bug 003** Freelance user is able save a session with special characters and or just spaces. 

***Steps to reproduce***:
1. Input either space characters or £$@
2. Click the start call to action and let it run for 5 sec's
3. Click Stop button
4. Now Click the Save button
5. Finally dismiss alert and ignore error(BUG 001) and navigate to View saved sessions 


***Issue***: Record is saved with the titles including Space characters or Special characters

***Expected result***: Form validation should be done for space characters(i.e empty). We should also restrict use of some special characters
but being mindful that some people do have different char's in there names i.e Yeu-Ling or ånders.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Bug 004** Saved sessions do not show in order of latest time on View saved sessions page.

***Steps to reproduce***:
1. Input a name i.e Harveer 
2. Click the start call to action and let it run for 5 sec's
3. Click Stop button
4. Now Click the Save button
5. Finally dismiss alert and ignore error(BUG 001) and navigate to View saved sessions 
6. Do steps 1-5 again with a different name
7. Navigate to Saved sessions page

***Issue***: Multiple sessions are displayed however they are not ordered from the latest saved onwards which would be fairly standard

***Expected result***: Sessions are displayed in some ordering usually being the latest first. 



------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Test strategy for Features A and B

The below will list Acceptance criteria(AC) based of feature description, test cases(TC) based of Acceptance criteria and questions for probing the development team.
The goal is to provide a voice for edge cases and quality. I have also added a small section for automation with some assumptions. 

`Feature A: We want to allow users to edit and delete existing sessions. Regarding the editing functionality they should be able to change an existing session name and duration.`

**AC1**: Freelance user is able to edit sessions

    **TC1**: Freelance User can edit an existing session name.
    **TC2**: Freelance User can edit an existing session duration. 
    
**Question**: Can you bulk edit multiple sessions?

**Automation**: API tests for PUT update operations on name & duration. 
                Check for 200 response, 400 bad requests and 401 unauthorised.
                UI Automation for checking editting these fields, use API to get the account in the right state initially.
       
**AC2**: Freelance user is able to delete sessions

    **TC1**: Freelance User can delete an existing session
    **TC2**: Freelance User cannot delete a session that has not began
    
**Question**: Can you delete bulk delete sessions?

**Automation**: API tests for DELETE operation
                Check for 200 response, 400 bad requests and 401 unauthorised.
                UI automation for checking user can delete, use API to get the account in the right state initally. 

`Feature B: We want to allow users to search for sessions in the list. They should be able to search by name or duration.`

**AC1**: Freelance user is able to search for sessions in list by name and duration
    
    **TC1**: Freelance user can search by key word name and is returned a list of all names matching
    **TC2**: Freelance user can search by keyword duration and is returned a list of all durations matching 
    **TC3**: Freelance user can enter something invalid i.e &£*@ll and is returned a handled error of no matching results
    **TC4**: Freelance user cannot search by name and duration and is returned a handled error of no matching results
    
**Question**: Assuming no chained operations here as TC4 states?

**Question**: Do we have pagination on the list returned?

**Question**: How do we handle non matched searches?

**Question**: Is duration listed in ms/seconds/minutes?
        
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Automation code

[Automation Code ](https://github.com/harv-singh/pento-qa-challenge)

1. Regarding non functional tests - I would use karate-gatling to combine load testing utilising the same feature file set up. The main endpoint POSTing for creation of sessions would be the first candidate ensuring we can create users and receive a 200 response within a certain responseTime threshold. 

2. We could extend the above test further by running UI tests whilst hammering the API endpoint to ensure the front end can cope. 


------------------------------------------------------------------------------------------------------------------------------------------------------------------------

