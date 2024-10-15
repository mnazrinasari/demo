Feature: Login

  Scenario: Login as a valid user
    Given User on lagin page enters a valid username and password
    When User click the login button
    Then User is logged in

  Scenario: Login as a locked user
    Given User on login page enters a locked username and password
    When User click the login button
    Then User recieve error message

