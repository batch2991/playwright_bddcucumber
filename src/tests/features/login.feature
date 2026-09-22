Feature: to test the login functionality

Scenario: To login with valid credentials
Given user is on login page
When enter valid userid and valid pwd and click login
Then user should be redirected to products page

Scenario Outline: To login with invalid credentials
Given user is on login page 
When enter invalid "<userid>" or invalid "<pwd>" and click login
Then error message should be "<errormsg>"
Examples:
|userid|pwd|errormsg|
|standard_user|12334566|Username and password do not match any user|
|standard_user2||Password is required|